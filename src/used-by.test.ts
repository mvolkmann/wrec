import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {afterEach, describe, expect, test} from 'vitest';
import {evaluateSourceFile, evaluateSourceText} from '../scripts/used-by.js';

const tempPaths: string[] = [];

afterEach(() => {
  for (const filePath of tempPaths.splice(0)) {
    fs.rmSync(filePath, {force: true});
  }
});

function createTempComponent(source: string) {
  const filePath = path.join(
    os.tmpdir(),
    `wrec-used-by-${Math.random().toString(36).slice(2)}.js`
  );
  fs.writeFileSync(filePath, source);
  tempPaths.push(filePath);
  return filePath;
}

describe('used-by.js', () => {
  test('infers usedBy values from template and computed entry methods', () => {
    const source = `
      import {html, Wrec} from "wrec";

      class Fixture extends Wrec {
        static properties = {
          count: {type: Number},
          label: {type: String},
          summary: {type: String, computed: "this.getSummary()"},
          stale: {type: String, usedBy: "oldMethod"}
        };

        static html = html\`
          <div>\${this.renderCount()}</div>
          <div>\${this.label}</div>
        \`;

        formatCount() {
          return this.count.toString();
        }

        getSummary() {
          return this.count + this.label;
        }

        renderCount() {
          return this.formatCount();
        }
      }
    `;

    const result = evaluateSourceText('/virtual/component.js', source);

    expect(result.foundWrecSubclass).toBe(true);
    expect(result.changed).toBe(true);
    expect(result.text).toContain(
      'count: {type: Number, usedBy: ["getSummary", "renderCount"]}'
    );
    expect(result.text).toContain(
      'label: {type: String, usedBy: "getSummary"}'
    );
    expect(result.text).toContain(
      'summary: {type: String, computed: "this.getSummary()"}'
    );
    expect(result.text).toContain('stale: {type: String}');
  });

  test('reports all inferred dry-run suggestions without writing the file', () => {
    const filePath = createTempComponent(`
      import {html, Wrec} from 'wrec';

      class Fixture extends Wrec {
        static properties = {
          count: {type: Number},
          stale: {type: String, usedBy: 'oldMethod'}
        };

        static html = html\`<div>\${this.renderCount()}</div>\`;

        renderCount() {
          return this.count;
        }
      }
    `);

    const before = fs.readFileSync(filePath, 'utf8');
    const result = evaluateSourceFile(filePath, {dry: true});
    const after = fs.readFileSync(filePath, 'utf8');

    expect(result.changed).toBe(true);
    expect(result.suggestions).toEqual([
      {propName: 'count', suggestion: "usedBy: 'renderCount'"},
      {propName: 'stale', suggestion: 'remove usedBy'}
    ]);
    expect(after).toBe(before);
  });

  test('dry run reports inferred usage for properties that are already up to date', () => {
    const filePath = createTempComponent(`
      import {html, Wrec} from 'wrec';

      class Fixture extends Wrec {
        static properties = {
          labels: {type: Array, usedBy: ['makeList', 'makeRows']},
          rows: {type: Array, computed: 'this.makeRows()', usedBy: 'renderRows'}
        };

        static html = html\`
          <div>\${this.makeList()}</div>
          <div>\${this.renderRows()}</div>
        \`;

        makeList() {
          return this.labels.join(', ');
        }

        makeRows() {
          return this.labels.map(label => label.toUpperCase());
        }

        renderRows() {
          return this.rows.join(', ');
        }
      }
    `);

    const result = evaluateSourceFile(filePath, {dry: true});

    expect(result.changed).toBe(false);
    expect(result.suggestions).toEqual([
      {propName: 'labels', suggestion: "usedBy: ['makeList', 'makeRows']"},
      {propName: 'rows', suggestion: "usedBy: 'renderRows'"}
    ]);
  });

  test('writes inferred usedBy values back to the file', () => {
    const filePath = createTempComponent(`
      import {html, Wrec} from 'wrec';

      class Fixture extends Wrec {
        static properties = {
          count: {type: Number}
        };

        static html = html\`<div>\${this.renderCount()}</div>\`;

        renderCount() {
          return this.count;
        }
      }
    `);

    const result = evaluateSourceFile(filePath);
    const updated = fs.readFileSync(filePath, 'utf8');

    expect(result.changed).toBe(true);
    expect(updated).toContain("count: {type: Number, usedBy: 'renderCount'}");
  });

  test('throws when the source file does not define a Wrec subclass', () => {
    expect(() =>
      evaluateSourceText(
        '/virtual/not-a-component.js',
        'export const value = 1;'
      )
    ).not.toThrow();

    const result = evaluateSourceText(
      '/virtual/not-a-component.js',
      'export const value = 1;'
    );
    expect(result.foundWrecSubclass).toBe(false);

    const filePath = createTempComponent('export const value = 1;');
    expect(() => evaluateSourceFile(filePath)).toThrow(
      'No class extending Wrec was found.'
    );
  });
});
