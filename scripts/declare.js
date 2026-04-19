#!/usr/bin/env node

// This script inspects a given Wrec component source file and
// generates TypeScript `declare` statements for the properties
// found in the component's `static properties` declaration.
//
// To run this, enter `npx wrec-declare [--dry] {file-path}`
//
// Include the --dry flag to report whether changes are needed
// without writing the modified source back to the file.

import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import {
  collectWrecClasses,
  getMemberName,
  hasStaticModifier
} from './ast-utils.js';

const cwd = process.cwd();
const DECLARE_TYPE_MAP = new Map([
  ['Array', 'unknown[]'],
  ['Boolean', 'boolean'],
  ['Number', 'number'],
  ['Object', 'object'],
  ['String', 'string']
]);

// Analyzes a parsed source file and returns any proposed `declare` edits.
function analyzeSourceFile(sourceFile) {
  const edits = [];
  const classNodes = collectWrecClasses(sourceFile);

  for (const classNode of classNodes) {
    const propertiesMember = getLastPropertiesDeclaration(classNode);
    if (!propertiesMember) continue;

    const declareLines = [];
    for (const property of propertiesMember.initializer.properties) {
      if (!ts.isPropertyAssignment(property)) continue;

      const propName = getMemberName(property);
      if (!propName || !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(propName)) continue;

      const declareType = getDeclareType(property.initializer);
      if (!declareType) continue;
      declareLines.push(createDeclareLine(propName, declareType));
    }

    const start = propertiesMember.end;
    const end = findDeclareBlockEnd(classNode, propertiesMember, sourceFile);
    const nextText = buildDeclareBlock(
      sourceFile,
      classNode,
      propertiesMember,
      declareLines
    );
    const currentText = sourceFile.text.slice(start, end);

    if (nextText !== currentText) {
      edits.push({end, start, text: nextText});
    }
  }

  if (classNodes.length === 0) {
    return {changed: false, foundWrecSubclass: false, text: sourceFile.text};
  }

  if (edits.length === 0) {
    return {changed: false, foundWrecSubclass: true, text: sourceFile.text};
  }

  let nextSource = sourceFile.text;
  edits.sort((a, b) => b.start - a.start);

  for (const edit of edits) {
    nextSource =
      nextSource.slice(0, edit.start) + edit.text + nextSource.slice(edit.end);
  }

  return {changed: true, foundWrecSubclass: true, text: nextSource};
}

// Builds the `declare` block that should appear after `static properties`.
function buildDeclareBlock(sourceFile, classNode, propertiesMember, declareLines) {
  const {text} = sourceFile;
  const memberIndent = getIndent(text, propertiesMember.getStart(sourceFile));
  const startIndex = classNode.members.indexOf(propertiesMember) + 1;
  let nextMember = null;

  for (let index = startIndex; index < classNode.members.length; index += 1) {
    const member = classNode.members[index];
    if (isDeclarePropertyDeclaration(member)) continue;

    nextMember = member;
    break;
  }

  const nextIndent = nextMember
    ? getIndent(text, nextMember.getStart(sourceFile))
    : '';

  if (declareLines.length === 0) {
    return nextMember ? `\n\n${nextIndent}` : '\n';
  }

  const content = declareLines
    .map(line => `${memberIndent}${line}`)
    .join('\n');
  return nextMember ? `\n${content}\n\n${nextIndent}` : `\n${content}\n`;
}

// Creates a single `declare` statement for a component property.
function createDeclareLine(propName, declareType) {
  return `declare ${propName}: ${declareType};`;
}

// Determines what changes, if any, should be made in a source file.
export function evaluateSourceFile(filePath, options = {}) {
  const {dry = false} = options;
  const absFilePath = path.resolve(cwd, filePath);
  validateFile(absFilePath);

  const text = fs.readFileSync(absFilePath, 'utf8');
  const result = evaluateSourceText(absFilePath, text);

  if (!result.foundWrecSubclass) {
    throw new Error('No class extending Wrec was found.');
  }

  if (!dry && result.changed) {
    fs.writeFileSync(absFilePath, result.text);
  }

  return result;
}

// Determines what changes, if any, should be made in source file text.
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

// Finds the end of the contiguous `declare` block after `static properties`.
function findDeclareBlockEnd(classNode, propertiesMember, sourceFile) {
  const startIndex = classNode.members.indexOf(propertiesMember) + 1;

  for (let index = startIndex; index < classNode.members.length; index += 1) {
    const member = classNode.members[index];
    if (isDeclarePropertyDeclaration(member)) continue;
    return member.getStart(sourceFile);
  }

  return classNode.end - 1;
}

// Gets the TypeScript type string for a property configuration object.
function getDeclareType(initializer) {
  if (!ts.isObjectLiteralExpression(initializer)) return null;

  for (const property of initializer.properties) {
    if (
      !ts.isPropertyAssignment(property) ||
      getMemberName(property) !== 'type' ||
      !ts.isIdentifier(property.initializer)
    ) {
      continue;
    }

    return DECLARE_TYPE_MAP.get(property.initializer.text) ?? null;
  }

  return null;
}

// Gets the leading indentation in the line that contains a given position.
function getIndent(text, pos) {
  const lineStart = text.lastIndexOf('\n', pos - 1) + 1;
  const match = /^[ \t]*/.exec(text.slice(lineStart));
  return match ? match[0] : '';
}

// Gets the last `static properties = { ... }` declaration in a class.
function getLastPropertiesDeclaration(classNode) {
  let propertiesMember = null;

  for (const member of classNode.members) {
    if (
      ts.isPropertyDeclaration(member) &&
      hasStaticModifier(member) &&
      getMemberName(member) === 'properties' &&
      member.initializer &&
      ts.isObjectLiteralExpression(member.initializer)
    ) {
      propertiesMember = member;
    }
  }

  return propertiesMember;
}

// Determines whether a class member is a `declare` property declaration.
function isDeclarePropertyDeclaration(member) {
  return (
    ts.isPropertyDeclaration(member) &&
    ts.canHaveModifiers(member) &&
    ts
      .getModifiers(member)
      ?.some(mod => mod.kind === ts.SyntaxKind.DeclareKeyword) === true
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
    if (result.changed) process.exit(1);
    console.info('no changes needed');
    return;
  }

  if (result.changed) {
    console.info('updated source file');
  } else {
    console.info('no changes needed');
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

// Runs the CLI when this module is executed directly.
if (import.meta.main) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
