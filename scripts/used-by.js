#!/usr/bin/env node
// This script inspects a given Wrec component source file and
// determines the proper values for property config `usedBy` properties.
// Each value is a list of methods that use the property
// or a single method name.
// It uses the TypeScript compiler to parse the file,
// discover which expressions call which methods,
// trace property usage through those call chains, and
// output or update the `usedBy` properties`.
//
// To run this, enter `npx wrec-usedby [--dry] [file-path]`
// If no file-path is specified, the script runs on
// all .js and .ts files in and below the current directory.
//
// Include the --dry flag for a dry run where `usedBy` values are output,
// but no files are modified.

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';

function buildConfigText(sourceFile, member, methodNames, quote) {
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
    existingTexts.push(createUsedByProperty(methodNames, quote));

  const original = text.slice(
    configObject.getStart(sourceFile),
    configObject.end
  );
  const multiline = original.includes('\n');
  if (!multiline) return `{ ${existingTexts.join(', ')} }`;

  // Preserve the surrounding formatting style so the update feels like a
  // minimal edit instead of reformatting the whole object.
  const memberIndent = getIndent(text, member.getStart(sourceFile));
  const firstExisting = existingMembers[0];
  const innerIndent = firstExisting
    ? getIndent(text, firstExisting.getStart(sourceFile))
    : memberIndent + '  ';
  return `{\n${existingTexts.map(part => `${innerIndent}${part}`).join(',\n')}\n${memberIndent}}`;
}

function collectFiles(startPath, files = []) {
  if (!fs.existsSync(startPath)) return files;

  const stat = fs.statSync(startPath);
  if (stat.isFile()) {
    if (isSupportedSourceFile(startPath)) files.push(startPath);
    return files;
  }

  for (const entry of fs.readdirSync(startPath, {withFileTypes: true})) {
    const fullPath = path.join(startPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      collectFiles(fullPath, files);
    } else if (entry.isFile() && isSupportedSourceFile(entry.name, true)) {
      files.push(fullPath);
    }
  }

  return files;
}

function createUsedByProperty(methodNames, quote) {
  if (methodNames.length === 1) {
    return `usedBy: ${quote}${methodNames[0]}${quote}`;
  }
  return `usedBy: [${methodNames.map(name => `${quote}${name}${quote}`).join(', ')}]`;
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

function getIndent(text, pos) {
  const lineStart = text.lastIndexOf('\n', pos - 1) + 1;
  const match = /^[ \t]*/.exec(text.slice(lineStart));
  return match ? match[0] : '';
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
        // Record both direct property reads like `this.foo` and method calls
        // like `this.renderFoo()` so we can later propagate property usage
        // through method-to-method call chains.
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
    // Starting from methods that are reachable from the template/computed
    // properties, walk through nested method calls and accumulate every
    // component property touched along the way.
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
    // Template expressions can hide method calls inside raw template text,
    // so use a regex in addition to AST traversal to catch those names.
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

function getWrecImportInfo(sourceFile) {
  const names = new Set(['Wrec']);
  let quote = "'";

  // Support aliased imports such as `import {Wrec as Base} from 'wrec'`
  // so subclass detection still works and generated text matches the
  // file's existing quote style.
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
      if (importedName === 'Wrec') {
        names.add(element.name.text);

        const moduleText = statement.moduleSpecifier.getText(sourceFile);
        if (moduleText.startsWith('"') || moduleText.startsWith("'")) {
          quote = moduleText[0];
        }
      }
    }
  }

  return {names, quote};
}

function hasStaticModifier(node) {
  return Boolean(
    node.modifiers?.some(m => m.kind === ts.SyntaxKind.StaticKeyword)
  );
}

function isSupportedSourceFile(filePath, excludeTests = false) {
  return (
    /\.(js|ts)$/.test(filePath) &&
    !/\.d\.ts$/.test(filePath) &&
    (!excludeTests || !filePath.includes('.test.'))
  );
}

function transformSourceFile(sourceFile) {
  const edits = [];
  const {names: wrecNames, quote} = getWrecImportInfo(sourceFile);
  let foundWrecSubclass = false;

  // Each matching class contributes text replacements for the specific
  // property config objects that need `usedBy` added, updated, or removed.
  for (const node of sourceFile.statements) {
    if (!ts.isClassDeclaration(node) || !extendsWrec(node, wrecNames)) continue;
    foundWrecSubclass = true;

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

      const nextText = buildConfigText(sourceFile, member, methodNames, quote);
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

  if (!foundWrecSubclass) {
    return {
      changed: false,
      edits: [],
      foundWrecSubclass: false,
      text: sourceFile.text
    };
  }

  if (edits.length === 0) {
    return {
      changed: false,
      edits: [],
      foundWrecSubclass: true,
      text: sourceFile.text
    };
  }

  let nextSource = sourceFile.text;
  edits.sort((a, b) => b.start - a.start);
  for (const edit of edits) {
    nextSource =
      nextSource.slice(0, edit.start) + edit.text + nextSource.slice(edit.end);
  }

  return {changed: true, edits, foundWrecSubclass: true, text: nextSource};
}

function validateTargetFile(target, cwd = process.cwd()) {
  if (!fs.existsSync(target)) {
    throw new Error(`File not found: ${path.relative(cwd, target)}`);
  }

  const stat = fs.statSync(target);
  if (!stat.isFile()) {
    throw new Error(`Not a file: ${path.relative(cwd, target)}`);
  }

  if (!/\.(js|ts)$/.test(target) || /\.d\.ts$/.test(target)) {
    throw new Error(`Unsupported file type: ${path.relative(cwd, target)}`);
  }
}

export function updateUsedBySource(filePath, text) {
  const scriptKind = filePath.endsWith('.ts')
    ? ts.ScriptKind.TS
    : ts.ScriptKind.JS;
  const sourceFile = ts.createSourceFile(
    filePath,
    text,
    ts.ScriptTarget.Latest,
    true,
    scriptKind
  );

  return transformSourceFile(sourceFile);
}

export function updateUsedByFile(filePath, options = {}) {
  const {dry = false, quiet = false} = options;
  const cwd = process.cwd();
  const resolved = path.resolve(cwd, filePath);
  validateTargetFile(resolved, cwd);

  const text = fs.readFileSync(resolved, 'utf8');
  const {
    changed,
    edits,
    foundWrecSubclass,
    text: nextText
  } = updateUsedBySource(resolved, text);
  if (!foundWrecSubclass) {
    throw new Error('No class extending Wrec was found.');
  }
  if (dry) {
    const suggestions = edits.toReversed().map(edit => {
      const match = edit.text.match(/usedBy:\s*(?:['"][^'"]*['"]|\[[^\]]*\])/);
      return {
        propName: edit.propName,
        suggestion: match ? match[0] : 'remove usedBy'
      };
    });
    return {changed, foundWrecSubclass, suggestions, text: nextText};
  }

  if (changed) {
    // Otherwise, apply the rewritten source text back to disk.
    fs.writeFileSync(resolved, nextText);
  }
  return {changed, foundWrecSubclass, suggestions: [], text: nextText, quiet};
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function main() {
  const args = process.argv.slice(2);
  const dry = args.includes('--dry');
  const quiet = args.includes('--quiet');
  const inputPaths = args.filter(arg => !arg.startsWith('--'));

  if (args.includes('--check')) {
    throw new Error('Use --dry instead of --check.');
  }

  if (inputPaths.length !== 1) {
    throw new Error(
      'Specify a single source file, e.g. npx wrec-usedby src/examples/radio-group.js'
    );
  }

  const result = updateUsedByFile(inputPaths[0], {dry, quiet});
  if (dry) {
    if (!result.changed) {
      console.log('usedBy is already up to date.');
      return;
    }

    // In dry mode, report the inferred change and exit non-zero when at
    // least one update would be needed so the script can be used in checks.
    for (const {propName, suggestion} of result.suggestions) {
      console.log(`${propName} - ${suggestion}`);
    }
    process.exit(1);
  }

  if (result.changed) console.log('updated');
}

const isCliEntry = (() => {
  if (!process.argv[1]) return false;
  try {
    return (
      fs.realpathSync(process.argv[1]) ===
      fs.realpathSync(fileURLToPath(import.meta.url))
    );
  } catch {
    return path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
  }
})();

if (isCliEntry) {
  try {
    main();
  } catch (error) {
    fail(error instanceof Error ? error.message : String(error));
  }
}
