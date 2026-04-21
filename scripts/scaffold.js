#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

function fail(message) {
  console.error(message);
  process.exit(1);
}

function toClassName(tagName) {
  return tagName
    .split('-')
    .filter(Boolean)
    .map(part => part[0].toUpperCase() + part.slice(1))
    .join('');
}

const [tagName] = process.argv.slice(2);

if (!tagName) fail('usage: npx wrec-scaffold {tag-name}');
if (!tagName.includes('-')) fail('tag name must contain at least one hyphen');

const className = toClassName(tagName);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templatePath = path.join(__dirname, 'template.ts');
const outputPath = path.resolve(process.cwd(), `${tagName}.ts`);

if (fs.existsSync(outputPath)) {
  fail(`file already exists: ${outputPath}`);
}

const template = fs.readFileSync(templatePath, 'utf8');
const output = template
  .replaceAll('{class}', className)
  .replaceAll('{tag}', tagName);

fs.writeFileSync(outputPath, output);
