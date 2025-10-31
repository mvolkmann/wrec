import {expect, test} from 'vitest';
import {State} from './state.js';

const oldColor = 'red';
const oldName = 'World';
const myState = new State('vault', {
  color: oldColor,
  team: {leader: {name: oldName}},
  notUsed: 'not used'
});

test('listen top-level', () => {
  const newColor = 'blue';
  const myListener = {
    changed(
      statePath: string,
      componentProperty: string,
      newValue: unknown,
      oldValue: unknown,
      state: State
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
      state: State
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
