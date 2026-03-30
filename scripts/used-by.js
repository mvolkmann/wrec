#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const verbose = args.includes('--verbose');
const inputPaths = args.filter(arg => !arg.startsWith('--'));

if (args.includes('--write')) {
  console.error('--write is no longer supported; writing is now the default.');
  process.exit(1);
}

if (args.includes('--check')) {
  console.error('Use --dry instead of --check.');
  process.exit(1);
}

if (inputPaths.length !== 1) {
  console.error(
    'Specify a single source file, e.g. npx wrec-usedby src/examples/radio-group.js'
  );
  process.exit(1);
}

const cwd = process.cwd();
const targets = inputPaths.map(file => path.resolve(cwd, file));

for (const target of targets) {
  if (!fs.existsSync(target)) {
    console.error(`File not found: ${path.relative(cwd, target)}`);
    process.exit(1);
  }

  const stat = fs.statSync(target);
  if (!stat.isFile()) {
    console.error(`Not a file: ${path.relative(cwd, target)}`);
    process.exit(1);
  }

  if (!/\.(js|ts)$/.test(target) || /\.d\.ts$/.test(target)) {
    console.error(
      `Unsupported file type: ${path.relative(cwd, target)}`
    );
    process.exit(1);
  }
}

function collectFiles(startPath, files = []) {
  if (!fs.existsSync(startPath)) return files;

  const stat = fs.statSync(startPath);
  if (stat.isFile()) {
    if (/\.(js|ts)$/.test(startPath) && !/\.d\.ts$/.test(startPath)) {
      files.push(startPath);
    }
    return files;
  }

  for (const entry of fs.readdirSync(startPath, {withFileTypes: true})) {
    const fullPath = path.join(startPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      collectFiles(fullPath, files);
    } else if (
      entry.isFile() &&
      /\.(js|ts)$/.test(entry.name) &&
      !entry.name.endsWith('.d.ts') &&
      !entry.name.includes('.test.')
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = targets.flatMap(target => collectFiles(target));

function getNameText(name) {
  if (
    ts.isIdentifier(name) ||
    ts.isStringLiteral(name) ||
    ts.isPrivateIdentifier(name)
  ) {
    return name.text;
  }
  return null;
}

function hasStaticModifier(node) {
  return Boolean(
    node.modifiers?.some(m => m.kind === ts.SyntaxKind.StaticKeyword)
  );
}

function getWrecNames(sourceFile) {
  const names = new Set(['Wrec']);

  for (const statement of sourceFile.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      !statement.importClause ||
      !ts.isStringLiteral(statement.moduleSpecifier)
    ) {
      continue;
    }

    const moduleName = statement.moduleSpecifier.text;
    const isWrecModule =
      moduleName === 'wrec' ||
      moduleName === 'wrec/ssr' ||
      moduleName.endsWith('/wrec') ||
      moduleName.endsWith('/wrec-ssr');
    if (!isWrecModule) continue;

    const namedBindings = statement.importClause.namedBindings;
    if (!namedBindings || !ts.isNamedImports(namedBindings)) continue;

    for (const element of namedBindings.elements) {
      const importedName = element.propertyName?.text ?? element.name.text;
      if (importedName === 'Wrec') names.add(element.name.text);
    }
  }

  return names;
}

function extendsWrec(node, wrecNames) {
  return Boolean(
    node.heritageClauses?.some(
      clause =>
        clause.token === ts.SyntaxKind.ExtendsKeyword &&
        clause.types.some(
          type =>
            ts.isExpressionWithTypeArguments(type) &&
            ts.isIdentifier(type.expression) &&
            wrecNames.has(type.expression.text)
        )
    )
  );
}

function getTemplateCalledMethods(classNode) {
  const methodNames = new Set();
  const CALL_RE = /this\.([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/g;

  function visit(node) {
    if (
      ts.isPropertyAccessExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ThisKeyword &&
      ts.isCallExpression(node.parent) &&
      node.parent.expression === node
    ) {
      methodNames.add(node.name.text);
    }

    ts.forEachChild(node, visit);
  }

  function addTemplateTextMethods(template) {
    const text = template.getText();
    for (const match of text.matchAll(CALL_RE)) {
      methodNames.add(match[1]);
    }
  }

  for (const member of classNode.members) {
    if (
      ts.isPropertyDeclaration(member) &&
      hasStaticModifier(member) &&
      getNameText(member.name) === 'html' &&
      member.initializer
    ) {
      if (
        ts.isTaggedTemplateExpression(member.initializer) &&
        ts.isIdentifier(member.initializer.tag) &&
        member.initializer.tag.text === 'html'
      ) {
        addTemplateTextMethods(member.initializer.template);
      }
      ts.forEachChild(member.initializer, visit);
    }
  }

  return methodNames;
}

function getComputedCalledMethods(classNode) {
  const methodNames = new Set();
  const CALL_RE = /this\.([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/g;

  for (const member of classNode.members) {
    if (
      !ts.isPropertyDeclaration(member) ||
      !hasStaticModifier(member) ||
      getNameText(member.name) !== 'properties' ||
      !member.initializer ||
      !ts.isObjectLiteralExpression(member.initializer)
    ) {
      continue;
    }

    for (const property of member.initializer.properties) {
      if (
        !ts.isPropertyAssignment(property) ||
        !ts.isObjectLiteralExpression(property.initializer)
      ) {
        continue;
      }

      for (const configProperty of property.initializer.properties) {
        if (
          !ts.isPropertyAssignment(configProperty) ||
          getNameText(configProperty.name) !== 'computed'
        ) {
          continue;
        }

        if (!ts.isStringLiteralLike(configProperty.initializer)) continue;
        const computed = configProperty.initializer.text;
        for (const match of computed.matchAll(CALL_RE)) {
          methodNames.add(match[1]);
        }
      }
    }
  }

  return methodNames;
}

function getMethodUsages(classNode, propertyNames) {
  const methodInfo = new Map();
  for (const member of classNode.members) {
    if (hasStaticModifier(member)) continue;

    if (
      (ts.isMethodDeclaration(member) ||
        ts.isGetAccessorDeclaration(member) ||
        ts.isSetAccessorDeclaration(member)) &&
      member.body
    ) {
      const methodName = getNameText(member.name);
      if (!methodName) continue;

      const props = new Set();
      const calledMethods = new Set();
      const isPrivate = ts.isPrivateIdentifier(member.name);

      function addBindingName(name) {
        if (ts.isIdentifier(name)) {
          props.add(name.text);
        } else if (ts.isObjectBindingPattern(name)) {
          addObjectBindingProps(name);
        }
      }

      function addObjectBindingProps(bindingPattern) {
        for (const element of bindingPattern.elements) {
          if (element.dotDotDotToken) continue;

          if (element.propertyName) {
            const name = getNameText(element.propertyName);
            if (name) props.add(name);
            continue;
          }

          if (ts.isIdentifier(element.name)) {
            props.add(element.name.text);
          } else if (ts.isObjectBindingPattern(element.name)) {
            addObjectBindingProps(element.name);
          }
        }
      }

      function visit(child) {
        if (
          ts.isPropertyAccessExpression(child) &&
          child.expression.kind === ts.SyntaxKind.ThisKeyword
        ) {
          const name = child.name.text;
          props.add(name);
          if (
            ts.isCallExpression(child.parent) &&
            child.parent.expression === child
          ) {
            calledMethods.add(name);
          }
        } else if (
          ts.isElementAccessExpression(child) &&
          child.expression.kind === ts.SyntaxKind.ThisKeyword &&
          child.argumentExpression &&
          ts.isStringLiteralLike(child.argumentExpression)
        ) {
          const name = child.argumentExpression.text;
          props.add(name);
          if (
            ts.isCallExpression(child.parent) &&
            child.parent.expression === child
          ) {
            calledMethods.add(name);
          }
        } else if (
          ts.isVariableDeclaration(child) &&
          child.initializer &&
          child.initializer.kind === ts.SyntaxKind.ThisKeyword
        ) {
          if (ts.isObjectBindingPattern(child.name)) {
            addObjectBindingProps(child.name);
          } else {
            addBindingName(child.name);
          }
        } else if (
          ts.isBinaryExpression(child) &&
          child.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
          child.right.kind === ts.SyntaxKind.ThisKeyword
        ) {
          if (ts.isObjectLiteralExpression(child.left)) {
            for (const property of child.left.properties) {
              if (
                ts.isShorthandPropertyAssignment(property) ||
                ts.isPropertyAssignment(property)
              ) {
                const name = getNameText(property.name);
                if (name) props.add(name);
              }
            }
          } else if (ts.isObjectBindingPattern(child.left)) {
            addObjectBindingProps(child.left);
          }
        }

        ts.forEachChild(child, visit);
      }

      ts.forEachChild(member.body, visit);
      methodInfo.set(methodName, {calledMethods, isPrivate, props});
    }
  }

  const entryMethods = new Set([
    ...getTemplateCalledMethods(classNode),
    ...getComputedCalledMethods(classNode)
  ]);
  const memo = new Map();

  function getTransitiveProps(methodName, seen = new Set()) {
    if (memo.has(methodName)) return memo.get(methodName);
    if (seen.has(methodName)) return new Set();

    seen.add(methodName);
    const info = methodInfo.get(methodName);
    const props = new Set(info?.props ?? []);

    if (info) {
      for (const calledMethod of info.calledMethods) {
        const calledProps = getTransitiveProps(calledMethod, seen);
        for (const propName of calledProps) props.add(propName);
      }
    }

    seen.delete(methodName);
    memo.set(methodName, props);
    return props;
  }

  const propToMethods = new Map();
  for (const methodName of entryMethods) {
    const info = methodInfo.get(methodName);
    if (!info || info.isPrivate) continue;

    if (info.isPrivate) continue;

    for (const propName of getTransitiveProps(methodName)) {
      if (!propertyNames.has(propName)) continue;

      let methods = propToMethods.get(propName);
      if (!methods) {
        methods = new Set();
        propToMethods.set(propName, methods);
      }
      methods.add(methodName);
    }
  }

  return propToMethods;
}

function createUsedByProperty(methodNames) {
  return `usedBy: [${methodNames.map(name => `'${name}'`).join(', ')}]`;
}

function getIndent(text, pos) {
  const lineStart = text.lastIndexOf('\n', pos - 1) + 1;
  const match = /^[ \t]*/.exec(text.slice(lineStart));
  return match ? match[0] : '';
}

function buildConfigText(sourceFile, member, methodNames) {
  const {text} = sourceFile;
  const configObject = member.initializer;
  const existingMembers = configObject.properties.filter(
    property =>
      !(
        ts.isPropertyAssignment(property) &&
        getNameText(property.name) === 'usedBy'
      )
  );
  const existingTexts = existingMembers.map(property =>
    text.slice(property.getStart(sourceFile), property.end).trim()
  );
  if (methodNames.length > 0)
    existingTexts.push(createUsedByProperty(methodNames));

  const original = text.slice(
    configObject.getStart(sourceFile),
    configObject.end
  );
  const multiline = original.includes('\n');
  if (!multiline) return `{${existingTexts.join(', ')}}`;

  const memberIndent = getIndent(text, member.getStart(sourceFile));
  const firstExisting = existingMembers[0];
  const innerIndent = firstExisting
    ? getIndent(text, firstExisting.getStart(sourceFile))
    : memberIndent + '  ';
  return `{\n${existingTexts.map(part => `${innerIndent}${part}`).join(',\n')}\n${memberIndent}}`;
}

function transformSourceFile(sourceFile) {
  const edits = [];
  const wrecNames = getWrecNames(sourceFile);

  for (const node of sourceFile.statements) {
    if (!ts.isClassDeclaration(node) || !extendsWrec(node, wrecNames)) continue;

    let propertiesObject = null;
    for (const member of node.members) {
      if (
        ts.isPropertyDeclaration(member) &&
        hasStaticModifier(member) &&
        getNameText(member.name) === 'properties' &&
        member.initializer &&
        ts.isObjectLiteralExpression(member.initializer)
      ) {
        propertiesObject = member.initializer;
        break;
      }
    }

    if (!propertiesObject) continue;

    const propertyNames = new Set(
      propertiesObject.properties
        .filter(ts.isPropertyAssignment)
        .map(property => getNameText(property.name))
        .filter(Boolean)
    );

    const propToMethods = getMethodUsages(node, propertyNames);
    for (const member of propertiesObject.properties) {
      if (!ts.isPropertyAssignment(member)) continue;

      const propName = getNameText(member.name);
      if (!propName || !ts.isObjectLiteralExpression(member.initializer))
        continue;

      const methodNames = [
        ...(propToMethods.get(propName) ?? new Set())
      ].sort();
      const configObject = member.initializer;
      const existingMembers = configObject.properties.filter(
        property =>
          !(
            ts.isPropertyAssignment(property) &&
            getNameText(property.name) === 'usedBy'
          )
      );
      const hadUsedBy =
        existingMembers.length !== configObject.properties.length;
      const needsUsedBy = methodNames.length > 0;
      if (!hadUsedBy && !needsUsedBy) continue;

      const nextText = buildConfigText(sourceFile, member, methodNames);
      const currentText = sourceFile.text.slice(
        configObject.getStart(sourceFile),
        configObject.end
      );
      if (nextText !== currentText) {
        edits.push({
          start: configObject.getStart(sourceFile),
          end: configObject.end,
          propName,
          oldText: currentText,
          text: nextText
        });
      }
    }
  }

  if (edits.length === 0) {
    return {changed: false, edits: [], text: sourceFile.text};
  }

  let nextSource = sourceFile.text;
  edits.sort((a, b) => b.start - a.start);
  for (const edit of edits) {
    nextSource =
      nextSource.slice(0, edit.start) + edit.text + nextSource.slice(edit.end);
  }

  return {changed: true, edits, text: nextSource};
}

let changedCount = 0;

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const scriptKind = file.endsWith('.ts') ? ts.ScriptKind.TS : ts.ScriptKind.JS;
  const sourceFile = ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    true,
    scriptKind
  );

  const {changed, edits, text: nextText} = transformSourceFile(sourceFile);
  if (!changed) continue;

  changedCount++;
  if (dry) {
    for (const edit of edits.toReversed()) {
      const match = edit.text.match(/usedBy:\s*\[[^\]]*\]/);
      const suggestion = match ? match[0] : 'remove usedBy';
      console.log(`${edit.propName} - ${suggestion}`);
    }
  } else {
    fs.writeFileSync(file, nextText);
  }
  if (verbose && !dry) console.log('updated');
}

if (dry && changedCount > 0) process.exit(1);

if (dry && changedCount === 0) {
  console.log('usedBy is already up to date.');
}
