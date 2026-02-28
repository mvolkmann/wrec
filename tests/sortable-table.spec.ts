// Claude Code generated this file.
import {expect, Page, test} from '@playwright/test';
import {setProperty, waitForNextFrame} from './util';
import {Wrec} from '../src/wrec';

test.beforeEach(async ({page}: {page: Page}) => {
  await page.goto('http://localhost:5173/examples/table-demo.html');
});

test('has title', async ({page}: {page: Page}) => {
  await expect(page).toHaveTitle(/Table Demo/);
});

test('renders table with data', async ({page}: {page: Page}) => {
  const sortableTable = page.locator('sortable-table');

  // Wait for component to initialize
  await waitForNextFrame(page);

  // Check table structure exists
  const table = sortableTable.locator('table');
  await expect(table).toBeVisible();

  // Check headers are rendered
  const headers = table.locator('thead th');
  await expect(headers).toHaveCount(3);
  await expect(headers.nth(0)).toContainText('Name');
  await expect(headers.nth(1)).toContainText('Age');
  await expect(headers.nth(2)).toContainText('Occupation');

  // Check data rows are rendered
  const rows = table.locator('tbody tr');
  await expect(rows).toHaveCount(3);

  // Check first row data
  const firstRowCells = rows.nth(0).locator('td');
  await expect(firstRowCells.nth(0)).toContainText('Alice');
  await expect(firstRowCells.nth(1)).toContainText('30');
  await expect(firstRowCells.nth(2)).toContainText('Engineer');
});

test('sorts by name column', async ({page}: {page: Page}) => {
  const sortableTable = page.locator('sortable-table');
  await waitForNextFrame(page);

  const table = sortableTable.locator('table');
  const nameHeader = table.locator('thead th').nth(0);
  const rows = table.locator('tbody tr');

  // Initial order: Alice, Bob, Charlie
  await expect(rows.nth(0).locator('td').nth(0)).toContainText('Alice');
  await expect(rows.nth(1).locator('td').nth(0)).toContainText('Bob');
  await expect(rows.nth(2).locator('td').nth(0)).toContainText('Charlie');

  // Click name header to sort ascending (should already be ascending)
  await nameHeader.click();
  await waitForNextFrame(page);

  // Should show ascending indicator
  const sortIndicator = nameHeader.locator('.sort-indicator');
  await expect(sortIndicator).toContainText('▲');

  // Click again to sort descending
  await nameHeader.click();
  await waitForNextFrame(page);

  // Should show descending indicator
  await expect(sortIndicator).toContainText('▼');

  // Order should be reversed: Charlie, Bob, Alice
  await expect(rows.nth(0).locator('td').nth(0)).toContainText('Charlie');
  await expect(rows.nth(1).locator('td').nth(0)).toContainText('Bob');
  await expect(rows.nth(2).locator('td').nth(0)).toContainText('Alice');
});

test('sorts by age column', async ({page}: {page: Page}) => {
  const sortableTable = page.locator('sortable-table');
  await waitForNextFrame(page);

  const table = sortableTable.locator('table');
  const ageHeader = table.locator('thead th').nth(1);
  const rows = table.locator('tbody tr');

  // Click age header to sort by age ascending
  await ageHeader.click();
  await waitForNextFrame(page);

  // Should show ascending indicator
  const sortIndicator = ageHeader.locator('.sort-indicator');
  await expect(sortIndicator).toContainText('▲');

  // Order should be by age: Bob (25), Alice (30), Charlie (35)
  await expect(rows.nth(0).locator('td').nth(0)).toContainText('Bob');
  await expect(rows.nth(1).locator('td').nth(0)).toContainText('Alice');
  await expect(rows.nth(2).locator('td').nth(0)).toContainText('Charlie');

  // Click again to sort descending
  await ageHeader.click();
  await waitForNextFrame(page);

  // Should show descending indicator
  await expect(sortIndicator).toContainText('▼');

  // Order should be reversed: Charlie (35), Alice (30), Bob (25)
  await expect(rows.nth(0).locator('td').nth(0)).toContainText('Charlie');
  await expect(rows.nth(1).locator('td').nth(0)).toContainText('Alice');
  await expect(rows.nth(2).locator('td').nth(0)).toContainText('Bob');
});

test('updates data dynamically', async ({page}: {page: Page}) => {
  const sortableTable = page.locator('sortable-table');
  await waitForNextFrame(page);

  const table = sortableTable.locator('table');
  let rows = table.locator('tbody tr');

  // Initially should have 3 rows
  await expect(rows).toHaveCount(3);

  // Add new data
  const newData = [
    {name: 'Alice', age: 30, occupation: 'Engineer'},
    {name: 'Bob', age: 25, occupation: 'Designer'},
    {name: 'Charlie', age: 35, occupation: 'Teacher'},
    {name: 'Diana', age: 28, occupation: 'Doctor'}
  ];

  await setProperty(sortableTable, 'data', newData);
  await waitForNextFrame(page);

  // Should now have 4 rows
  rows = table.locator('tbody tr');
  await expect(rows).toHaveCount(4);

  // Check new row data
  const fourthRowCells = rows.nth(3).locator('td');
  await expect(fourthRowCells.nth(0)).toContainText('Diana');
  await expect(fourthRowCells.nth(1)).toContainText('28');
  await expect(fourthRowCells.nth(2)).toContainText('Doctor');
});

test('headers have correct accessibility attributes', async ({
  page
}: {
  page: Page;
}) => {
  const sortableTable = page.locator('sortable-table');
  await waitForNextFrame(page);

  const table = sortableTable.locator('table');
  const headers = table.locator('thead th');

  // Check first header has correct attributes
  const nameHeader = headers.nth(0);
  await expect(nameHeader).toHaveAttribute('role', 'button');
  await expect(nameHeader).toHaveAttribute('tabindex', '0');
  await expect(nameHeader).toHaveAttribute('title', 'sort by Name');

  // Check it's focusable
  await nameHeader.focus();
  await expect(nameHeader).toBeFocused();
});

test('batchSet works', async ({page}: {page: Page}) => {
  const sortableTable = page.locator('sortable-table');
  await sortableTable.evaluate((el: HTMLElement) => {
    const actual = el as Wrec;
    actual.batchSet({
      headings: 'Age,Name',
      properties: 'age,name'
    });
  });

  const headers = sortableTable.locator('thead th');
  let header = headers.nth(0);
  await expect(header).toHaveText('Age');
  await expect(header).toHaveAttribute('data-property', 'age');
  header = headers.nth(1);
  await expect(header).toHaveText('Name');
  //await expect(header).toHaveAttribute('data-property', 'name');
});
