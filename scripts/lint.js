#!/usr/bin/env node

// This lints a given source file that defines a wrec component.
// To run this, enter `npx wrec-lint [--verbose] {file-path}`
//
// Include --verbose to output lists of the
// properties and expressions that are found.

// This linter checks Wrec components for these issues:
// - undefined properties accessed in expressions
// - undefined instance methods called in expressions
// - undefined context functions called in expressions
// - extra arguments passed to methods and context functions
// - incompatible method arguments in expressions
// - arithmetic type errors in expressions
// - invalid computed property references and calls to non-method members
// - invalid event handler references
// - unsupported event names
// - duplicate property names
// - reserved property names
// - missing `type` in property configurations
// - invalid default values
// - invalid `values` configurations
// - invalid `usedBy` references
// - missing `formAssociated` when `formAssociatedCallback` is defined
// - invalid `form-assoc` values
// - invalid `useState` map entries
// - unsupported HTML attributes in templates
// - invalid HTML element nesting in templates
// - duplicate ref attribute values

import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import {parse} from 'node-html-parser';

const CSS_PROPERTY_RE = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g;
const REFS_TEST_RE = /this\.[a-zA-Z_$][\w$]*(\.[a-zA-Z_$][\w$]*)*/;
const IDENTIFIER_RE = /^[A-Za-z_$][\w$]*$/;
const HTML_GLOBAL_ATTRIBUTES = new Set([
  'aria-label',
  'class',
  'disabled',
  'hidden',
  'id',
  'part',
  'role',
  'slot',
  'style',
  'tabindex',
  'title'
]);
const HTML_TAG_ATTRIBUTES = new Map([
  ['a', new Set(['href', 'rel', 'target'])],
  ['button', new Set(['name', 'type', 'value'])],
  ['div', new Set([])],
  ['fieldset', new Set(['name'])],
  ['form', new Set(['action', 'method', 'name'])],
  ['img', new Set(['alt', 'height', 'src', 'width'])],
  [
    'input',
    new Set([
      'checked',
      'max',
      'min',
      'name',
      'placeholder',
      'step',
      'type',
      'value'
    ])
  ],
  ['label', new Set(['for'])],
  ['legend', new Set([])],
  ['li', new Set(['value'])],
  ['option', new Set(['label', 'selected', 'value'])],
  ['p', new Set([])],
  ['select', new Set(['multiple', 'name', 'value'])],
  ['span', new Set([])],
  ['table', new Set([])],
  ['tbody', new Set([])],
  ['td', new Set(['colspan', 'rowspan'])],
  ['textarea', new Set(['name', 'placeholder', 'rows', 'value'])],
  ['th', new Set(['colspan', 'rowspan', 'scope'])],
  ['thead', new Set([])],
  ['tr', new Set([])],
  ['ul', new Set([])]
]);
const HTML_ALLOWED_PARENTS = new Map([
  ['legend', new Set(['fieldset'])],
  ['li', new Set(['ol', 'ul'])],
  ['option', new Set(['select'])],
  ['tbody', new Set(['table'])],
  ['td', new Set(['tr'])],
  ['th', new Set(['tr'])],
  ['thead', new Set(['table'])],
  ['tr', new Set(['table', 'tbody', 'thead'])]
]);
const HTML_ALLOWED_CHILDREN = new Map([
  ['select', new Set(['option'])],
  ['table', new Set(['tbody', 'thead', 'tr'])],
  ['tbody', new Set(['tr'])],
  ['thead', new Set(['tr'])],
  ['tr', new Set(['td', 'th'])],
  ['ul', new Set(['li'])]
]);
const THIS_CALL_RE = /this\.([A-Za-z_$][\w$]*)\s*\(/g;
const THIS_REF_RE = /this\.([A-Za-z_$][\w$]*)(\.[A-Za-z_$][\w$]*)*/g;
const PLACEHOLDER_PREFIX = '__WREC_PLACEHOLDER__';
const RESERVED_PROPERTY_NAMES = new Set(['class', 'style']);
const SUPPORTED_EVENT_NAMES = new Set([
  'blur',
  'change',
  'click',
  'dblclick',
  'focus',
  'focusin',
  'focusout',
  'input',
  'keydown',
  'keypress',
  'keyup',
  'mousedown',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'paste'
]);
const WREC_REF_NAME = '__wrec';
const componentPropertyCache = new Map();

function analyzeExpression(
  expressionNode,
  checker,
  classNode,
  findings,
  metadata
) {
  if (metadata.eventHandler && ts.isIdentifier(expressionNode)) {
    if (!metadata.classMethods.has(expressionNode.text)) {
      uniquePush(
        findings.invalidEventHandlers,
        `"${expressionNode.text}" is not a defined instance method`
      );
    }
  }

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
        if (!metadata.contextKeys.has(callee.text)) {
          const symbol = checker.getSymbolAtLocation(callee);
          if (!symbol || requiresContextFunction(symbol, metadata.sourceFile)) {
            uniquePush(findings.undefinedContextFunctions, callee.text);
          }
        }
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

        if (!isRest && node.arguments.length > parameters.length) {
          node.arguments.slice(parameters.length).forEach((argument, index) => {
            findings.extraArguments.push({
              argument: toUserFacingExpression(argument.getText()),
              argumentIndex: parameters.length + index + 1,
              methodName: toUserFacingExpression(callee.getText()),
              parameterCount: parameters.length
            });
          });
        }

        node.arguments.forEach((argument, index) => {
          let parameterSymbol = parameters[index];
          let isRestArgument =
            Boolean(isRest) &&
            parameters.length > 0 &&
            index >= parameters.length - 1;
          if (!parameterSymbol && isRest && parameters.length > 0) {
            parameterSymbol = parameters[parameters.length - 1];
          }
          if (!parameterSymbol) return;

          const argumentType = checker.getTypeAtLocation(argument);
          const parameterType = getParameterType(
            checker,
            parameterSymbol,
            declaration ?? classNode,
            isRestArgument
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

function collectWrecClasses(sourceFile) {
  const classes = [];

  function visit(node) {
    if (ts.isClassDeclaration(node) && node.name) {
      const heritage = node.heritageClauses?.find(
        clause => clause.token === ts.SyntaxKind.ExtendsKeyword
      );
      const typeNode = heritage?.types[0];
      if (
        typeNode &&
        ts.isIdentifier(typeNode.expression) &&
        typeNode.expression.text === 'Wrec'
      ) {
        classes.push(node);
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return classes;
}

function collectSupportedPropertyNames(classNode) {
  const supportedProps = new Set();

  for (const member of classNode.members) {
    if (!isStaticMember(member)) continue;
    if (!ts.isPropertyDeclaration(member)) continue;

    const name = getMemberName(member);
    if (
      name !== 'properties' ||
      !member.initializer ||
      !ts.isObjectLiteralExpression(member.initializer)
    ) {
      continue;
    }

    for (const property of member.initializer.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      const propName = getMemberName(property);
      if (propName) supportedProps.add(propName);
    }
  }

  return supportedProps;
}

function findDefinedTagNames(sourceFile) {
  const tagNames = new Map();

  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === 'define' &&
      ts.isIdentifier(node.expression.expression) &&
      node.arguments.length > 0 &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      tagNames.set(node.expression.expression.text, node.arguments[0].text);
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return tagNames;
}

function collectUseStateMapErrors(classNode, supportedProps, findings) {
  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      ts.isThis(node.expression.expression) &&
      node.expression.name.text === 'useState'
    ) {
      const mapArg = node.arguments[1];
      if (mapArg && ts.isObjectLiteralExpression(mapArg)) {
        for (const property of mapArg.properties) {
          if (!ts.isPropertyAssignment(property)) continue;
          const statePath = getMemberName(property);
          if (
            !statePath ||
            (!ts.isStringLiteral(property.initializer) &&
              !ts.isNoSubstitutionTemplateLiteral(property.initializer))
          ) {
            continue;
          }

          const componentProp = property.initializer.text;
          if (!supportedProps.has(componentProp)) {
            findings.invalidUseStateMaps.push(
              `useState maps state property "${statePath}" to missing component property "${componentProp}"`
            );
          }
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(classNode);
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
  const duplicateProperties = [];
  let formAssociated = false;
  const propertyEntries = [];
  const reservedProperties = [];
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
      name === 'formAssociated' &&
      member.initializer.kind === ts.SyntaxKind.TrueKeyword
    ) {
      formAssociated = true;
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

      if (
        supportedProps.has(propName) &&
        !duplicateProperties.includes(propName)
      ) {
        duplicateProperties.push(propName);
      }
      if (
        RESERVED_PROPERTY_NAMES.has(propName) &&
        !reservedProperties.includes(propName)
      ) {
        reservedProperties.push(propName);
      }

      const config = property.initializer;
      propertyEntries.push({config, propName});
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

  return {
    supportedProps,
    computedExprs,
    contextKeys,
    duplicateProperties,
    formAssociated,
    propertyEntries,
    reservedProperties
  };
}

function extractTemplateExpressions(
  classNode,
  findings,
  componentPropertyMaps,
  supportedProps
) {
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
            eventHandler: false,
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
            eventHandler: false,
            kind: 'css',
            text: value,
            location: null
          });
        }
      }
      continue;
    }

    const root = parse(rendered, {comment: true});
    walkHtmlNode(
      root,
      expressions,
      findings,
      componentPropertyMaps,
      supportedProps,
      new Set()
    );
  }

  return expressions;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function findWrecFiles(rootDir, onMatch) {
  const walk = currentDir => {
    const entries = fs
      .readdirSync(currentDir, {withFileTypes: true})
      .sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (!entry.isFile()) continue;
      if (!fullPath.endsWith('.js') && !fullPath.endsWith('.ts')) continue;
      if (isWrecComponentFile(fullPath)) onMatch(fullPath);
    }
  };

  walk(rootDir);
}

function formatReport(
  filePath,
  supportedProps,
  allExpressions,
  findings,
  options = {}
) {
  const {
    fileLabel = filePath,
    showFileHeader = true,
    showDetailsForCleanFile = true,
    showNoIssuesMessage = true,
    verbose = false
  } = options;
  const lines = [];

  const hasIssues =
    findings.duplicateProperties.length > 0 ||
    findings.reservedProperties.length > 0 ||
    findings.invalidUsedByReferences.length > 0 ||
    findings.invalidComputedProperties.length > 0 ||
    findings.invalidRefAttributes.length > 0 ||
    findings.invalidValuesConfigurations.length > 0 ||
    findings.invalidDefaultValues.length > 0 ||
    findings.invalidFormAssocValues.length > 0 ||
    findings.invalidUseStateMaps.length > 0 ||
    findings.missingFormAssociatedProperty.length > 0 ||
    findings.missingTypeProperties.length > 0 ||
    findings.undefinedProperties.length > 0 ||
    findings.undefinedContextFunctions.length > 0 ||
    findings.undefinedMethods.length > 0 ||
    findings.extraArguments.length > 0 ||
    findings.incompatibleArguments.length > 0 ||
    findings.invalidEventHandlers.length > 0 ||
    findings.invalidHtmlNesting.length > 0 ||
    findings.unsupportedHtmlAttributes.length > 0 ||
    findings.unsupportedEventNames.length > 0 ||
    findings.typeErrors.length > 0;

  if (showFileHeader) lines.push(`file: ${fileLabel}`);

  if (verbose && (hasIssues || showDetailsForCleanFile)) {
    lines.push('properties:');
    if (supportedProps.size === 0) {
      lines.push('  none');
    } else {
      for (const [name, info] of [...supportedProps.entries()].sort(
        ([a], [b]) => a.localeCompare(b)
      )) {
        lines.push(`  ${name}: ${info.typeText}`);
      }
    }

    lines.push('expressions:');
    if (allExpressions.length === 0) {
      lines.push('  none');
    } else {
      allExpressions.forEach(expr => {
        lines.push(
          `  [${expr.kind}]${formatLocation(expr.location)} ${expr.text}`
        );
      });
    }
  }

  if (findings.duplicateProperties.length > 0) {
    lines.push('duplicate properties:');
    findings.duplicateProperties.forEach(name => lines.push(`  ${name}`));
  }

  if (findings.reservedProperties.length > 0) {
    lines.push('reserved property names:');
    findings.reservedProperties.forEach(name => lines.push(`  ${name}`));
  }

  if (findings.invalidUsedByReferences.length > 0) {
    lines.push('invalid usedBy references:');
    findings.invalidUsedByReferences.forEach(message =>
      lines.push(`  ${message}`)
    );
  }

  if (findings.invalidComputedProperties.length > 0) {
    lines.push('invalid computed properties:');
    findings.invalidComputedProperties.forEach(message =>
      lines.push(`  ${message}`)
    );
  }

  if (findings.invalidRefAttributes.length > 0) {
    lines.push('invalid ref attributes:');
    findings.invalidRefAttributes.forEach(message =>
      lines.push(`  ${message}`)
    );
  }

  if (findings.invalidValuesConfigurations.length > 0) {
    lines.push('invalid values configurations:');
    findings.invalidValuesConfigurations.forEach(message =>
      lines.push(`  ${message}`)
    );
  }

  if (findings.invalidDefaultValues.length > 0) {
    lines.push('invalid default values:');
    findings.invalidDefaultValues.forEach(message =>
      lines.push(`  ${message}`)
    );
  }

  if (findings.invalidFormAssocValues.length > 0) {
    lines.push('invalid form-assoc values:');
    findings.invalidFormAssocValues.forEach(message =>
      lines.push(`  ${message}`)
    );
  }

  if (findings.missingFormAssociatedProperty.length > 0) {
    lines.push('missing formAssociated property:');
    findings.missingFormAssociatedProperty.forEach(message =>
      lines.push(`  ${message}`)
    );
  }

  if (findings.missingTypeProperties.length > 0) {
    lines.push('missing type properties:');
    findings.missingTypeProperties.forEach(message =>
      lines.push(`  ${message}`)
    );
  }

  if (findings.undefinedProperties.length > 0) {
    lines.push('undefined properties:');
    findings.undefinedProperties.forEach(name => lines.push(`  ${name}`));
  }

  if (findings.undefinedContextFunctions.length > 0) {
    lines.push('undefined context functions:');
    findings.undefinedContextFunctions.forEach(name => lines.push(`  ${name}`));
  }

  if (findings.undefinedMethods.length > 0) {
    lines.push('undefined methods:');
    findings.undefinedMethods.forEach(name => lines.push(`  ${name}`));
  }

  if (findings.invalidEventHandlers.length > 0) {
    lines.push('invalid event handler references:');
    findings.invalidEventHandlers.forEach(message =>
      lines.push(`  ${message}`)
    );
  }

  if (findings.invalidUseStateMaps.length > 0) {
    lines.push('invalid useState map entries:');
    findings.invalidUseStateMaps.forEach(message => lines.push(`  ${message}`));
  }

  if (findings.invalidHtmlNesting.length > 0) {
    lines.push('invalid html nesting:');
    findings.invalidHtmlNesting.forEach(message => lines.push(`  ${message}`));
  }

  if (findings.extraArguments.length > 0) {
    lines.push('extra arguments:');
    findings.extraArguments.forEach(finding => {
      lines.push(
        `  ${finding.methodName}: argument ${finding.argumentIndex} "${finding.argument}" exceeds the ${finding.parameterCount}-parameter signature`
      );
    });
  }

  if (findings.incompatibleArguments.length > 0) {
    lines.push('incompatible arguments:');
    findings.incompatibleArguments.forEach(finding => {
      lines.push(
        `  ${finding.methodName}: argument "${finding.argument}" has type ${finding.argumentType}, but parameter "${finding.parameterName}" expects ${finding.parameterType}`
      );
    });
  }

  if (findings.typeErrors.length > 0) {
    lines.push('type errors:');
    findings.typeErrors.forEach(finding => {
      lines.push(`  ${finding.expression}: ${finding.message}`);
    });
  }

  if (findings.unsupportedHtmlAttributes.length > 0) {
    lines.push('unsupported html attributes:');
    findings.unsupportedHtmlAttributes.forEach(message =>
      lines.push(`  ${message}`)
    );
  }

  if (findings.unsupportedEventNames.length > 0) {
    lines.push('unsupported event names:');
    findings.unsupportedEventNames.forEach(message =>
      lines.push(`  ${message}`)
    );
  }

  if (!hasIssues && showNoIssuesMessage) lines.push('no issues found');

  return `${lines.join('\n')}\n`;
}

function getComponentPropertyMaps(filePath, sourceText, seen = new Set()) {
  const resolved = path.resolve(filePath);
  if (componentPropertyCache.has(resolved)) {
    return componentPropertyCache.get(resolved);
  }
  if (seen.has(resolved)) return new Map();
  seen.add(resolved);

  const text = sourceText ?? fs.readFileSync(resolved, 'utf8');
  const scriptKind = resolved.endsWith('.ts')
    ? ts.ScriptKind.TS
    : ts.ScriptKind.JS;
  const sourceFile = ts.createSourceFile(
    resolved,
    text,
    ts.ScriptTarget.ESNext,
    true,
    scriptKind
  );
  const tagNames = findDefinedTagNames(sourceFile);
  const propertyMaps = new Map();

  for (const classNode of collectWrecClasses(sourceFile)) {
    const tagName = classNode.name
      ? tagNames.get(classNode.name.text)
      : undefined;
    if (!tagName) continue;
    propertyMaps.set(tagName, collectSupportedPropertyNames(classNode));
  }

  for (const statement of sourceFile.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier)
    ) {
      continue;
    }

    const importPath = resolveImportPath(
      path.dirname(resolved),
      statement.moduleSpecifier.text
    );
    if (!importPath) continue;

    const importedMaps = getComponentPropertyMaps(importPath, undefined, seen);
    for (const [tagName, props] of importedMaps.entries()) {
      if (!propertyMaps.has(tagName)) propertyMaps.set(tagName, props);
    }
  }

  componentPropertyCache.set(resolved, propertyMaps);
  return propertyMaps;
}

function formatLocation(location) {
  if (!location) return '';
  return `:${location.line + 1}:${location.character + 1}`;
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

function getStringArrayLiteral(property) {
  if (!property || !ts.isPropertyAssignment(property)) return undefined;
  if (!ts.isArrayLiteralExpression(property.initializer)) return undefined;

  const values = [];
  for (const element of property.initializer.elements) {
    if (
      !ts.isStringLiteral(element) &&
      !ts.isNoSubstitutionTemplateLiteral(element)
    ) {
      return undefined;
    }
    values.push(element.text);
  }
  return values;
}

function getPropertyTypeText(checker, sourceFile, expression) {
  const typeText = getTypeSyntaxText(sourceFile, expression);
  if (typeText) return typeText;

  const type = checker.getTypeAtLocation(expression);
  return checker.typeToString(type);
}

function getParameterType(checker, parameterSymbol, location, isRestArgument) {
  const parameterType = checker.getTypeOfSymbolAtLocation(
    parameterSymbol,
    location
  );
  if (!isRestArgument) return parameterType;
  if (
    !checker.isArrayType(parameterType) &&
    !checker.isTupleType(parameterType)
  ) {
    return parameterType;
  }

  const typeArguments = checker.getTypeArguments(parameterType);
  return typeArguments[0] ?? parameterType;
}

function getStringOrStringArrayLiteral(property) {
  if (!property || !ts.isPropertyAssignment(property)) return undefined;

  if (
    ts.isStringLiteral(property.initializer) ||
    ts.isNoSubstitutionTemplateLiteral(property.initializer)
  ) {
    return [property.initializer.text];
  }

  return getStringArrayLiteral(property);
}

function getSupportedHtmlAttributes(tagName) {
  return HTML_TAG_ATTRIBUTES.get(tagName.toLowerCase());
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

function isImportLikeDeclaration(node) {
  return (
    ts.isImportClause(node) ||
    ts.isImportEqualsDeclaration(node) ||
    ts.isImportSpecifier(node) ||
    ts.isNamespaceImport(node)
  );
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

function isWrecComponentFile(filePath) {
  const sourceText = fs.readFileSync(filePath, 'utf8');
  const scriptKind = filePath.endsWith('.ts')
    ? ts.ScriptKind.TS
    : ts.ScriptKind.JS;
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.ESNext,
    true,
    scriptKind
  );
  return collectWrecClasses(sourceFile).length > 0;
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

function requiresContextFunction(symbol, sourceFile) {
  const declarations = symbol.declarations ?? [];
  return declarations.some(declaration => {
    if (isImportLikeDeclaration(declaration)) return true;
    return declaration.getSourceFile() === sourceFile;
  });
}

function resolveImportPath(baseDir, importPath) {
  if (!importPath.startsWith('.')) return undefined;

  const candidates = [
    path.resolve(baseDir, importPath),
    path.resolve(baseDir, `${importPath}.js`),
    path.resolve(baseDir, `${importPath}.ts`),
    path.resolve(baseDir, importPath, 'index.js'),
    path.resolve(baseDir, importPath, 'index.ts')
  ];

  return candidates.find(candidate => fs.existsSync(candidate));
}

export function lintSource(filePath, sourceText, options = {}) {
  const baseProgram = createProgram(filePath, sourceText);
  const sourceFile = baseProgram.getSourceFile(filePath);
  if (!sourceFile) throw new Error(`unable to parse ${filePath}`);

  const checker = baseProgram.getTypeChecker();
  const classNode = collectWrecClasses(sourceFile)[0];
  if (!classNode) throw new Error('file must define a subclass of Wrec');
  const componentPropertyMaps = getComponentPropertyMaps(filePath, sourceText);

  const {
    supportedProps,
    computedExprs,
    contextKeys,
    duplicateProperties,
    formAssociated,
    propertyEntries,
    reservedProperties
  } = extractProperties(sourceFile, checker, classNode);
  const allMethods = collectClassMethods(classNode);
  const findings = {
    duplicateProperties,
    extraArguments: [],
    incompatibleArguments: [],
    invalidComputedProperties: [],
    invalidDefaultValues: [],
    invalidEventHandlers: [],
    invalidFormAssocValues: [],
    invalidHtmlNesting: [],
    invalidRefAttributes: [],
    invalidUseStateMaps: [],
    invalidUsedByReferences: [],
    invalidValuesConfigurations: [],
    missingFormAssociatedProperty: [],
    missingTypeProperties: [],
    reservedProperties,
    typeErrors: [],
    undefinedContextFunctions: [],
    undefinedMethods: [],
    undefinedProperties: [],
    unsupportedHtmlAttributes: [],
    unsupportedEventNames: []
  };
  const templateExprs = extractTemplateExpressions(
    classNode,
    findings,
    componentPropertyMaps,
    supportedProps
  );
  const allExpressions = [...templateExprs, ...computedExprs];

  if (allMethods.has('formAssociatedCallback') && !formAssociated) {
    findings.missingFormAssociatedProperty.push(
      'formAssociatedCallback is defined, but static formAssociated is not true'
    );
  }

  const augmentedSource = buildAugmentedSource(
    sourceFile,
    classNode,
    supportedProps,
    contextKeys,
    allExpressions
  );
  const augmentedProgram = createProgram(filePath, augmentedSource);
  const augmentedSourceFile = augmentedProgram.getSourceFile(filePath);
  if (!augmentedSourceFile) throw new Error(`unable to analyze ${filePath}`);

  const augmentedChecker = augmentedProgram.getTypeChecker();
  const augmentedClassNode = collectWrecClasses(augmentedSourceFile)[0];
  if (!augmentedClassNode) {
    throw new Error('unable to find Wrec subclass after augmentation');
  }

  const helperExpressions = collectHelperExpressions(augmentedSourceFile);

  validatePropertyConfigs(
    checker,
    supportedProps,
    propertyEntries,
    allMethods,
    findings
  );
  collectUseStateMapErrors(classNode, supportedProps, findings);

  allExpressions.forEach(expr => {
    if (
      expr.eventHandler &&
      IDENTIFIER_RE.test(expr.text) &&
      !allMethods.has(expr.text)
    ) {
      uniquePush(
        findings.invalidEventHandlers,
        `"${expr.text}" is not a defined instance method`
      );
    }
  });

  helperExpressions.forEach((expressionNode, index) => {
    if (!expressionNode) return;
    analyzeExpression(
      expressionNode,
      augmentedChecker,
      augmentedClassNode,
      findings,
      {
        classMethods: allMethods,
        contextKeys: new Set(contextKeys),
        eventHandler: allExpressions[index]?.eventHandler ?? false,
        sourceFile: augmentedSourceFile
      }
    );
  });

  findings.duplicateProperties.sort();
  findings.extraArguments.sort(
    (a, b) =>
      a.methodName.localeCompare(b.methodName) ||
      a.argumentIndex - b.argumentIndex
  );
  findings.incompatibleArguments.sort(
    (a, b) =>
      a.methodName.localeCompare(b.methodName) ||
      a.parameterName.localeCompare(b.parameterName)
  );
  findings.invalidComputedProperties.sort();
  findings.invalidDefaultValues.sort();
  findings.invalidEventHandlers.sort();
  findings.invalidFormAssocValues.sort();
  findings.invalidHtmlNesting.sort();
  findings.invalidRefAttributes.sort();
  findings.invalidUseStateMaps.sort();
  findings.invalidUsedByReferences.sort();
  findings.invalidValuesConfigurations.sort();
  findings.missingFormAssociatedProperty.sort();
  findings.missingTypeProperties.sort();
  findings.reservedProperties.sort();
  findings.typeErrors.sort((a, b) => a.expression.localeCompare(b.expression));
  findings.undefinedContextFunctions.sort();
  findings.undefinedMethods.sort();
  findings.undefinedProperties.sort();
  findings.unsupportedHtmlAttributes.sort();
  findings.unsupportedEventNames.sort();

  return formatReport(
    filePath,
    supportedProps,
    allExpressions,
    findings,
    options
  );
}

export function lintFile(filePath, options = {}) {
  const resolved = validateFilePath(filePath);
  return lintSource(resolved, fs.readFileSync(resolved, 'utf8'), options);
}

function main() {
  const args = process.argv.slice(2);
  const verbose = args.includes('--verbose');
  const positionalArgs = args.filter(arg => arg !== '--verbose');

  if (positionalArgs.length > 1) {
    fail('usage: node scripts/wrec-lint.js [--verbose] {file-path}');
  }

  const [filePath] = positionalArgs;

  if (filePath) {
    process.stdout.write(
      lintFile(validateFilePath(filePath), {
        showFileHeader: false,
        verbose
      })
    );
    return;
  }

  const rootDir = process.cwd();
  let previousHadIssues = false;
  findWrecFiles(rootDir, matchedFile => {
    const report = lintFile(matchedFile, {
      fileLabel:
        path.relative(rootDir, matchedFile) || path.basename(matchedFile),
      showDetailsForCleanFile: false,
      showNoIssuesMessage: false,
      verbose
    });
    const currentHasIssues = report.trim().includes('\n');
    if (previousHadIssues) process.stdout.write('\n');
    process.stdout.write(report);
    previousHadIssues = currentHasIssues;
  });
}

function toUserFacingExpression(text) {
  return text.replaceAll(WREC_REF_NAME, 'this');
}

function typeExpressionKind(expression) {
  if (!expression) return undefined;
  if (ts.isIdentifier(expression)) return expression.text;
  return undefined;
}

function validateComputedProperty(
  propName,
  computedText,
  supportedProps,
  classMethods,
  findings
) {
  for (const match of computedText.matchAll(THIS_REF_RE)) {
    const referencedName = match[1];
    if (
      !supportedProps.has(referencedName) &&
      !classMethods.has(referencedName)
    ) {
      findings.invalidComputedProperties.push(
        `property "${propName}" computed references missing property "${referencedName}"`
      );
    }
  }

  for (const match of computedText.matchAll(THIS_CALL_RE)) {
    const methodName = match[1];
    if (!classMethods.has(methodName)) {
      findings.invalidComputedProperties.push(
        `property "${propName}" computed calls non-method instance member "${methodName}"`
      );
    }
  }
}

function validateDefaultValue(checker, typeExpression, valueExpression) {
  if (!typeExpression || !valueExpression) return undefined;

  const typeKind = typeExpressionKind(typeExpression);
  const valueType = checker.getTypeAtLocation(valueExpression);
  const valueTypeName = checker.typeToString(valueType);

  if (typeKind === 'String') {
    if (
      !(valueType.flags & (ts.TypeFlags.String | ts.TypeFlags.StringLiteral))
    ) {
      return {typeName: 'string', valueTypeName};
    }
    return undefined;
  }

  if (typeKind === 'Number') {
    if (
      !(valueType.flags & (ts.TypeFlags.Number | ts.TypeFlags.NumberLiteral))
    ) {
      return {typeName: 'number', valueTypeName};
    }
    return undefined;
  }

  if (typeKind === 'Boolean') {
    if (
      !(valueType.flags & (ts.TypeFlags.Boolean | ts.TypeFlags.BooleanLiteral))
    ) {
      return {typeName: 'boolean', valueTypeName};
    }
    return undefined;
  }

  if (typeKind === 'Array') {
    if (!checker.isArrayType(valueType) && !checker.isTupleType(valueType)) {
      return {typeName: 'array', valueTypeName};
    }
    return undefined;
  }

  if (typeKind === 'Object') {
    const isObjectLike =
      Boolean(valueType.flags & ts.TypeFlags.Object) &&
      !checker.isArrayType(valueType) &&
      !checker.isTupleType(valueType);
    if (!isObjectLike) {
      return {typeName: 'object', valueTypeName};
    }
  }

  return undefined;
}

function validateFilePath(filePath) {
  const resolved = path.resolve(filePath);
  const ext = path.extname(resolved);
  if (ext !== '.js' && ext !== '.ts') {
    throw new Error('argument must be a path to a .js or .ts file');
  }
  if (!fs.existsSync(resolved)) {
    throw new Error(`file not found: ${resolved}`);
  }
  return resolved;
}

function validatePropertyConfigs(
  checker,
  supportedProps,
  propertyEntries,
  classMethods,
  findings
) {
  for (const {config, propName} of propertyEntries) {
    const typeProp = getObjectProperty(config, 'type');
    const usedByProp = getObjectProperty(config, 'usedBy');
    const computedProp = getObjectProperty(config, 'computed');
    const valueProp = getObjectProperty(config, 'value');
    const valuesProp = getObjectProperty(config, 'values');

    const typeExpression =
      typeProp && ts.isPropertyAssignment(typeProp)
        ? typeProp.initializer
        : undefined;

    if (!typeExpression) {
      findings.missingTypeProperties.push(
        `property "${propName}" does not specify a type`
      );
    }

    if (usedByProp && ts.isPropertyAssignment(usedByProp)) {
      const methods = getStringOrStringArrayLiteral(usedByProp);

      if (methods) {
        for (const methodName of methods) {
          if (!classMethods.has(methodName)) {
            findings.invalidUsedByReferences.push(
              `property "${propName}" usedBy references missing method "${methodName}"`
            );
          }
        }
      }
    }

    if (
      computedProp &&
      ts.isPropertyAssignment(computedProp) &&
      (ts.isStringLiteral(computedProp.initializer) ||
        ts.isNoSubstitutionTemplateLiteral(computedProp.initializer))
    ) {
      validateComputedProperty(
        propName,
        computedProp.initializer.text,
        supportedProps,
        classMethods,
        findings
      );
    }

    const values = getStringArrayLiteral(valuesProp);
    if (values) {
      if (typeExpressionKind(typeExpression) !== 'String') {
        findings.invalidValuesConfigurations.push(
          `property "${propName}" uses values, but its type is not String`
        );
      }

      if (
        valueProp &&
        ts.isPropertyAssignment(valueProp) &&
        (ts.isStringLiteral(valueProp.initializer) ||
          ts.isNoSubstitutionTemplateLiteral(valueProp.initializer)) &&
        !values.includes(valueProp.initializer.text)
      ) {
        findings.invalidDefaultValues.push(
          `property "${propName}" default value "${valueProp.initializer.text}" is not in values`
        );
      }
    }

    if (valueProp && ts.isPropertyAssignment(valueProp)) {
      const mismatch = validateDefaultValue(
        checker,
        typeExpression,
        valueProp.initializer
      );
      if (mismatch) {
        findings.invalidDefaultValues.push(
          `property "${propName}" default value has type ${mismatch.valueTypeName}, but declared type is ${mismatch.typeName}`
        );
      }
    }
  }
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

function validateFormAssocAttribute(attrName, attrValue, findings) {
  if (attrName !== 'form-assoc') return;

  const pairs = attrValue.split(',');
  for (const pair of pairs) {
    const trimmed = pair.trim();
    const [propName, fieldName, ...rest] = trimmed
      .split(':')
      .map(part => part.trim());
    if (!trimmed || rest.length > 0 || !propName || !fieldName) {
      findings.invalidFormAssocValues.push(
        `form-assoc="${attrValue}" is invalid; expected "property:field" or a comma-separated list of them`
      );
      return;
    }
  }
}

function validateFormAssocPropertyMappings(
  node,
  attrName,
  attrValue,
  findings,
  componentPropertyMaps
) {
  if (attrName !== 'form-assoc') return;
  const tagName = (node.rawTagName || node.tagName || '').toLowerCase();
  const supportedProps = componentPropertyMaps.get(tagName);
  if (!supportedProps) return;

  const pairs = attrValue.split(',');
  for (const pair of pairs) {
    const [propName] = pair.split(':').map(part => part.trim());
    if (!propName) continue;
    if (!supportedProps.has(propName)) {
      findings.invalidFormAssocValues.push(
        `form-assoc="${attrValue}" refers to missing component property "${propName}"`
      );
    }
  }
}

function validateHtmlAttribute(node, attrName, findings) {
  if (attrName.startsWith('aria-') || attrName.startsWith('data-')) return;
  if (attrName.startsWith('on')) return;
  if (attrName === 'form-assoc') return;
  if (attrName === 'ref') return;

  const [baseAttrName] = attrName.split(':');
  if (HTML_GLOBAL_ATTRIBUTES.has(baseAttrName)) return;

  const tagName = (node.rawTagName || node.tagName || '').toLowerCase();
  if (!tagName || tagName.includes('-')) return;

  const supported = getSupportedHtmlAttributes(tagName);
  if (!supported) return;
  if (supported.has(baseAttrName)) return;

  findings.unsupportedHtmlAttributes.push(
    `${tagName} attribute "${attrName}" is not supported`
  );
}

function validateValueBindingEvent(node, attrName, findings) {
  const [realAttrName, eventName] = attrName.split(':');
  if (realAttrName !== 'value' || !eventName) return;
  if (SUPPORTED_EVENT_NAMES.has(eventName)) return;

  const tagName = node.rawTagName || node.tagName || 'element';
  findings.unsupportedEventNames.push(
    `${tagName} attribute "${attrName}" refers to an unsupported event name "${eventName}"`
  );
}

function validateRefAttribute(
  attrValue,
  supportedProps,
  findings,
  seenRefProps
) {
  if (!attrValue) return;

  const propName = attrValue.trim();
  if (!propName) return;

  const propInfo = supportedProps.get(propName);
  if (!propInfo) {
    findings.invalidRefAttributes.push(
      `ref="${attrValue}" refers to missing property "${propName}"`
    );
    return;
  }

  if (propInfo.typeText !== 'HTMLElement') {
    findings.invalidRefAttributes.push(
      `ref="${attrValue}" refers to property "${propName}" whose type is not HTMLElement`
    );
    return;
  }

  if (seenRefProps.has(propName)) {
    findings.invalidRefAttributes.push(
      `ref="${attrValue}" is a duplicate reference to the property "${propName}"`
    );
    return;
  }

  seenRefProps.add(propName);
}

function getHtmlTagName(node) {
  const tagName = node.rawTagName || node.tagName;
  return typeof tagName === 'string' ? tagName.toLowerCase() : '';
}

function validateHtmlNesting(node, findings) {
  const tagName = getHtmlTagName(node);
  if (!tagName || tagName.includes('-')) return;

  const parentNode = node.parentNode?.nodeType === 1 ? node.parentNode : null;
  const parentTagName = parentNode ? getHtmlTagName(parentNode) : '';
  const allowedParents = HTML_ALLOWED_PARENTS.get(tagName);
  if (
    allowedParents &&
    (!parentTagName || !allowedParents.has(parentTagName))
  ) {
    findings.invalidHtmlNesting.push(
      `<${tagName}> must be nested inside ${[...allowedParents]
        .map(name => `<${name}>`)
        .join(
          ' or '
        )}, but parent is ${parentTagName ? `<${parentTagName}>` : 'the document root'}`
    );
  }

  const allowedChildren = HTML_ALLOWED_CHILDREN.get(tagName);
  if (!allowedChildren) return;

  for (const child of node.childNodes ?? []) {
    if (child.nodeType !== 1) continue;
    const childTagName = getHtmlTagName(child);
    if (!childTagName || childTagName.includes('-')) continue;
    if (allowedChildren.has(childTagName)) continue;

    findings.invalidHtmlNesting.push(
      `<${childTagName}> is not allowed directly inside <${tagName}>`
    );
  }
}

function walkHtmlNode(
  node,
  expressions,
  findings,
  componentPropertyMaps,
  supportedProps,
  seenRefProps
) {
  if (node.nodeType === 1) {
    validateHtmlNesting(node, findings);

    for (const [attrName, attrValue] of Object.entries(node.attributes)) {
      if (!attrValue) continue;
      validateFormAssocAttribute(attrName, attrValue, findings);
      validateFormAssocPropertyMappings(
        node,
        attrName,
        attrValue,
        findings,
        componentPropertyMaps
      );
      validateHtmlAttribute(node, attrName, findings);
      validateValueBindingEvent(node, attrName, findings);
      if (attrName === 'ref') {
        validateRefAttribute(attrValue, supportedProps, findings, seenRefProps);
      }
      if (
        REFS_TEST_RE.test(attrValue) ||
        (attrName.startsWith('on') && IDENTIFIER_RE.test(attrValue))
      ) {
        expressions.push({
          context: 'instance',
          eventHandler: attrName.startsWith('on'),
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
        eventHandler: false,
        kind: 'html',
        text,
        location: null
      });
    }
  }

  for (const child of node.childNodes ?? []) {
    walkHtmlNode(
      child,
      expressions,
      findings,
      componentPropertyMaps,
      supportedProps,
      seenRefProps
    );
  }
}

if (import.meta.main) {
  try {
    main();
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error));
  }
}
