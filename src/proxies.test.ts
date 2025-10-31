import {expect, test} from 'vitest';
import {createDeepProxy} from './proxies.js';

const obj = {
  color: 'red',
  team: {
    leader: {
      name: 'Alice'
    }
  }
};

test('createDeepProxy level 1', () => {
  function callback(keyPath: string, oldValue: unknown, newValue: unknown) {
    expect(keyPath).toBe('color');
    expect(oldValue).toBe('red');
    expect(newValue).toBe('blue');
  }

  const proxy = createDeepProxy(obj, callback);
  proxy.color = 'blue';
});

test('createDeepProxy level 3', () => {
  function callback(keyPath: string, oldValue: unknown, newValue: unknown) {
    expect(keyPath).toBe('team.leader.name');
    expect(oldValue).toBe('Alice');
    expect(newValue).toBe('Bob');
  }

  const proxy = createDeepProxy(obj, callback);
  proxy.team.leader.name = 'Bob';
});
