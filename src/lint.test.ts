import os from 'node:os';
import path from 'node:path';
import {describe, expect, test} from 'vitest';
import {lintSource} from '../scripts/lint.js';

const repoRoot = path.resolve(import.meta.dirname, '..');
const wrecImportPath = path
  .join(repoRoot, 'src', 'wrec.ts')
  .replaceAll('\\', '\\\\');

function runLint(source: string) {
  const fixturePath = path.join(
    os.tmpdir(),
    `wrec-lint-test-${Math.random().toString(36).slice(2)}.ts`
  );
  return lintSource(fixturePath, source);
}

describe('lint.js', () => {
  test('reports no issues found for a valid component', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          count: {type: Number, value: 1},
          label: {type: String, value: 'ok'}
        };

        static html = html\`
          <div>\${42}</div>
          <div>this.label</div>
        \`;
      }
    `);

    expect(output).toContain('no issues found');
    expect(output).not.toContain('undefined properties:');
    expect(output).not.toContain('undefined methods:');
    expect(output).not.toContain('incompatible arguments:');
    expect(output).not.toContain('type errors:');
  });

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

  test('reports invalid single-string usedBy references', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          count: {type: Number, usedBy: 'missingMethod'}
        };
      }
    `);

    expect(output).toContain('invalid usedBy references:');
    expect(output).toContain(
      '  property "count" usedBy references missing method "missingMethod"'
    );
  });

  test('reports invalid array usedBy references and ignores valid ones', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        updateCount() {}
        renderCount() {}

        static properties = {
          goodSingle: {type: Number, usedBy: 'updateCount'},
          goodArray: {type: Number, usedBy: ['updateCount', 'renderCount']},
          badArray: {type: Number, usedBy: ['updateCount', 'missingMethod']}
        };
      }
    `);

    expect(output).toContain('invalid usedBy references:');
    expect(output).toContain(
      '  property "badArray" usedBy references missing method "missingMethod"'
    );
    expect(output).not.toContain(
      'property "goodSingle" usedBy references missing method'
    );
    expect(output).not.toContain(
      'property "goodArray" usedBy references missing method'
    );
  });

  test('reports invalid computed property references and non-method calls', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          count: {type: Number, value: 1},
          label: {type: String, value: 'x'},
          badRef: {type: Number, computed: 'this.missingProp + 1'},
          badCall: {type: Number, computed: 'this.label()'}
        };
      }
    `);

    expect(output).toContain('invalid computed properties:');
    expect(output).toContain(
      '  property "badRef" computed references missing property "missingProp"'
    );
    expect(output).toContain(
      '  property "badCall" computed calls non-method instance member "label"'
    );
  });

  test('reports invalid values configurations and invalid defaults', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          wrongValuesType: {
            type: Number,
            values: ['1', '2']
          },
          wrongDefaultType: {
            type: Number,
            value: 'x'
          },
          wrongDefaultValue: {
            type: String,
            values: ['small', 'medium'],
            value: 'large'
          }
        };
      }
    `);

    expect(output).toContain('invalid values configurations:');
    expect(output).toContain(
      '  property "wrongValuesType" uses values, but its type is not String'
    );

    expect(output).toContain('invalid default values:');
    expect(output).toContain('property "wrongDefaultType" default value has type');
    expect(output).toContain('but declared type is number');
    expect(output).toContain(
      '  property "wrongDefaultValue" default value "large" is not in values'
    );
  });

  test('reports default-value mismatches for boolean, array, and object properties', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          badBoolean: {
            type: Boolean,
            value: 'true'
          },
          badArray: {
            type: Array,
            value: 7
          },
          badObject: {
            type: Object,
            value: 'oops'
          }
        };
      }
    `);

    expect(output).toContain('invalid default values:');
    expect(output).toContain('property "badBoolean" default value has type');
    expect(output).toContain('but declared type is boolean');
    expect(output).toContain('property "badArray" default value has type');
    expect(output).toContain('but declared type is array');
    expect(output).toContain('property "badObject" default value has type');
    expect(output).toContain('but declared type is object');
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

  test('reports arithmetic type errors for invalid left operands', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          count: {type: Number, value: 1},
          label: {type: String, value: 'x'}
        };

        static html = html\`<div>this.label * this.count</div>\`;
      }
    `);

    expect(output).toContain('type errors:');
    expect(output).toContain(
      'this.label * this.count: left operand "this.label" has type string, but arithmetic operators require number'
    );
  });

  test('reports multiple undefined methods in one section without numbering', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static html = html\`
          <div>\${this.firstMissing()}</div>
          <div>\${this.secondMissing()}</div>
        \`;
      }
    `);

    expect(output).toContain('undefined methods:');
    expect(output).toContain('  firstMissing');
    expect(output).toContain('  secondMissing');
    expect(output).not.toContain('1. firstMissing');
    expect(output).not.toContain('2. secondMissing');
  });
});
