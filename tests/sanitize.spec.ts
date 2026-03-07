import {expect, test} from '@playwright/test';
import sanitize from '../src/sanitize-xss.js';

test('allows safe basic HTML', () => {
  const input = '<p>Hello <strong>world</strong></p>';
  expect(sanitize(input)).toBe('<p>Hello <strong>world</strong></p>');
});

test('removes script tags', () => {
  const input = '<p>Hello, <script>alert("XSS")</script>World!</p>';
  const output = sanitize(input);
  expect(output).not.toContain('<script>');
  expect(output).toContain('<p>Hello, World!</p>');
});

test('removes event handler attributes', () => {
  const input = '<img src="photo.jpg" onerror="alert(1)">';
  const output = sanitize(input);
  expect(output).toContain('<img src="photo.jpg">');
  expect(output).not.toContain('onerror');
});

test('removes javascript: URLs', () => {
  const input = '<a href="javascript:alert(1)">Click</a>';
  const output = sanitize(input);
  expect(output).not.toContain('javascript:');
});

test('keeps allowed attributes', () => {
  const input = '<a href="https://example.com">Link</a>';
  expect(sanitize(input)).toBe('<a href="https://example.com">Link</a>');
});

test('removes disallowed tags but keeps content', () => {
  const input = "<div>Hello <iframe src='evil'></iframe> world</div>";
  const output = sanitize(input);
  expect(output).not.toContain('<iframe');
  expect(output).toContain('Hello');
  expect(output).toContain('world');
});

test('handles nested tags correctly', () => {
  const input = '<div><p><span>Text</span></p></div>';
  expect(sanitize(input)).toBe('<div><p><span>Text</span></p></div>');
});

test('escapes stray angle brackets', () => {
  const input = '1 < 2 and 3 > 2';
  const output = sanitize(input);
  expect(output).toContain('&lt;');
  expect(output).toContain('&gt;');
});

test('preserves HTML comments if configured', () => {
  const input = '<p>Hello<!-- first -->, World!<!-- second --></p>';
  const output = sanitize(input);
  expect(output).toContain('<!-- first -->');
  expect(output).toContain('<!-- second -->');
});

test('handles empty input', () => {
  expect(sanitize('')).toBe('');
});

test('handles null-like content safely', () => {
  const input = '<script></script>';
  const output = sanitize(input);
  expect(output).not.toContain('script');
});
