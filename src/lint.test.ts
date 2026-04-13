import {spawnSync} from 'node:child_process';
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
  test('does not report incompatible arguments for rest-parameter methods like console.log', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          moving: {type: Boolean, value: true}
        };

        static html = html\`<button onClick="console.log('moving =', this.moving)">Log</button>\`;
      }
    `);

    expect(output).not.toContain('incompatible arguments:');
  });

  test('does not report invalid html nesting for valid table structure', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static html = html\`
          <table>
            <thead>
              <tr><th>name</th></tr>
            </thead>
            <tbody>
              <tr><td>Mark</td></tr>
            </tbody>
          </table>
        \`;
      }
    `);

    expect(output).not.toContain('invalid html nesting:');
  });

  test('errors on unknown command-line options', () => {
    const result = spawnSync(process.execPath, ['scripts/lint.js', '--bogus'], {
      cwd: repoRoot,
      encoding: 'utf8'
    });

    expect(result.status).toBe(1);
    expect(result.stdout).toBe('');
    expect(result.stderr).toContain('unknown option: --bogus');
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

  test('reports duplicate ref attributes that target the same property', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          inputRef: {type: HTMLElement}
        };

        static html = html\`
          <input ref="inputRef" />
          <textarea ref="inputRef"></textarea>
        \`;
      }
    `);

    expect(output).toContain('invalid ref attributes:');
    expect(output).toContain(
      '  ref="inputRef" is a duplicate reference to the property "inputRef"'
    );
  });

  test('reports form-assoc mappings to missing component properties', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static html = html\`<child-widget form-assoc="missing:value"></child-widget>\`;
      }

      class ChildWidget extends Wrec {
        static formAssociated = true;

        static properties = {
          value: {type: String, value: 'x'}
        };
      }

      ChildWidget.define('child-widget');
    `);

    expect(output).toContain('invalid form-assoc values:');
    expect(output).toContain(
      '  form-assoc="missing:value" refers to missing component property "missing"'
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

  test('reports invalid event handler references', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static html = html\`<button onClick="missingHandler">Bad</button>\`;
      }
    `);

    expect(output).toContain('invalid event handler references:');
    expect(output).toContain(
      '  "missingHandler" is not a defined instance method'
    );
  });

  test('reports invalid form-assoc values', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          value: {type: String, value: 'x'}
        };

        static html = html\`<child-widget form-assoc="value"></child-widget>\`;
      }
    `);

    expect(output).toContain('invalid form-assoc values:');
    expect(output).toContain(
      '  form-assoc="value" is invalid; expected "property:field" or a comma-separated list of them'
    );
  });

  test('reports invalid html nesting', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static html = html\`<table><tr><div>bad</div></tr></table>\`;
      }
    `);

    expect(output).toContain('invalid html nesting:');
    expect(output).toContain('  <div> is not allowed directly inside <tr>');
  });

  test('reports invalid ref attributes', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          inputRef: {type: String, value: 'bad'}
        };

        static html = html\`<input ref="inputRef" />\`;
      }
    `);

    expect(output).toContain('invalid ref attributes:');
    expect(output).toContain(
      '  ref="inputRef" refers to property "inputRef" whose type is not HTMLElement'
    );
    expect(output).not.toContain('unsupported html attributes:');
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
    expect(output).toContain(
      'property "wrongDefaultType" default value has type'
    );
    expect(output).toContain('but declared type is number');
    expect(output).toContain(
      '  property "wrongDefaultValue" default value "large" is not in values'
    );
  });

  test('reports missing formAssociated property when formAssociatedCallback is defined', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        formAssociatedCallback() {}
      }
    `);

    expect(output).toContain('missing formAssociated property:');
    expect(output).toContain(
      '  formAssociatedCallback is defined, but static formAssociated is not true'
    );
  });

  test('reports missing type properties in property configurations', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          count: {value: 1}
        };
      }
    `);

    expect(output).toContain('missing type properties:');
    expect(output).toContain('  property "count" does not specify a type');
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

  test('reports missing component properties referenced inside instance methods', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          count: {type: Number, value: 1}
        };

        increment() {
          this.count += 1;
          this.missingProp += 1;
        }
      }
    `);

    expect(output).toContain('undefined properties:');
    expect(output).toContain('  missingProp');
  });

  test('does not treat normal helper calls inside methods as missing context functions', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      function helper(count: number) {
        return count + 1;
      }

      class Fixture extends Wrec {
        static properties = {
          count: {type: Number, value: 1}
        };

        increment() {
          this.count = helper(this.count);
        }
      }
    `);

    expect(output).toContain('no issues found');
    expect(output).not.toContain('undefined context functions:');
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

  test('reports unsupported event names in value bindings', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          count: {type: Number, value: 1}
        };

        static html = html\`<input value:monkey="this.count" />\`;
      }
    `);

    expect(output).toContain('unsupported event names:');
    expect(output).toContain(
      '  input attribute "value:monkey" refers to an unsupported event name "monkey"'
    );
  });

  test('reports unsupported html attributes', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static html = html\`<div bogus="x"></div>\`;
      }
    `);

    expect(output).toContain('unsupported html attributes:');
    expect(output).toContain('  div attribute "bogus" is not supported');
  });

  test('reports useState maps to missing component properties', () => {
    const output = runLint(`
      import {Wrec, WrecState} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          count: {type: Number, value: 1}
        };

        connectState() {
          const state = new WrecState({total: 1});
          this.useState(state, {total: 'missingProp'});
        }
      }
    `);

    expect(output).toContain('invalid useState map entries:');
    expect(output).toContain(
      '  useState maps state property "total" to missing component property "missingProp"'
    );
  });

  test('supports aliased Wrec imports', () => {
    const output = runLint(`
      import {html, Wrec as BaseWrec} from '${wrecImportPath}';

      class Fixture extends BaseWrec {
        static properties = {
          count: {type: Number, value: 1}
        };

        static html = html\`<div>\${this.missingMethod()}</div>\`;
      }
    `);

    expect(output).toContain('undefined methods:');
    expect(output).toContain('  missingMethod');
  });
});
