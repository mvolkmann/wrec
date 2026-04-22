import {beforeAll, expect, test, vi} from 'vitest';

type WrecSsrModule = typeof import('./wrec-ssr.js');
let html: WrecSsrModule['html'];
let Wrec: WrecSsrModule['Wrec'];

beforeAll(async () => {
  vi.resetModules();
  ({html, Wrec} = await import('./wrec-ssr.js'));
});

test('renders evaluated attribute and text expressions in SSR output', () => {
  class HelloSsrFixture extends Wrec {
    static properties = {
      name: {type: String, value: 'World'},
      title: {type: String, value: 'Greeting'}
    };

    static html = html`
      <p title="this.title">
        <span>this.name.toUpperCase()</span>
      </p>
    `;

    declare name: string;
    declare title: string;
  }

  HelloSsrFixture.define('hello-ssr-fixture');

  const output = HelloSsrFixture.ssr({name: 'Mark', title: 'Welcome'});

  expect(output).toContain('<hello-ssr-fixture name="Mark" title="Welcome">');
  expect(output).toContain('<p title="Welcome">');
  expect(output).toContain('<span>MARK</span>');
});

test('uses default property values when SSR input omits them', () => {
  class DefaultSsrFixture extends Wrec {
    static properties = {
      name: {type: String, value: 'World'},
      title: {type: String, value: 'Greeting'}
    };

    static html = html`
      <p title="this.title">
        <span>this.name</span>
      </p>
    `;

    declare name: string;
    declare title: string;
  }

  DefaultSsrFixture.define('default-ssr-fixture');

  const output = DefaultSsrFixture.ssr();

  expect(output).toContain('<p title="Greeting">');
  expect(output).toContain('<span>World</span>');
  expect(output).toContain('<default-ssr-fixture>');
});
