import {expect, Page, test} from '@playwright/test';
import {setAttribute} from './util';

test.beforeEach(async ({page}: {page: Page}) => {
  await page.goto('http://localhost:5173/');
});

test('has title', async ({page}: {page: Page}) => {
  await expect(page).toHaveTitle(/wrec Demo/);
});

test('binding-demo-input', async ({page}: {page: Page}) => {
  const bindingDemo = page.locator('binding-demo');
  const p = bindingDemo.locator('#input-demo > p');
  await expect(p).toHaveText('Hello, Mark!');

  let name = 'Tami';
  setAttribute(bindingDemo, 'name', name);
  await expect(p).toHaveText(`Hello, ${name}!`);

  const input = bindingDemo.locator('#input-demo > input');
  name = 'Comet';
  await input.fill(name);
  await expect(p).toHaveText(`Hello, ${name}!`);
});

test('binding-demo-textarea', async ({page}: {page: Page}) => {
  const bindingDemo = page.locator('binding-demo');
  const span = bindingDemo.locator('#textarea-demo > p > span');
  await expect(span).toHaveText('Once upon a time...');

  let story = 'Far away ...';
  setAttribute(bindingDemo, 'story', story);
  await expect(span).toHaveText(story);

  const textarea = bindingDemo.locator('#textarea-demo > textarea');
  story = 'In a land ...';
  await textarea.fill(story);
  await textarea.press('Tab');
  await expect(span).toHaveText(story);
});

test('counter-vanilla', async ({page}: {page: Page}) => {
  const rootSelector = 'counter-vanilla';

  const label = page.locator(rootSelector + '> label');
  await expect(label).toHaveText('Score');

  const span = page.locator(rootSelector + '> span').first();
  await expect(span).toHaveText('0');

  const incBtn = page.locator(rootSelector + '> #inc-btn');
  await incBtn.click();
  await incBtn.click();
  await expect(span).toHaveText('2');

  const decBtn = page.locator(rootSelector + '> #dec-btn');
  for (let i = 1; i <= 2; i++) {
    await decBtn.click();
  }
  await expect(span).toHaveText('0');
  await expect(decBtn).toBeDisabled();

  await incBtn.click();
  await expect(span).toHaveText('1');
  await expect(decBtn).toBeEnabled();
});

test('counter-wrec', async ({page}: {page: Page}) => {
  const div = page.locator('counter-wrec').first();
  const span = div.locator('span').first();
  await expect(span).toHaveText('1');

  const incBtn = div.locator('button').last();
  await expect(incBtn).toHaveText('+');
  await incBtn.click();
  await expect(span).toHaveText('2');

  const decBtn = div.locator('button').first();
  for (let i = 1; i <= 2; i++) {
    await decBtn.click();
  }
  await expect(span).toHaveText('0');
  await expect(decBtn).toBeDisabled();

  await incBtn.click();
  await expect(span).toHaveText('1');
  await expect(decBtn).toBeEnabled();
});

test('multiply-numbers', async ({page}: {page: Page}) => {
  const component = page.locator('multiply-numbers');
  const result = component.locator('span').last();
  await expect(result).toHaveText('12');

  setAttribute(component, 'n1', '5');
  setAttribute(component, 'n2', '6');
  await expect(result).toHaveText('30');
});

test('temperature-eval', async ({page}: {page: Page}) => {
  const component = page.locator('temperature-eval');
  await expect(component).toHaveText('not freezing');

  setAttribute(component, 'temperature', '20');
  await expect(component).toHaveText('freezing');
});
