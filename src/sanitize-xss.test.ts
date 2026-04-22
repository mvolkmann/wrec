import {expect, test} from 'vitest';
import sanitize from './sanitize-xss.js';

test('sanitize preserves comments alongside Wrec-style event handlers', () => {
  const value = sanitize(
    '<!-- this.count --><button onclick="increment" class="ok">Save</button>'
  );

  expect(value).toContain('<!-- this.count -->');
  expect(value).toContain('<button');
  expect(value).toContain('class="ok"');
  expect(value).toContain('onclick="increment"');
  expect(value).toContain('Save</button>');
});

test('sanitize strips browser inline event handlers', () => {
  const value = sanitize('<img src="photo.jpg" onerror="alert(1)">');

  expect(value).toContain('<img src="photo.jpg">');
  expect(value).not.toContain('onerror=');
});

test('sanitize preserves title, aria-*, and data-* attributes', () => {
  const value = sanitize(
    '<th aria-sort="ascending" data-property="name" title="sort by Name">Name</th>'
  );

  expect(value).toContain('aria-sort="ascending"');
  expect(value).toContain('data-property="name"');
  expect(value).toContain('title="sort by Name"');
});

test('sanitize preserves safe links and strips javascript href values', () => {
  const safe = sanitize('<a href="https://example.com">safe</a>');
  const unsafe = sanitize('<a href="javascript:alert(1)">unsafe</a>');

  expect(safe).toContain('<a href="https://example.com">safe</a>');
  expect(unsafe).toContain('<a>unsafe</a>');
  expect(unsafe).not.toContain('javascript:');
});

test('sanitize restores comments even when placeholder-like text is present', () => {
  const value = sanitize(
    '<div>__WREC0__</div><!-- this.name --><span class="ok">Hello</span>'
  );

  expect(value).toContain('<div>__WREC0__</div>');
  expect(value).toContain('<!-- this.name -->');
  expect(value).toContain('<span class="ok">Hello</span>');
});

test('sanitize strips ignored tag bodies and preserves allowed tags', () => {
  const value = sanitize(
    '<script>alert(1)</script>' +
      '<style>.danger{color:red;}</style>' +
      '<iframe src="https://example.com"></iframe>' +
      '<label class="field" for="name">Name</label>' +
      '<input value="x" />'
  );

  expect(value).not.toContain('alert(1)');
  expect(value).not.toContain('.danger');
  expect(value).not.toContain('<iframe');
  expect(value).toContain('<label class="field" for="name">Name</label>');
  expect(value).toContain('<input');
});
