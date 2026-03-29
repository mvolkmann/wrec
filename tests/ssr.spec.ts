import {expect, test} from '@playwright/test';
import './dom-setup';

import HelloSsr from '../src/examples/hello-ssr.js';

const normalize = (str: string) =>
  str
    .split('\n')
    .map(line => line.trim())
    .join('\n');

test('ssr 1', async () => {
  const name = 'Earth';
  const actual = normalize(HelloSsr.ssr({name}));
  const expected = normalize(`
    <hello-world name="${name}">
      <template shadowrootmode="open">
        <style>
          :host([hidden]) { display: none; }
          p {
            --color: this.color;
            color: var(--color);
          }
        </style>
        <p>Hello, <span>${name}</span>!</p> 
      </template>
    </hello-world>
  `);
  expect(actual).toBe(expected);
});

test('ssr 2', async () => {
  const color = 'red';
  const name = 'Moon';
  const title = 'My Title';
  const actual = normalize(HelloSsr.ssr({color, name, title}));
  const expected = normalize(`
    <hello-world color="${color}" name="${name}" title="${title}">
      <template shadowrootmode="open">
        <style>
          :host([hidden]) { display: none; }
          p {
            --color: this.color;
            color: var(--color);
          }
        </style>
        <p title="${title}">Hello, <span>${name}</span>!</p> 
      </template>
    </hello-world>
  `);
  expect(actual).toBe(expected);
});
