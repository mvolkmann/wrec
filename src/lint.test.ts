import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {afterEach, describe, expect, test} from 'vitest';

const repoRoot = path.resolve(import.meta.dirname, '..');
const wrecImportPath = path
  .join(repoRoot, 'src', 'wrec.ts')
  .replaceAll('\\', '\\\\');
const tmpDirs: string[] = [];

function runLint(source: string) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wrec-lint-test-'));
  tmpDirs.push(tmpDir);

  const fixturePath = path.join(tmpDir, 'lint-fixture.ts');
  fs.writeFileSync(fixturePath, source, 'utf8');

  return execFileSync('node', ['scripts/lint.js', fixturePath], {
    cwd: repoRoot,
    encoding: 'utf8'
  });
}

afterEach(() => {
  while (tmpDirs.length > 0) {
    const dir = tmpDirs.pop();
    if (dir) fs.rmSync(dir, {force: true, recursive: true});
  }
});

describe('lint.js', () => {
  test('reports duplicate and reserved property names', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          class: {type: String},
          name: {type: String},
          name: {type: Number}
        };
      }
    `);

    expect(output).toContain('duplicate properties:');
    expect(output).toContain('  name');
    expect(output).toContain('reserved property names:');
    expect(output).toContain('  class');
  });

  test('reports undefined properties and methods', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          count: {type: Number, value: 1}
        };

        static html = html\`
          <div>\${this.missingMethod()}</div>
          <div>this.missingProp</div>
        \`;
      }
    `);

    expect(output).toContain('undefined properties:');
    expect(output).toContain('  missingProp');
    expect(output).toContain('undefined methods:');
    expect(output).toContain('  missingMethod');
  });

  test('reports undefined context functions and incompatible arguments', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      function helper(count: number) {
        return count;
      }

      class Fixture extends Wrec {
        static context = {helper};

        static properties = {
          count: {type: Number, value: 1},
          label: {type: String, value: 'x'},
          missingContextValue: {type: Number, computed: 'missingContextFn(this.count)'},
          helperValue: {type: Number, computed: 'helper(this.label)'}
        };
      }
    `);

    expect(output).toContain('undefined context functions:');
    expect(output).toContain('  missingContextFn');
    expect(output).toContain('incompatible arguments:');
    expect(output).toContain(
      'helper: argument "this.label" has type string, but parameter "count" expects number'
    );
  });

  test('reports invalid event handler references', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static html = html\`<button onClick="missingHandler">Bad</button>\`;
      }
    `);

    expect(output).toContain('invalid event handler references:');
    expect(output).toContain('  "missingHandler" is not a defined instance method');
  });

  test('reports arithmetic type errors', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          count: {type: Number, value: 1},
          label: {type: String, value: 'x'}
        };

        static html = html\`<div>this.count * this.label</div>\`;
      }
    `);

    expect(output).toContain('type errors:');
    expect(output).toContain(
      'this.count * this.label: right operand "this.label" has type string, but arithmetic operators require number'
    );
  });
});
