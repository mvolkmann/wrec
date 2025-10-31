import {expect, test} from 'vitest';
import {getPathValue, setPathValue} from './paths.js';

const obj = {
  color: 'red',
  team: {
    leader: {
      name: 'Alice'
    }
  }
};

test('getPathValue', () => {
  let value = getPathValue(obj, 'color');
  expect(value).toBe('red');
  value = getPathValue(obj, 'team.leader.name');
  expect(value).toBe('Alice');
});

test('setPathValue', () => {
  let newValue = 'blue';
  setPathValue(obj, 'color', newValue);
  let value = getPathValue(obj, 'color');
  expect(value).toBe(newValue);

  newValue = 'Bob';
  setPathValue(obj, 'team.leader.name', newValue);
  value = getPathValue(obj, 'team.leader.name');
  expect(value).toBe(newValue);
});
