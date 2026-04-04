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
  const myListener = {
    changed(
      statePath: string,
      componentProperty: string,
      newValue: unknown,
      oldValue: unknown,
      state: WrecState
    ) {
      expect(statePath).toBe('color');
      expect(componentProperty).toBe('color');
      expect(newValue).toBe(newColor);
      expect(oldValue).toBe(oldColor);
      expect(state).toBe(myState);
    }
  };
  myState.addListener(myListener, {color: 'color', 'team.leader.name': 'name'});
  myState.color = newColor;
  myState.removeListener(myListener);
});

test('listen nested', () => {
  const newName = 'Mark';
  const myListener = {
    changed(
      statePath: string,
      componentProperty: string,
      newValue: unknown,
      oldValue: unknown,
      state: WrecState
    ) {
      expect(statePath).toBe('team.leader.name');
      expect(componentProperty).toBe('name');
      expect(newValue).toBe(newName);
      expect(oldValue).toBe(oldName);
      expect(state).toBe(myState);
    }
  };

  myState.addListener(myListener, {color: 'color', 'team.leader.name': 'name'});
  myState.team.leader.name = newName;
  myState.removeListener(myListener);
});

test('change callback', () => {
  const calls: Array<{
    statePath: string;
    newValue: unknown;
    oldValue: unknown;
    state: WrecState;
  }> = [];

  const callback = (
    statePath: string,
    newValue: unknown,
    oldValue: unknown,
    state: WrecState
  ) => {
    calls.push({statePath, newValue, oldValue, state});
  };

  myState.addChangeCallback(callback, ['color']);
  const oldValue = myState.color;
  const newValue = 'green';
  myState.color = newValue;
  myState.team.leader.name = 'Someone Else';
  myState.removeChangeCallback(callback);

  expect(calls).toEqual([
    {
      statePath: 'color',
      newValue,
      oldValue,
      state: myState
    }
  ]);
});
