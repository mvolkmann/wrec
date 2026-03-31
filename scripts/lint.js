#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import {parse} from 'node-html-parser';

const CSS_PROPERTY_RE = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g;
const REFS_TEST_RE = /this\.[a-zA-Z_$][\w$]*(\.[a-zA-Z_$][\w$]*)*/;
const IDENTIFIER_RE = /^[A-Za-z_$][\w$]*$/;
const PLACEHOLDER_PREFIX = '__WREC_PLACEHOLDER__';
const WREC_REF_NAME = '__wrec';

function analyzeExpression(expressionNode, checker, classNode, findings) {
  function visit(node) {
    if (ts.isPropertyAccessExpression(node) && isWrecRooted(node.expression)) {
      const ownerType = checker.getTypeAtLocation(node.expression);
      const symbol = ownerType.getProperty(node.name.text);
      if (!symbol) {
        const name = node.name.text;
        if (isCallCallee(node)) {
          uniquePush(findings.undefinedMethods, name);
        } else {
          uniquePush(findings.undefinedProperties, name);
        }
      }
    }

    if (ts.isCallExpression(node)) {
      const callee = node.expression;
      if (ts.isIdentifier(callee)) {
        const symbol = checker.getSymbolAtLocation(callee);
        if (!symbol) uniquePush(findings.undefinedMethods, callee.text);
      } else if (
        ts.isPropertyAccessExpression(callee) &&
        isWrecRooted(callee.expression)
      ) {
        const ownerType = checker.getTypeAtLocation(callee.expression);
        const symbol = ownerType.getProperty(callee.name.text);
        if (!symbol) uniquePush(findings.undefinedMethods, callee.name.text);
      }

      const signature =
        checker.getResolvedSignature(node) ??
        checker.getSignaturesOfType(
          checker.getTypeAtLocation(callee),
          ts.SignatureKind.Call
        )[0];

      if (signature) {
        const parameters = signature.getParameters();
        const declaration = signature.getDeclaration();
        const isRest =
          declaration &&
          ts.isFunctionLike(declaration) &&
          declaration.parameters.length > 0 &&
          Boolean(
            declaration.parameters[declaration.parameters.length - 1]
              .dotDotDotToken
          );

        node.arguments.forEach((argument, index) => {
          let parameterSymbol = parameters[index];
          if (!parameterSymbol && isRest && parameters.length > 0) {
            parameterSymbol = parameters[parameters.length - 1];
          }
          if (!parameterSymbol) return;

          const argumentType = checker.getTypeAtLocation(argument);
          const parameterType = checker.getTypeOfSymbolAtLocation(
            parameterSymbol,
            declaration ?? classNode
          );
          if (!checker.isTypeAssignableTo(argumentType, parameterType)) {
            findings.incompatibleArguments.push({
              argument: toUserFacingExpression(argument.getText()),
              argumentType: checker.typeToString(argumentType),
              methodName: toUserFacingExpression(callee.getText()),
              parameterName: parameterSymbol.getName(),
              parameterType: checker.typeToString(parameterType)
            });
          }
        });
      }
    }

    if (
      ts.isBinaryExpression(node) &&
      isArithmeticOperator(node.operatorToken.kind)
    ) {
      const leftType = checker.getTypeAtLocation(node.left);
      const rightType = checker.getTypeAtLocation(node.right);

      if (!isNumericLikeType(leftType)) {
        findings.typeErrors.push({
          expression: toUserFacingExpression(node.getText()),
          message: `left operand "${toUserFacingExpression(node.left.getText())}" has type ${checker.typeToString(leftType)}, but arithmetic operators require number`
        });
      }

      if (!isNumericLikeType(rightType)) {
        findings.typeErrors.push({
          expression: toUserFacingExpression(node.getText()),
          message: `right operand "${toUserFacingExpression(node.right.getText())}" has type ${checker.typeToString(rightType)}, but arithmetic operators require number`
        });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(expressionNode);
}

function buildAugmentedSource(
  sourceFile,
  classNode,
  supportedProps,
  contextKeys,
  expressions
) {
  const propLines = [];
  for (const [name, info] of supportedProps.entries()) {
    propLines.push(`  ${JSON.stringify(name)}: ${info.typeText};`);
  }

  const contextLine = contextKeys.length
    ? `const {${contextKeys.join(', ')}} = ${classNode.name.text}.context;`
    : '';

  const helperBlocks = expressions.map((expr, index) => {
    const targetType =
      expr.context === 'static'
        ? `typeof ${classNode.name.text}`
        : `${classNode.name.text} & __WrecSupportedProps`;
    const rewrittenText = expr.text.replace(/\bthis\b/g, WREC_REF_NAME);
    return `
function __wrec_expr_${index}() {
  const ${WREC_REF_NAME} = null as unknown as ${targetType};
  ${expr.context === 'instance' ? contextLine : ''}
  return (${rewrittenText});
}
`;
  });

  const propInterface = `
type __WrecSupportedProps = {
${propLines.join('\n')}
};
`;

  return `${sourceFile.text}\n${propInterface}\n${helperBlocks.join('\n')}`;
}

function collectClassMethods(classNode) {
  const methods = new Set();
  for (const member of classNode.members) {
    if (
      !ts.isMethodDeclaration(member) &&
      !ts.isGetAccessorDeclaration(member) &&
      !ts.isSetAccessorDeclaration(member)
    ) {
      continue;
    }
    const name = getMemberName(member);
    if (name) methods.add(name);
  }
  return methods;
}

function collectHelperExpressions(augmentedSourceFile) {
  const helpers = [];

  function visit(node) {
    if (
      ts.isFunctionDeclaration(node) &&
      node.name?.text.startsWith('__wrec_expr_')
    ) {
      const match = node.name.text.match(/(\d+)$/);
      const index = match ? Number(match[1]) : -1;
      if (index >= 0 && node.body) {
        const statement = node.body.statements.find(ts.isReturnStatement);
        if (statement?.expression) {
          helpers[index] = statement.expression;
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(augmentedSourceFile);
  return helpers;
}

function createProgram(filePath, sourceText) {
  const defaultHost = ts.createCompilerHost({}, true);
  const compilerOptions = {
    allowJs: true,
    checkJs: true,
    experimentalDecorators: true,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    noEmit: true,
    noImplicitAny: false,
    skipLibCheck: true,
    strict: true,
    target: ts.ScriptTarget.ESNext,
    useDefineForClassFields: true
  };

  const host = {
    ...defaultHost,
    fileExists(fileName) {
      if (path.resolve(fileName) === filePath) return true;
      return defaultHost.fileExists(fileName);
    },
    getSourceFile(
      fileName,
      languageVersion,
      onError,
      shouldCreateNewSourceFile
    ) {
      if (path.resolve(fileName) === filePath) {
        const kind = fileName.endsWith('.ts')
          ? ts.ScriptKind.TS
          : ts.ScriptKind.JS;
        return ts.createSourceFile(
          fileName,
          sourceText,
          languageVersion,
          true,
          kind
        );
      }
      return defaultHost.getSourceFile(
        fileName,
        languageVersion,
        onError,
        shouldCreateNewSourceFile
      );
    },
    readFile(fileName) {
      if (path.resolve(fileName) === filePath) return sourceText;
      return defaultHost.readFile(fileName);
    }
  };

  return ts.createProgram([filePath], compilerOptions, host);
}

function extractProperties(sourceFile, checker, classNode) {
  const supportedProps = new Map();
  const computedExprs = [];
  let contextKeys = [];

  for (const member of classNode.members) {
    if (!isStaticMember(member)) continue;
    if (!ts.isPropertyDeclaration(member)) continue;

    const name = getMemberName(member);
    if (!name || !member.initializer) continue;

    if (
      name === 'context' &&
      ts.isObjectLiteralExpression(member.initializer)
    ) {
      contextKeys = member.initializer.properties
        .map(property => getMemberName(property))
        .filter(Boolean);
      continue;
    }

    if (
      name !== 'properties' ||
      !ts.isObjectLiteralExpression(member.initializer)
    ) {
      continue;
    }

    for (const property of member.initializer.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      const propName = getMemberName(property);
      if (!propName || !ts.isObjectLiteralExpression(property.initializer)) {
        continue;
      }

      const config = property.initializer;
      const typeProp = getObjectProperty(config, 'type');
      const computedProp = getObjectProperty(config, 'computed');

      let typeText = 'unknown';
      let typeNode;
      if (typeProp && ts.isPropertyAssignment(typeProp)) {
        typeText = getPropertyTypeText(
          checker,
          sourceFile,
          typeProp.initializer
        );
        typeNode = typeNodeFromConstructorExpression(typeProp.initializer);
      }

      supportedProps.set(propName, {typeNode, typeText});

      if (
        computedProp &&
        ts.isPropertyAssignment(computedProp) &&
        (ts.isStringLiteral(computedProp.initializer) ||
          ts.isNoSubstitutionTemplateLiteral(computedProp.initializer))
      ) {
        computedExprs.push({
          kind: 'computed',
          text: computedProp.initializer.text.trim(),
          location: sourceFile.getLineAndCharacterOfPosition(
            computedProp.initializer.getStart(sourceFile)
          )
        });
      }
    }
  }

  return {supportedProps, computedExprs, contextKeys};
}

function extractTemplateExpressions(classNode) {
  const expressions = [];

  for (const member of classNode.members) {
    if (!isStaticMember(member)) continue;
    if (!ts.isPropertyDeclaration(member)) continue;

    const name = getMemberName(member);
    if ((name !== 'html' && name !== 'css') || !member.initializer) continue;
    if (!ts.isTaggedTemplateExpression(member.initializer)) continue;

    const tag = member.initializer.tag.getText();
    if (tag !== 'html' && tag !== 'css') continue;

    const {template} = member.initializer;
    if (ts.isTemplateExpression(template)) {
      for (const span of template.templateSpans) {
        const trimmed = getExpressionText(
          member.getSourceFile(),
          span.expression
        );
        if (trimmed) {
          const location = span.expression
            .getSourceFile()
            .getLineAndCharacterOfPosition(span.expression.getStart());
          expressions.push({
            context: 'static',
            kind: tag,
            text: trimmed,
            location
          });
        }
      }
    }

    const rendered = getTemplateLiteralText(template);

    if (tag === 'css') {
      CSS_PROPERTY_RE.lastIndex = 0;
      while (true) {
        const match = CSS_PROPERTY_RE.exec(rendered);
        if (!match) break;
        const value = match[2]?.trim();
        if (value && REFS_TEST_RE.test(value)) {
          expressions.push({
            context: 'instance',
            kind: 'css',
            text: value,
            location: null
          });
        }
      }
      continue;
    }

    const root = parse(rendered, {comment: true});
    walkHtmlNode(root, expressions);
  }

  return expressions;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function findWrecClass(sourceFile, checker) {
  let found;

  function visit(node) {
    if (found) return;
    if (ts.isClassDeclaration(node) && node.name) {
      const heritage = node.heritageClauses?.find(
        clause => clause.token === ts.SyntaxKind.ExtendsKeyword
      );
      const typeNode = heritage?.types[0];
      if (typeNode) {
        const baseType = checker.getTypeAtLocation(typeNode.expression);
        const baseSymbol = baseType.symbol ?? baseType.aliasSymbol;
        if (baseSymbol?.getName() === 'Wrec') {
          found = node;
          return;
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return found;
}

function formatLocation(location) {
  if (!location) return '';
  return `:${location.line + 1}:${location.character + 1}`;
}

function getArgPath() {
  const [, , filePath, ...rest] = process.argv;
  if (!filePath || rest.length > 0) {
    fail('usage: node scripts/wrec-lint.js <file.js|file.ts>');
  }

  const resolved = path.resolve(filePath);
  const ext = path.extname(resolved);
  if (ext !== '.js' && ext !== '.ts') {
    fail('argument must be a path to a .js or .ts file');
  }
  if (!fs.existsSync(resolved)) {
    fail(`file not found: ${resolved}`);
  }
  return resolved;
}

function getExpressionText(sourceFile, expression) {
  return expression.getText(sourceFile).trim();
}

function getMemberName(node) {
  const {name} = node;
  if (!name) return undefined;
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) return name.text;
  return undefined;
}

function getObjectProperty(objectLiteral, key) {
  for (const property of objectLiteral.properties) {
    if (
      !ts.isPropertyAssignment(property) &&
      !ts.isShorthandPropertyAssignment(property)
    ) {
      continue;
    }
    const name = getMemberName(property);
    if (name === key) return property;
  }
}

function getPropertyTypeText(checker, sourceFile, expression) {
  const typeText = getTypeSyntaxText(sourceFile, expression);
  if (typeText) return typeText;

  const type = checker.getTypeAtLocation(expression);
  return checker.typeToString(type);
}

function getTemplateLiteralText(template) {
  if (ts.isNoSubstitutionTemplateLiteral(template)) return template.text;

  let text = template.head.text;
  template.templateSpans.forEach((span, index) => {
    text += `${PLACEHOLDER_PREFIX}${index}`;
    text += span.literal.text;
  });
  return text;
}

function getTypeSyntaxText(sourceFile, expression) {
  const text = expression.getText(sourceFile).trim();
  const arrayMatch = text.match(/^Array<(.+)>$/s);
  if (arrayMatch) return `${arrayMatch[1].trim()}[]`;

  if (ts.isIdentifier(expression)) {
    switch (expression.text) {
      case 'String':
        return 'string';
      case 'Number':
        return 'number';
      case 'Boolean':
        return 'boolean';
      case 'Array':
        return 'unknown[]';
      case 'Object':
        return 'object';
      default:
        return expression.getText(sourceFile);
    }
  }

  if (
    ts.isCallExpression(expression) &&
    ts.isIdentifier(expression.expression)
  ) {
    if (
      expression.expression.text === 'Array' &&
      expression.typeArguments?.length === 1
    ) {
      return `${expression.typeArguments[0].getText(sourceFile)}[]`;
    }
  }

  if (ts.isPropertyAccessExpression(expression)) {
    return expression.getText(sourceFile);
  }

  return undefined;
}

function isArithmeticOperator(kind) {
  return (
    kind === ts.SyntaxKind.AsteriskToken ||
    kind === ts.SyntaxKind.SlashToken ||
    kind === ts.SyntaxKind.PercentToken ||
    kind === ts.SyntaxKind.MinusToken ||
    kind === ts.SyntaxKind.AsteriskAsteriskToken
  );
}

function isCallCallee(node) {
  return ts.isCallExpression(node.parent) && node.parent.expression === node;
}

function isNumericLikeType(type) {
  const parts = type.isUnion() ? type.types : [type];
  return parts.every(part => {
    const flags = part.flags;
    return Boolean(
      flags &
      (ts.TypeFlags.Number |
        ts.TypeFlags.NumberLiteral |
        ts.TypeFlags.BigInt |
        ts.TypeFlags.BigIntLiteral |
        ts.TypeFlags.Any)
    );
  });
}

function isStaticMember(node) {
  return ts.canHaveModifiers(node)
    ? ts
        .getModifiers(node)
        ?.some(mod => mod.kind === ts.SyntaxKind.StaticKeyword)
    : false;
}

function isWrecRooted(expression) {
  if (ts.isIdentifier(expression) && expression.text === WREC_REF_NAME) {
    return true;
  }
  if (
    ts.isPropertyAccessExpression(expression) ||
    ts.isElementAccessExpression(expression)
  ) {
    return isWrecRooted(expression.expression);
  }
  return false;
}

function main() {
  const filePath = getArgPath();
  const sourceText = fs.readFileSync(filePath, 'utf8');

  const baseProgram = createProgram(filePath, sourceText);
  const sourceFile = baseProgram.getSourceFile(filePath);
  if (!sourceFile) fail(`unable to parse ${filePath}`);

  const checker = baseProgram.getTypeChecker();
  const classNode = findWrecClass(sourceFile, checker);
  if (!classNode) fail('file must define a subclass of Wrec');

  const {supportedProps, computedExprs, contextKeys} = extractProperties(
    sourceFile,
    checker,
    classNode
  );
  const allMethods = collectClassMethods(classNode);
  void allMethods;
  const templateExprs = extractTemplateExpressions(classNode);
  const allExpressions = [...templateExprs, ...computedExprs];

  const augmentedSource = buildAugmentedSource(
    sourceFile,
    classNode,
    supportedProps,
    contextKeys,
    allExpressions
  );
  const augmentedProgram = createProgram(filePath, augmentedSource);
  const augmentedSourceFile = augmentedProgram.getSourceFile(filePath);
  if (!augmentedSourceFile) fail(`unable to analyze ${filePath}`);

  const augmentedChecker = augmentedProgram.getTypeChecker();
  const augmentedClassNode = findWrecClass(
    augmentedSourceFile,
    augmentedChecker
  );
  if (!augmentedClassNode) {
    fail('unable to find Wrec subclass after augmentation');
  }

  const helperExpressions = collectHelperExpressions(augmentedSourceFile);
  const findings = {
    incompatibleArguments: [],
    typeErrors: [],
    undefinedMethods: [],
    undefinedProperties: []
  };

  helperExpressions.forEach(expressionNode => {
    if (!expressionNode) return;
    analyzeExpression(
      expressionNode,
      augmentedChecker,
      augmentedClassNode,
      findings
    );
  });

  findings.incompatibleArguments.sort(
    (a, b) =>
      a.methodName.localeCompare(b.methodName) ||
      a.parameterName.localeCompare(b.parameterName)
  );
  findings.typeErrors.sort((a, b) => a.expression.localeCompare(b.expression));
  findings.undefinedMethods.sort();
  findings.undefinedProperties.sort();

  const hasIssues =
    findings.undefinedProperties.length > 0 ||
    findings.undefinedMethods.length > 0 ||
    findings.incompatibleArguments.length > 0 ||
    findings.typeErrors.length > 0;

  console.log(`file: ${filePath}`);
  console.log('properties:');
  if (supportedProps.size === 0) {
    console.log('  none');
  } else {
    for (const [name, info] of [...supportedProps.entries()].sort(([a], [b]) =>
      a.localeCompare(b)
    )) {
      console.log(`  ${name}: ${info.typeText}`);
    }
  }

  console.log('expressions:');
  if (allExpressions.length === 0) {
    console.log('  none');
  } else {
    allExpressions.forEach(expr => {
      console.log(
        `  [${expr.kind}]${formatLocation(expr.location)} ${expr.text}`
      );
    });
  }

  if (findings.undefinedProperties.length > 0) {
    console.log('undefined properties:');
    findings.undefinedProperties.forEach(name => console.log(`  ${name}`));
  }

  if (findings.undefinedMethods.length > 0) {
    console.log('undefined methods:');
    findings.undefinedMethods.forEach(name => console.log(`  ${name}`));
  }

  if (findings.incompatibleArguments.length > 0) {
    console.log('incompatible arguments:');
    findings.incompatibleArguments.forEach(finding => {
      console.log(
        `  ${finding.methodName}: argument "${finding.argument}" has type ${finding.argumentType}, but parameter "${finding.parameterName}" expects ${finding.parameterType}`
      );
    });
  }

  if (findings.typeErrors.length > 0) {
    console.log('type errors:');
    findings.typeErrors.forEach(finding => {
      console.log(`  ${finding.expression}: ${finding.message}`);
    });
  }

  if (!hasIssues) {
    console.log('no issues found');
  }
}

function toUserFacingExpression(text) {
  return text.replaceAll(WREC_REF_NAME, 'this');
}

function typeNodeFromConstructorExpression(expression) {
  if (ts.isIdentifier(expression)) {
    switch (expression.text) {
      case 'String':
        return ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
      case 'Number':
        return ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
      case 'Boolean':
        return ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
      case 'Object':
        return ts.factory.createKeywordTypeNode(ts.SyntaxKind.ObjectKeyword);
      default:
        return ts.factory.createTypeReferenceNode(expression.text);
    }
  }

  if (
    ts.isCallExpression(expression) &&
    ts.isIdentifier(expression.expression)
  ) {
    const name = expression.expression.text;
    if (name === 'Array' && expression.typeArguments?.length === 1) {
      return ts.factory.createArrayTypeNode(expression.typeArguments[0]);
    }
  }

  if (ts.isPropertyAccessExpression(expression)) {
    return ts.factory.createTypeReferenceNode(expression.getText());
  }

  return undefined;
}

function uniquePush(array, value) {
  if (!array.includes(value)) array.push(value);
}

function walkHtmlNode(node, expressions) {
  if (node.nodeType === 1) {
    for (const [attrName, attrValue] of Object.entries(node.attributes)) {
      if (!attrValue) continue;
      if (
        REFS_TEST_RE.test(attrValue) ||
        (attrName.startsWith('on') && IDENTIFIER_RE.test(attrValue))
      ) {
        expressions.push({
          context: 'instance',
          kind: 'html',
          text: attrValue.trim(),
          location: null
        });
      }
    }
  }

  if (
    (node.nodeType === 3 || node.nodeType === 8) &&
    typeof node.rawText === 'string'
  ) {
    const text = node.rawText.trim();
    if (text && REFS_TEST_RE.test(text)) {
      expressions.push({
        context: 'instance',
        kind: 'html',
        text,
        location: null
      });
    }
  }

  for (const child of node.childNodes ?? []) {
    walkHtmlNode(child, expressions);
  }
}

main();
