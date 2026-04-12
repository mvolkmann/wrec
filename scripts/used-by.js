#!/usr/bin/env node
// This script inspects a given Wrec component source file and
// determines the proper values for property config `usedBy` properties.
// Each value is a list of methods that use the property
// or a single method name.
//
// This uses the TypeScript compiler to parse the source file,
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
import ts from 'typescript';
import {
  extendsWrec,
  getNameText,
  getPropertyAssignmentNames,
  getWrecImportInfo,
  hasStaticModifier
} from './ast-utils.js';

const cwd = process.cwd();

// Records property names introduced by
// an identifier or object binding pattern.
// An object binding pattern is destructuring syntax
// used in a binding position, like a variable declaration,
// parameter list, or assignment target.
function addBindingName(props, name) {
  if (ts.isIdentifier(name)) {
    props.add(name.text);
  } else if (ts.isObjectBindingPattern(name)) {
    addObjectBindingProps(props, name);
  }
}

// Adds property names referenced by an object binding pattern.
function addObjectBindingProps(props, bindingPattern) {
  for (const element of bindingPattern.elements) {
    if (element.dotDotDotToken) continue;

    if (element.propertyName) {
      const name = getNameText(element.propertyName);
      if (name) props.add(name);
      continue;
    }

    addBindingName(props, element.name);
  }
}

// Analyzes a parsed source file and returns any proposed `usedBy` edits.
// This is the heart of the functionality in this script.
function analyzeSourceFile(sourceFile) {
  const edits = [];
  const {names: wrecNames, quote} = getWrecImportInfo(sourceFile);
  const suggestions = [];
  let foundWrecSubclass = false;

  // Find the statement that defines a class that extends Wrec.
  for (const node of sourceFile.statements) {
    if (!ts.isClassDeclaration(node) || !extendsWrec(node, wrecNames)) continue;
    foundWrecSubclass = true;

    let propertiesObject = null;
    // Find the static property named "properties".
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

    // Bail out if no static property named "properties" was found.
    if (!propertiesObject) continue;

    // Get a Set of the defined property names.
    const propertyNames = new Set(getPropertyAssignmentNames(propertiesObject));

    // Get a map where the keys are property names and
    // the values are Sets of public methods that use it transitively.
    const propToMethods = getMethodUsages(node, propertyNames);

    // For each member that represents a component property ...
    for (const member of propertiesObject.properties) {
      // Skip the member if not a property assignment.
      if (!ts.isPropertyAssignment(member)) continue;

      // Skip the member if we can't gets its name
      // or if its value isn't an object literal.
      const propName = getNameText(member.name);
      if (!propName || !ts.isObjectLiteralExpression(member.initializer))
        continue;

      // Convert the Set of methods that use the property into a sorted array.
      const methodNames = [
        ...(propToMethods.get(propName) ?? new Set())
      ].sort();

      // Get an array of all the NodeObjects that represent
      // properties in the configuration object, except the one for "usedBy".
      const configObject = member.initializer;
      const existingMembers = configObject.properties.filter(
        property =>
          !(
            ts.isPropertyAssignment(property) &&
            getNameText(property.name) === 'usedBy'
          )
      );

      // If the property is used by any methods ...
      if (methodNames.length > 0) {
        suggestions.push({
          propName,
          suggestion: createUsedByProperty(methodNames, quote)
        });
      } else {
        // Determine if the configuration object already had a "usedBy" property.
        const hadUsedBy =
          existingMembers.length !== configObject.properties.length;
        if (hadUsedBy) {
          suggestions.push({propName, suggestion: 'remove usedBy'});
        } else {
          continue;
        }
      }

      // Build the new text for the property configuration object.
      const nextText = buildConfigText(sourceFile, member, methodNames, quote);
      // Get the existing text for the property configuration object.
      const currentText = sourceFile.text.slice(
        configObject.getStart(sourceFile),
        configObject.end
      );
      // If they differ, add an object describing
      // the desired edit to the edits array.
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

  // If we didn't find a Wrec subclass, then there are no changes to make.
  if (!foundWrecSubclass) {
    return {
      changed: false,
      edits: [],
      foundWrecSubclass: false,
      suggestions,
      text: sourceFile.text
    };
  }

  // If we found a Wrec subclass,
  // but no edits for usedBy properties are needed ...
  if (edits.length === 0) {
    return {
      changed: false,
      edits: [],
      foundWrecSubclass: true,
      suggestions,
      text: sourceFile.text
    };
  }

  // Get the current text in the source file.
  let nextSource = sourceFile.text;

  // Sort the edits to be made from last to first.
  edits.sort((a, b) => b.start - a.start);

  // Make each of the edits to the source file.
  for (const edit of edits) {
    nextSource =
      nextSource.slice(0, edit.start) + edit.text + nextSource.slice(edit.end);
  }

  return {
    changed: true,
    edits,
    foundWrecSubclass: true,
    suggestions,
    text: nextSource
  };
}

// Builds a new property config object
// with an updated `usedBy` entry if needed.
// - member is an AST node for the initialization of a property
//   inside the "static properties" object.
// - methodsNames is an array of the methods that use the property.
// - quote is either a single or double quote.
function buildConfigText(sourceFile, member, methodNames, quote) {
  const configObject = member.initializer;

  // Get an array of AST nodes for all the config object properties
  // except `usedBy`.
  const existingMembers = configObject.properties.filter(
    property =>
      !(
        ts.isPropertyAssignment(property) &&
        getNameText(property.name) === 'usedBy'
      )
  );

  // Create property assignment strings from the AST nodes.
  const {text} = sourceFile;
  const propertyStrings = existingMembers.map(property =>
    text.slice(property.getStart(sourceFile), property.end).trim()
  );

  // If this property is used by any methods,
  // add a usedBy property that lists them.
  if (methodNames.length > 0) {
    propertyStrings.push(createUsedByProperty(methodNames, quote));
  }

  const existingPropertiesString = text.slice(
    configObject.getStart(sourceFile),
    configObject.end
  );

  const multiline = existingPropertiesString.includes('\n');
  if (multiline) {
    // Build and return a multi-line config object string
    // that preserves the existing indentation.
    const memberIndent = getIndent(text, member.getStart(sourceFile));
    const [firstMember] = existingMembers;
    const propertyIndent = firstMember
      ? getIndent(text, firstMember.getStart(sourceFile))
      : memberIndent + '  ';
    const content = propertyStrings
      .map(part => `${propertyIndent}${part}`)
      .join(',\n');
    return `{\n${content}\n${memberIndent}}`;
  }

  // Build and return a single line config object string
  // that preserves the existing spacing around curly braces.
  const openMatch = existingPropertiesString.match(/^\{(\s*)/);
  const closeMatch = existingPropertiesString.match(/(\s*)\}$/);
  const openSpacing = openMatch ? openMatch[1] : ' ';
  const closeSpacing = closeMatch ? closeMatch[1] : ' ';
  return `{${openSpacing}${propertyStrings.join(', ')}${closeSpacing}}`;
}

// Walks a method body to collect component property reads
// and method calls made through `this`.
// This is only called by getMethodUsages.
function collectMethodBodyUsage(node, props, calledMethods) {
  if (
    ts.isPropertyAccessExpression(node) &&
    node.expression.kind === ts.SyntaxKind.ThisKeyword
  ) {
    // Handles direct property access like `this.foo`
    // and records method calls like `this.foo()`.
    recordThisAccess(props, calledMethods, node, node.name.text);
  } else if (
    ts.isElementAccessExpression(node) &&
    node.expression.kind === ts.SyntaxKind.ThisKeyword &&
    node.argumentExpression &&
    ts.isStringLiteralLike(node.argumentExpression)
  ) {
    // Handles string-based element access like `this['foo']`
    // and records method calls like `this['foo']()`.
    recordThisAccess(props, calledMethods, node, node.argumentExpression.text);
  } else if (
    ts.isVariableDeclaration(node) &&
    node.initializer &&
    node.initializer.kind === ts.SyntaxKind.ThisKeyword
  ) {
    // Handles variable declarations initialized from `this`,
    // such as `const {foo} = this` or `const self = this`.
    addBindingName(props, node.name);
  } else if (
    ts.isBinaryExpression(node) &&
    node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
    node.right.kind === ts.SyntaxKind.ThisKeyword
  ) {
    // Handles assignments from `this`, such as destructuring
    // or object-literal patterns that pull named properties from it.
    if (ts.isObjectLiteralExpression(node.left)) {
      for (const property of node.left.properties) {
        if (
          ts.isShorthandPropertyAssignment(property) ||
          ts.isPropertyAssignment(property)
        ) {
          const name = getNameText(property.name);
          if (name) props.add(name);
        }
      }
    } else if (ts.isObjectBindingPattern(node.left)) {
      addObjectBindingProps(props, node.left);
    }
  }

  ts.forEachChild(node, child =>
    collectMethodBodyUsage(child, props, calledMethods)
  );
}

// Returns a string for a usedBy property.
function createUsedByProperty(methodNames, quote) {
  const value =
    methodNames.length === 1
      ? `${quote}${methodNames[0]}${quote}`
      : `[${methodNames.map(name => `${quote}${name}${quote}`).join(', ')}]`;
  return `usedBy: ${value}`;
}

// Determines what changes, if any, should be made in
// the usedBy properties in property configuration objects
// found in the file at a given relative path.
export function evaluateSourceFile(filePath, options = {}) {
  const {dry = false} = options;
  const absFilePath = path.resolve(cwd, filePath);
  validateFile(absFilePath);

  // The file is read in this function instead of in evaluateSourceText
  // so unit tests can pass hard-coded text to that function.
  const text = fs.readFileSync(absFilePath, 'utf8');
  let {
    changed,
    foundWrecSubclass,
    suggestions,
    text: nextText
  } = evaluateSourceText(absFilePath, text);

  // If we didn't find the definition of a class that extends Wrec ...
  if (!foundWrecSubclass) {
    throw new Error('No class extending Wrec was found.');
  }

  // If this isn't a dry run and changes were made,
  // write the modified source code back to the file.
  if (!dry && changed) {
    fs.writeFileSync(absFilePath, nextText);
    suggestions = []; // all the suggestions have been applied
  }

  return {changed, foundWrecSubclass, suggestions, text: nextText};
}

// Determines what changes, if any, should be made in
// the usedBy properties in property configuration objects
// found in source file text.
// This function was factored out of evaluateSourceFile
// to support unit tests.
export function evaluateSourceText(filePath, text) {
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
  return analyzeSourceFile(sourceFile);
}

// Gets the names of all methods that are called from
// JavaScript expressions in the component's static CSS template.
// This is only called by getMethodUsages.
function getCssCalledMethods(classNode) {
  const methodNames = new Set();
  const CALL_RE = /this\.([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/g;
  let template;

  for (const member of classNode.members) {
    // If this member isn't the AST node for "static css = ..."
    // then skip it.
    if (
      ts.isPropertyDeclaration(member) &&
      hasStaticModifier(member) &&
      getNameText(member.name) === 'css' &&
      member.initializer &&
      ts.isTaggedTemplateExpression(member.initializer) &&
      ts.isIdentifier(member.initializer.tag) &&
      member.initializer.tag.text === 'css'
    ) {
      // Keep the last matching declaration because
      // JavaScript class fields use last-one-wins semantics
      // when the same static field is declared twice.
      template = member.initializer.template;
    }
  }

  // If no matching declaration was found, return an empty Set.
  if (!template) return methodNames;

  // Finds all method names called in CSS property value expressions
  // matching `this.method()`.
  const text = template.getText();
  for (const match of text.matchAll(CALL_RE)) {
    methodNames.add(match[1]);
  }

  return methodNames;
}

// Gets the names of all methods that are called from
// the "computed" JavaScript expression of an component property.
// This is only called by getMethodUsages.
function getComputedCalledMethods(classNode) {
  const methodNames = new Set();
  const CALL_RE = /this\.([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/g;
  let propertiesNode;

  for (const member of classNode.members) {
    // If this member isn't the AST node for "static properties = ..."
    // then skip it.
    if (
      ts.isPropertyDeclaration(member) &&
      hasStaticModifier(member) &&
      getNameText(member.name) === 'properties' &&
      member.initializer &&
      ts.isObjectLiteralExpression(member.initializer)
    ) {
      // Keep the last matching declaration because
      // JavaScript class fields use last-one-wins semantics
      // when the same static field is declared twice.
      propertiesNode = member.initializer;
    }
  }

  // If no matching declaration was found, return an empty Set.
  if (!propertiesNode) return methodNames;

  // For each property in the last "static properties" object ...
  for (const property of propertiesNode.properties) {
    // If it isn't a property assignment or
    // the property value isn't an object literal then skip it.
    if (
      !ts.isPropertyAssignment(property) ||
      !ts.isObjectLiteralExpression(property.initializer)
    ) {
      continue;
    }

    // For each property in the configuration object ...
    for (const configProperty of property.initializer.properties) {
      // If it isn't a property assignment or
      // the property name isn't "computed" then skip it.
      if (
        !ts.isPropertyAssignment(configProperty) ||
        getNameText(configProperty.name) !== 'computed'
      ) {
        continue;
      }

      // If the property value isn't a string then skip it.
      if (!ts.isStringLiteralLike(configProperty.initializer)) continue;

      // Find all the method calls in the string JavaScript expression.
      const computed = configProperty.initializer.text;
      for (const match of computed.matchAll(CALL_RE)) {
        methodNames.add(match[1]);
      }
    }
  }

  return methodNames;
}

// Returns the leading indentation in the line
// that begins at a given position (`pos`) inside `text`.
function getIndent(text, pos) {
  const lineStart = text.lastIndexOf('\n', pos - 1) + 1;
  const match = /^[ \t]*/.exec(text.slice(lineStart));
  return match ? match[0] : '';
}

// Returns a map where the keys are property names and
// the values are Sets of public methods that use it transitively.
function getMethodUsages(classNode, propertyNames) {
  const methodInfo = new Map();

  for (const member of classNode.members) {
    // If the member doesn't represent an instance method, skip it.
    if (!isInstanceMethodMember(member)) continue;

    // If the member doesn't have a string name, skip it.
    const methodName = getNameText(member.name);
    if (!methodName) continue;

    const props = new Set();
    const calledMethods = new Set();
    collectMethodBodyUsage(member.body, props, calledMethods);
    methodInfo.set(methodName, {
      calledMethods,
      isPrivate: ts.isPrivateIdentifier(member.name),
      props
    });
  }

  // Build a Set of method names that are called from
  // the "static html" template, the "static css" template,
  // or computed property expressions.
  const entryMethods = new Set([
    ...getCssCalledMethods(classNode),
    ...getTemplateCalledMethods(classNode),
    ...getComputedCalledMethods(classNode)
  ]);
  const memo = new Map();

  const propToMethods = new Map();
  for (const methodName of entryMethods) {
    const info = methodInfo.get(methodName);
    if (!info || info.isPrivate) continue;

    for (const propName of getTransitiveProps(methodInfo, memo, methodName)) {
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

// Gets the names of all methods that are called
// from the component's static HTML template.
// This is only called by getMethodUsages.
function getTemplateCalledMethods(classNode) {
  // Find the last `static html = html\`...\`` declaration
  // because duplicate static class fields use last-one-wins semantics.
  let template;
  for (const member of classNode.members) {
    // If it's a "static html =" property assignment node ...
    if (
      ts.isPropertyDeclaration(member) &&
      hasStaticModifier(member) &&
      getNameText(member.name) === 'html' &&
      member.initializer
    ) {
      // If the value is a tagged template literal with the "html" tag ...
      if (
        ts.isTaggedTemplateExpression(member.initializer) &&
        ts.isIdentifier(member.initializer.tag) &&
        member.initializer.tag.text === 'html'
      ) {
        template = member.initializer.template;
      }
    }
  }

  const methodNames = new Set();
  if (template) {
    // Finds all method names called in the HTML template
    // matching `this.method()`.
    const text = template.getText();
    const CALL_RE = /this\.([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/g;
    for (const match of text.matchAll(CALL_RE)) {
      methodNames.add(match[1]);
    }
  }
  return methodNames;
}

// Recursively follow method-call chains to accumulate all accessed properties.
// This is only called by getMethodUsages.
function getTransitiveProps(methodInfo, memo, methodName, seen = new Set()) {
  // Starting from methods that are reachable from
  // css/template/computed properties, walk through nested method calls
  // and accumulate every component property touched along the way.
  if (memo.has(methodName)) return memo.get(methodName);
  if (seen.has(methodName)) return new Set();

  seen.add(methodName);
  const info = methodInfo.get(methodName);
  const props = new Set(info?.props ?? []);

  if (info) {
    for (const calledMethod of info.calledMethods) {
      const calledProps = getTransitiveProps(
        methodInfo,
        memo,
        calledMethod,
        seen
      );
      for (const propName of calledProps) props.add(propName);
    }
  }

  seen.delete(methodName);
  memo.set(methodName, props);
  return props;
}

// Determines if a class member represents an instance method.
// This is only called by getMethodUsages.
function isInstanceMethodMember(member) {
  return (
    !hasStaticModifier(member) &&
    (ts.isMethodDeclaration(member) ||
      ts.isGetAccessorDeclaration(member) ||
      ts.isSetAccessorDeclaration(member)) &&
    member.body
  );
}

// Determines if a path refers to a JavaScript or TypeScript source file.
function isSupportedSourceFile(filePath, excludeTests = false) {
  return (
    /\.(js|ts)$/.test(filePath) &&
    !/\.d\.ts$/.test(filePath) &&
    (!excludeTests || !filePath.includes('.test.'))
  );
}

// Handles CLI arguments and runs the script.
function main() {
  const args = process.argv.slice(2);
  const unknownFlags = args.filter(
    arg => arg.startsWith('--') && arg !== '--dry'
  );
  if (unknownFlags.length > 0) {
    throw new Error(`unknown option: ${unknownFlags[0]}`);
  }

  const inputPaths = args.filter(arg => !arg.startsWith('--'));

  if (inputPaths.length !== 1) {
    throw new Error('Specify a single source file');
  }

  const dry = args.includes('--dry');
  const result = evaluateSourceFile(inputPaths[0], {dry});
  if (dry) {
    // Report the proposed changes.
    for (const {propName, suggestion} of result.suggestions) {
      console.info(`${propName} - ${suggestion}`);
    }

    // Exit with a non-zero when there is at least one change
    // so that condition can be checked.
    if (result.changed) process.exit(1);
  } else if (result.changed) {
    console.info('updated source file');
  } else {
    console.info('no changes needed');
  }
}

// Records a `this` property access and
// tracks it as a method call when applicable.
function recordThisAccess(props, calledMethods, node, name) {
  props.add(name);
  if (ts.isCallExpression(node.parent) && node.parent.expression === node) {
    calledMethods.add(name);
  }
}

// Validates that a source file exists and has a supported extension.
function validateFile(absFilePath) {
  if (!fs.existsSync(absFilePath)) throw new Error('File not found');

  const stat = fs.statSync(absFilePath);
  if (!stat.isFile()) throw new Error('Not a file');

  if (!/\.(js|ts)$/.test(absFilePath) || /\.d\.ts$/.test(absFilePath)) {
    throw new Error('Unsupported file type');
  }
}

// If this is being run as a script,
// versus being imported (likely by test code) ...
if (import.meta.main) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
