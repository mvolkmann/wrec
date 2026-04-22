import {expect, test} from 'vitest';
import {WrecState} from './wrec-state.js';

type TestState = WrecState & {
  color: string;
  team: {
    leader: {
      name: string;
    };
  };
  notUsed: string;
};

const oldColor = 'red';
const oldName = 'World';
const myState = new WrecState('vault', false, {
  color: oldColor,
  team: {leader: {name: oldName}},
  notUsed: 'not used'
}) as TestState;

test('constructor defaults persist to false when initial state is 2nd argument', () => {
  const state = new WrecState('vault-default-persist', {
    color: oldColor,
    team: {leader: {name: oldName}},
    notUsed: 'not used'
  }) as TestState;

  expect(state.color).toBe(oldColor);
  expect(state.team.leader.name).toBe(oldName);
  expect(state.notUsed).toBe('not used');
});

test('listen top-level', () => {
  const newColor = 'blue';
  const unsubscribe = myState.subscribe(
    ({statePath, newValue, oldValue, state}) => {
      expect(statePath).toBe('color');
      expect(newValue).toBe(newColor);
      expect(oldValue).toBe(oldColor);
      expect(state).toBe(myState);
    },
    ['color', 'team.leader.name']
  );
  myState.color = newColor;
  unsubscribe();
});

test('listen nested', () => {
  const newName = 'Mark';
  const unsubscribe = myState.subscribe(
    ({statePath, newValue, oldValue, state}) => {
      expect(statePath).toBe('team.leader.name');
      expect(newValue).toBe(newName);
      expect(oldValue).toBe(oldName);
      expect(state).toBe(myState);
    },
    ['color', 'team.leader.name']
  );
  myState.team.leader.name = newName;
  unsubscribe();
});

test('change callback', () => {
  const calls: Array<{
    statePath: string;
    newValue: unknown;
    oldValue: unknown;
    state: WrecState;
  }> = [];

  const unsubscribe = myState.subscribe(
    ({statePath, newValue, oldValue, state}) => {
      calls.push({statePath, newValue, oldValue, state});
    },
    ['color']
  );
  const oldValue = myState.color;
  const newValue = 'green';
  myState.color = newValue;
  myState.team.leader.name = 'Someone Else';
  unsubscribe();

  expect(calls).toEqual([
    {
      statePath: 'color',
      newValue,
      oldValue,
      state: myState
    }
  ]);
});

test('listen parent path when nested property changes', () => {
  const calls: Array<{
    statePath: string;
    newValue: unknown;
    oldValue: unknown;
    state: WrecState;
  }> = [];

  const unsubscribe = myState.subscribe(
    ({statePath, newValue, oldValue, state}) => {
      calls.push({statePath, newValue, oldValue, state});
    },
    ['team']
  );
  const oldValue = myState.team.leader.name;
  const newValue = 'Pat';
  myState.team.leader.name = newValue;
  unsubscribe();

  expect(calls).toEqual([
    {
      statePath: 'team.leader.name',
      newValue,
      oldValue,
      state: myState
    }
  ]);
});
