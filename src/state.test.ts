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
