import {expect, Locator, Page, test} from '@playwright/test';
import {expectProperty, setProperty} from './util';

test.beforeEach(async ({page}: {page: Page}) => {
  await page.goto('traffic-light.html');
});

async function expectState(component: Locator, state: string) {
  await expectProperty(component, 'state', state);
  await expect(component.locator('.stop')).toHaveClass(
    state === 'stop' ? 'stop on' : 'stop'
  );
  await expect(component.locator('.yield')).toHaveClass(
    state === 'yield' ? 'yield on' : 'yield'
  );
  await expect(component.locator('.go')).toHaveClass(
    state === 'go' ? 'go on' : 'go'
  );
}

test('traffic-light renders', async ({page}: {page: Page}) => {
  const component = page.locator('traffic-light');
  await expect(component.locator('button')).toBeVisible();
  await expect(component.locator('div')).toHaveCount(3);
  await expectState(component, 'stop');
});

test('traffic-light next method advances state', async ({
  page
}: {
  page: Page;
}) => {
  const component = page.locator('traffic-light');
  await component.evaluate((el: HTMLElement) => (el as any).next());
  await expectState(component, 'yield');
  await component.evaluate((el: HTMLElement) => (el as any).next());
  await expectState(component, 'go');
  await component.evaluate((el: HTMLElement) => (el as any).next());
  await expectState(component, 'stop');
});

test('traffic-light state property can be set', async ({
  page
}: {
  page: Page;
}) => {
  const component = page.locator('traffic-light');
  await setProperty(component, 'state', 'go');
  await expectState(component, 'go');
});

test('traffic-light invalid state throws', async ({page}: {page: Page}) => {
  const component = page.locator('traffic-light');
  await expect(async () => {
    await setProperty(component, 'state', 'caution');
  }).rejects.toThrow('must be one of "stop", "yield", "go"');
  await expectState(component, 'stop');
});
