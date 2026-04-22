import {expect, test} from 'vitest';
import {createDeepProxy, proxyToPlainObject} from './proxies.js';

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
  const proxy = createDeepProxy(obj, (keyPath, oldValue, newValue) => {
    expect(keyPath).toBe('team.leader.name');
    expect(oldValue).toBe('Alice');
    expect(newValue).toBe('Bob');
  });
  proxy.team.leader.name = 'Bob';
});

test('createDeepProxy caches nested proxies for repeated access', () => {
  const proxy = createDeepProxy(
    {
      team: {
        leader: {
          name: 'Alice'
        }
      }
    },
    () => {}
  );

  expect(proxy.team).toBe(proxy.team);
  expect(proxy.team.leader).toBe(proxy.team.leader);
});

test('createDeepProxy reports array index updates with numeric segments', () => {
  const calls: Array<{
    keyPath: string;
    oldValue: unknown;
    newValue: unknown;
  }> = [];
  const proxy = createDeepProxy(
    {
      teams: [{leader: {name: 'Alice'}}, {leader: {name: 'Bob'}}]
    },
    (keyPath, oldValue, newValue) => {
      calls.push({keyPath, oldValue, newValue});
    }
  );

  proxy.teams[1].leader.name = 'Pat';

  expect(calls).toEqual([
    {
      keyPath: 'teams.1.leader.name',
      oldValue: 'Bob',
      newValue: 'Pat'
    }
  ]);
});

test('createDeepProxy supports replacing nested objects and observing later writes', () => {
  const calls: string[] = [];
  const proxy = createDeepProxy(
    {
      team: {
        leader: {
          name: 'Alice'
        }
      }
    },
    keyPath => {
      calls.push(keyPath);
    }
  );

  proxy.team.leader = {name: 'Bob'};
  proxy.team.leader.name = 'Pat';

  expect(calls).toEqual(['team.leader', 'team.leader.name']);
});

test('proxyToPlainObject preserves arrays and nested values', () => {
  const proxy = createDeepProxy(
    {
      teams: [{leader: {name: 'Alice'}}, {leader: {name: 'Bob'}}]
    },
    () => {}
  );

  proxy.teams[1].leader.name = 'Pat';

  expect(proxyToPlainObject(proxy)).toEqual({
    teams: [{leader: {name: 'Alice'}}, {leader: {name: 'Pat'}}]
  });
});
