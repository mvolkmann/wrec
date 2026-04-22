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

test('escapes outer and evaluated attribute values in SSR output', () => {
  class EscapingSsrFixture extends Wrec {
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

  EscapingSsrFixture.define('escaping-ssr-fixture');

  const output = EscapingSsrFixture.ssr({
    name: 'Mark & Co <team>',
    title: 'Say "hi" <now> & later'
  });

  expect(output).toContain(
    '<escaping-ssr-fixture name="Mark &amp; Co &lt;team&gt;" title="Say &quot;hi&quot; &lt;now&gt; &amp; later">'
  );
  expect(output).toContain(
    '<p title="Say &quot;hi&quot; &lt;now&gt; &amp; later">'
  );
});

test('preserves raw HTML emitted by SSR text expressions', () => {
  class RawHtmlSsrFixture extends Wrec {
    static properties = {
      content: {type: String, value: '<strong>bold</strong>'}
    };

    static html = html`<div class="content">this.content</div>`;

    declare content: string;
  }

  RawHtmlSsrFixture.define('raw-html-ssr-fixture');

  const output = RawHtmlSsrFixture.ssr({
    content: '<strong>bold</strong><em>more</em>'
  });

  expect(output).toContain(
    '<div class="content"><strong>bold</strong><em>more</em></div>'
  );
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

test('evaluates computed properties in SSR output', () => {
  class ComputedSsrFixture extends Wrec {
    static properties = {
      area: {type: Number, computed: 'this.width * this.height'},
      height: {type: Number, value: 4},
      width: {type: Number, value: 3}
    };

    static html = html`<p>this.area</p>`;

    declare area: number;
    declare height: number;
    declare width: number;
  }

  ComputedSsrFixture.define('computed-ssr-fixture');

  const output = ComputedSsrFixture.ssr({height: 6, width: 5});

  expect(output).toContain('<p>30</p>');
});

test('evaluates static context helpers in SSR output', () => {
  const greet = (name: string) => `Hello, ${name}!`;

  class ContextSsrFixture extends Wrec {
    static context = {greet};

    static properties = {
      name: {type: String, value: 'World'}
    };

    static html = html`<p>greet(this.name)</p>`;

    declare name: string;
  }

  ContextSsrFixture.define('context-ssr-fixture');

  const output = ContextSsrFixture.ssr({name: 'Mark'});

  expect(output).toContain('<p>Hello, Mark!</p>');
});
