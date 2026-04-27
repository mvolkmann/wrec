import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {afterEach, describe, expect, test} from 'vitest';
import {evaluateSourceFile, evaluateSourceText} from '../scripts/declare.js';

const tempPaths: string[] = [];

afterEach(() => {
  for (const filePath of tempPaths.splice(0)) {
    fs.rmSync(filePath, {force: true});
  }
});

describe('declare.js', () => {
  test('adds declare statements after static properties', () => {
    const result = evaluateSourceText(
      '/virtual/component.ts',
      `
        import {css, html, Wrec} from 'wrec';

        class Fixture extends Wrec {
          static properties = {
            enabled: {type: Boolean},
            label: {type: String},
            count: {type: Number}
          };

          static css = css\`\`;
          static html = html\`\`;
        }
      `
    );

    expect(result.foundWrecSubclass).toBe(true);
    expect(result.changed).toBe(true);
    expect(result.text).toContain('declare count: number;');
    expect(result.text).toContain('declare enabled: boolean;');
    expect(result.text).toContain('declare label: string;');
    expect(result.text).toContain(
      `          };
          declare count: number;
          declare enabled: boolean;
          declare label: string;

          static css = css\`\`;`
    );
  });

  test('maps array and object property types and skips properties without type', () => {
    const result = evaluateSourceText(
      '/virtual/component.ts',
      `
        import {Wrec} from 'wrec';

        class Fixture extends Wrec {
          static properties = {
            items: {type: Array},
            metadata: {type: Object},
            pending: {}
          };
        }
      `
    );

    expect(result.text).toContain('declare items: unknown[];');
    expect(result.text).toContain('declare metadata: object;');
    expect(result.text).not.toContain('declare pending:');
  });

  test('replaces an existing contiguous declare block', () => {
    const result = evaluateSourceText(
      '/virtual/component.ts',
      `
        import {Wrec} from 'wrec';

        class Fixture extends Wrec {
          static properties = {
            height: {type: Number},
            width: {type: Number}
          };
          declare width: string;
          declare stale: boolean;

          static css = '';
        }
      `
    );

    expect(result.text).toContain(
      `          };
          declare height: number;
          declare width: number;

          static css = '';`
    );
    expect(result.text).not.toContain('declare stale: boolean;');
    expect(result.text).not.toContain('declare width: string;');
  });

  test('supports file-based updates', () => {
    const filePath = path.join(
      os.tmpdir(),
      `wrec-declare-${Math.random().toString(36).slice(2)}.ts`
    );
    tempPaths.push(filePath);

    fs.writeFileSync(
      filePath,
      `
        import {Wrec} from 'wrec';

        class Fixture extends Wrec {
          static properties = {
            total: {type: Number}
          };
        }
      `
    );

    const result = evaluateSourceFile(filePath);
    const nextText = fs.readFileSync(filePath, 'utf8');

    expect(result.changed).toBe(true);
    expect(nextText).toContain('declare total: number;');
  });

  test('errors on unknown command-line options', () => {
    const result = spawnSync(
      process.execPath,
      ['scripts/declare.js', '--bogus'],
      {
        cwd: path.resolve(import.meta.dirname, '..'),
        encoding: 'utf8'
      }
    );

    expect(result.status).toBe(1);
    expect(result.stdout).toBe('');
    expect(result.stderr).toContain('unknown option: --bogus');
  });

  test('reports when no Wrec subclass is found', () => {
    expect(() =>
      evaluateSourceFile(path.resolve(import.meta.dirname, 'declare.test.ts'))
    ).toThrow('No class extending Wrec was found.');
  });
});
