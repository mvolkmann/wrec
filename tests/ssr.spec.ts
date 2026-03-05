import {expect, test} from '@playwright/test';
import './dom-setup';

import HelloWorld from '../src/examples/hello-world.js';

test('ssr', async () => {
  const name = 'Earth';
  const actual = HelloWorld.ssr({name});
  // Indentation matters here!
  const expected = `
      <hello-world name="${name}">
        <template shadowroot="open">
           <p>Hello, <span>${name}</span>!</p> 
        </template>
      </hello-world>
    `;
  expect(actual).toBe(expected);
});
