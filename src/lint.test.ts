import {spawnSync} from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import {describe, expect, test} from 'vitest';
import {lintSource} from '../scripts/lint.js';

const repoRoot = path.resolve(import.meta.dirname, '..');
const wrecImportPath = path
  .join(repoRoot, 'src', 'wrec.ts')
  .replaceAll('\\', '\\\\');

// Runs the linter against inline source text.
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

  test('reports css-based undefined properties with line numbers', () => {
    const output = runLint(`
      import {css, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static css = css\`
          div {
            color: this.missingColor;
          }
        \`;

        static html = '';
      }
    `);

    expect(output).toContain('undefined properties:');
    expect(output).toMatch(/  :\d+:\d+ missingColor/);
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
    expect(output).toMatch(
      /  :\d+:\d+ this.count \* this.label: right operand "this.label" has type string, but arithmetic operators require number/
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
    expect(output).toContain('but declared type is Boolean');
    expect(output).toContain('property "badArray" default value has type');
    expect(output).toContain('but declared type is Array');
    expect(output).toContain('property "badObject" default value has type');
    expect(output).toContain('but declared type is Object');
  });

  test('reports invalid type constructors in static properties', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          badElement: {type: HTMLElement},
          badDate: {type: Date},
          goodArray: {type: Array},
          goodBoolean: {type: Boolean},
          goodNumber: {type: Number},
          goodObject: {type: Object},
          goodString: {type: String}
        };
      }
    `);

    expect(output).toContain('invalid type properties:');
    expect(output).toContain(
      'property "badDate" type must be one of Boolean, Number, String, Object, Array, or HTMLElement'
    );
    expect(output).not.toContain('property "badElement" type must be one of');
    expect(output).not.toContain('property "goodArray" type must be one of');
    expect(output).not.toContain('property "goodBoolean" type must be one of');
    expect(output).not.toContain('property "goodNumber" type must be one of');
    expect(output).not.toContain('property "goodObject" type must be one of');
    expect(output).not.toContain('property "goodString" type must be one of');
  });

  test('reports generic type syntax in static properties', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          items: {type: Array<string>}
        };
      }
    `);

    expect(output).toContain('invalid type properties:');
    expect(output).toMatch(
      /  :\d+:\d+ property "items" type cannot use generic syntax like "Array<string>"; use "Array" instead/
    );
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
    expect(output).toMatch(
      /  :\d+:\d+ "name" first declared at :\d+:\d+, duplicated at :\d+:\d+/
    );
    expect(output).toContain('reserved property names:');
    expect(output).toMatch(/  :\d+:\d+ class/);
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
    expect(output).toMatch(
      /  :\d+:\d+ ref="inputRef" is a duplicate reference to the property "inputRef"/
    );
  });

  test('reports invalid checked bindings for checkbox and radio inputs', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          checkedFlag: {type: String, value: 'nope'},
          selectedValue: {type: Boolean, value: false}
        };

        static html = html\`
          <input type="checkbox" checked="this.checkedFlag" />
          <input type="radio" value="small" checked="this.selectedValue" />
        \`;
      }
    `);

    expect(output).toContain('invalid checked bindings:');
    expect(output).toMatch(
      /  :\d+:\d+ input type="checkbox" attribute "checked" refers to property "checkedFlag" whose type is not Boolean/
    );
    expect(output).toMatch(
      /  :\d+:\d+ input type="radio" attribute "checked" refers to property "selectedValue" whose type is not String/
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
    expect(output).toMatch(
      /  :\d+:\d+ form-assoc="missing:value" refers to missing component property "missing"/
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
    expect(output).toMatch(
      /  :\d+:\d+ property "badArray" usedBy references missing method "missingMethod"/
    );
    expect(output).not.toContain(
      'property "goodSingle" usedBy references missing method'
    );
    expect(output).not.toContain(
      'property "goodArray" usedBy references missing method'
    );
  });

  test('accepts getter references in usedBy values', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        get summary() {
          return 'ok';
        }

        static properties = {
          goodGetter: {type: String, usedBy: 'get summary'},
          badGetter: {type: String, usedBy: 'get missingSummary'}
        };
      }
    `);
    expect(output).toContain('invalid usedBy references:');
    expect(output).toMatch(
      /  :\d+:\d+ property "badGetter" usedBy references missing getter "missingSummary"/
    );
    expect(output).not.toContain(
      'property "goodGetter" usedBy references missing'
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
    expect(output).toMatch(
      /  :\d+:\d+ property "badRef" computed references missing property "missingProp"/
    );
    expect(output).toMatch(
      /  :\d+:\d+ property "badCall" computed calls non-method instance member "label"/
    );
  });

  test('reports computed property cycles', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          base: {type: Number, value: 1},
          first: {type: Number, computed: 'this.base + this.second'},
          second: {type: Number, computed: 'this.first + 1'}
        };
      }
    `);

    expect(output).toContain('invalid computed properties:');
    expect(output).toMatch(
      /  :\d+:\d+ computed properties form a cycle: first, second/
    );
  });

  test('reports self-referential computed property cycles', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          count: {type: Number, value: 1},
          doubled: {type: Number, computed: 'this.doubled + this.count'}
        };
      }
    `);

    expect(output).toContain('invalid computed properties:');
    expect(output).toMatch(/  :\d+:\d+ computed properties form a cycle: doubled/);
  });

  test('reports invalid event handler references', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static html = html\`<button onClick="missingHandler">Bad</button>\`;
      }
    `);

    expect(output).toContain('invalid event handler references:');
    expect(output).toMatch(
      /  :\d+:\d+ "missingHandler" is not a defined instance method/
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
    expect(output).toMatch(
      /  :\d+:\d+ form-assoc="value" is invalid; expected "property:field" or a comma-separated list of them/
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
    expect(output).toMatch(/  :\d+:\d+ <div> is not allowed directly inside <tr>/);
  });

  test('reports declare statements with incompatible property types', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          count: {type: Number, value: 1},
          label: {type: String, value: 'ok'}
        };

        declare count: string;
        declare label: unknown;
      }
    `);

    expect(output).toContain('incompatible declare types:');
    expect(output).toMatch(
      /  :\d+:\d+ property "count" declare type "string" is not compatible with static properties type "Number"/
    );
    expect(output).not.toContain(
      'property "label" declare type "unknown" is not compatible'
    );
  });

  test('treats primitive declare types as compatible with boxed property config types', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          enabled: {type: Boolean, value: true},
          label: {type: String, value: 'ok'},
          total: {type: Number, value: 1}
        };

        declare enabled: boolean;
        declare label: string;
        declare total: number;
      }
    `);

    expect(output).not.toContain('incompatible declare types:');
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
    expect(output).toMatch(
      /  :\d+:\d+ ref="inputRef" refers to property "inputRef" whose type is not HTMLElement/
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
    expect(output).toMatch(
      /  :\d+:\d+ property "count" usedBy references missing method "missingMethod"/
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
    expect(output).toMatch(
      /  :\d+:\d+ property "wrongValuesType" uses values, but its type is not String/
    );

    expect(output).toContain('invalid default values:');
    expect(output).toContain(
      'property "wrongDefaultType" default value has type'
    );
    expect(output).toContain('but declared type is Number');
    expect(output).toMatch(
      /  :\d+:\d+ property "wrongDefaultValue" default value "large" is not in values/
    );
  });

  test('reports malformed values configurations', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      const choices = ['small', 'medium'];

      class Fixture extends Wrec {
        static properties = {
          duplicateValues: {
            type: String,
            values: ['small', 'small']
          },
          dynamicValues: {
            type: String,
            values: choices
          },
          emptyValues: {
            type: String,
            values: []
          },
          nonStringValues: {
            type: String,
            values: ['small', 7]
          }
        };
      }
    `);

    expect(output).toContain('invalid values configurations:');
    expect(output).toMatch(
      /  :\d+:\d+ property "duplicateValues" values contains duplicate entry "small"/
    );
    expect(output).toMatch(
      /  :\d+:\d+ property "dynamicValues" values must be a literal array of strings/
    );
    expect(output).toMatch(
      /  :\d+:\d+ property "emptyValues" values must not be empty/
    );
    expect(output).toMatch(
      /  :\d+:\d+ property "nonStringValues" values must contain only string literals/
    );
  });

  test('reports missing formAssociated property when formAssociatedCallback is defined', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        formAssociatedCallback() {}
      }
    `);

    expect(output).toContain('missing required members:');
    expect(output).toMatch(
      /  :\d+:\d+ formAssociatedCallback is defined, but static formAssociated is not true/
    );
  });

  test('reports missing static html property', () => {
    const output = runLint(`
      import {Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {}
    `);

    expect(output).toContain('missing required members:');
    expect(output).toMatch(/  :\d+:\d+ static html property must be defined/);
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
    expect(output).toMatch(
      /  :\d+:\d+ property "count" does not specify a type/
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
    expect(output).toMatch(/  :\d+:\d+ firstMissing/);
    expect(output).toMatch(/  :\d+:\d+ secondMissing/);
    expect(output).not.toContain('1. firstMissing');
    expect(output).not.toContain('2. secondMissing');
  });

  test('reports no issues found for a valid component', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          checkedFlag: {type: Boolean, value: true},
          choice: {type: String, value: 'small'},
          count: {type: Number, value: 1},
          label: {type: String, value: 'ok'}
        };

        static html = html\`
          <input type="checkbox" checked="this.checkedFlag" />
          <input type="radio" value="small" checked="this.choice" />
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
    expect(output).toMatch(/  :\d+:\d+ missingContextFn/);
    expect(output).toContain('incompatible arguments:');
    expect(output).toMatch(
      /  :\d+:\d+ helper: argument "this.label" has type string, but parameter "count" expects number/
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
    expect(output).toMatch(/  :\d+:\d+ missingProp/);
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

        static html = '';

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
    expect(output).toMatch(/  :\d+:\d+ missingProp/);
    expect(output).toContain('undefined methods:');
    expect(output).toMatch(/  :\d+:\d+ missingMethod/);
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
    expect(output).toMatch(
      /  :\d+:\d+ input attribute "value:monkey" refers to an unsupported event name "monkey"/
    );
  });

  test('reports invalid value bindings for native form controls', () => {
    const output = runLint(`
      import {html, Wrec} from '${wrecImportPath}';

      class Fixture extends Wrec {
        static properties = {
          data: {type: Object, value: {name: 'x'}},
          enabled: {type: Boolean, value: true}
        };

        static html = html\`
          <input value:input="this.enabled" />
          <select value="this.data">
            <option value="a">A</option>
          </select>
        \`;
      }
    `);

    expect(output).toContain('invalid value bindings:');
    expect(output).toMatch(
      /  :\d+:\d+ input attribute "value:input" refers to property "enabled" whose type is not String or Number/
    );
    expect(output).toMatch(
      /  :\d+:\d+ select attribute "value" refers to property "data" whose type is not String or Number/
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
    expect(output).toMatch(/  :\d+:\d+ div attribute "bogus" is not supported/);
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
    expect(output).toMatch(
      /  :\d+:\d+ useState maps state property "total" to missing component property "missingProp"/
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
    expect(output).toMatch(/  :\d+:\d+ missingMethod/);
  });
});
