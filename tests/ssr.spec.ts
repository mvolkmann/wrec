import {expect, test} from '@playwright/test';
import './dom-setup';

import HelloWorld from '../src/examples/hello-world.js';

const normalize = (str: string) =>
  str
    .split('\n')
    .map(line => line.trim())
    .join('\n');

test('ssr', async () => {
  const name = 'Earth';
  const actual = normalize(HelloWorld.ssr({name}));
  const expected = normalize(`
    <hello-world name="${name}">
      <template shadowrootmode="open">
        <style>
          :host([hidden]) { display: none; }
          p {
            color: purple;
          }
        </style>
        <p>Hello, <span>${name}</span>!</p> 
      </template>
    </hello-world>
  `);
  expect(actual).toBe(expected);
});
