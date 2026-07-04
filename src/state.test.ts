import { expect, test, vi } from "vitest";
import { WrecState } from "./wrec-state.js";

type TestState = WrecState & {
  color: string;
  team: {
    leader: {
      name: string;
    };
  };
  notUsed: string;
};

const oldColor = "red";
const oldName = "World";
const myState = new WrecState("vault", false, {
  color: oldColor,
  team: { leader: { name: oldName } },
  notUsed: "not used",
}) as TestState;

test("constructor defaults persist to false when initial state is 2nd argument", () => {
  const state = new WrecState("vault-default-persist", {
    color: oldColor,
    team: { leader: { name: oldName } },
    notUsed: "not used",
  }) as TestState;

  expect(state.color).toBe(oldColor);
  expect(state.team.leader.name).toBe(oldName);
  expect(state.notUsed).toBe("not used");
});

test("listen top-level", () => {
  const newColor = "blue";
  const unsubscribe = myState.subscribe(
    ({ statePath, newValue, oldValue, state }) => {
      expect(statePath).toBe("color");
      expect(newValue).toBe(newColor);
      expect(oldValue).toBe(oldColor);
      expect(state).toBe(myState);
    },
    ["color", "team.leader.name"],
  );
  myState.color = newColor;
  unsubscribe();
});

test("listen nested", () => {
  const newName = "Mark";
  const unsubscribe = myState.subscribe(
    ({ statePath, newValue, oldValue, state }) => {
      expect(statePath).toBe("team.leader.name");
      expect(newValue).toBe(newName);
      expect(oldValue).toBe(oldName);
      expect(state).toBe(myState);
    },
    ["color", "team.leader.name"],
  );
  myState.team.leader.name = newName;
  unsubscribe();
});

test("change callback", () => {
  const calls: Array<{
    statePath: string;
    newValue: unknown;
    oldValue: unknown;
    state: WrecState;
  }> = [];

  const unsubscribe = myState.subscribe(
    ({ statePath, newValue, oldValue, state }) => {
      calls.push({ statePath, newValue, oldValue, state });
    },
    ["color"],
  );
  const oldValue = myState.color;
  const newValue = "green";
  myState.color = newValue;
  myState.team.leader.name = "Someone Else";
  unsubscribe();

  expect(calls).toEqual([
    {
      statePath: "color",
      newValue,
      oldValue,
      state: myState,
    },
  ]);
});

test("listen parent path when nested property changes", () => {
  const calls: Array<{
    statePath: string;
    newValue: unknown;
    oldValue: unknown;
    state: WrecState;
  }> = [];

  const unsubscribe = myState.subscribe(
    ({ statePath, newValue, oldValue, state }) => {
      calls.push({ statePath, newValue, oldValue, state });
    },
    ["team"],
  );
  const oldValue = myState.team.leader.name;
  const newValue = "Pat";
  myState.team.leader.name = newValue;
  unsubscribe();

  expect(calls).toEqual([
    {
      statePath: "team.leader.name",
      newValue,
      oldValue,
      state: myState,
    },
  ]);
});

test("adds properties after construction and retrieves named state", () => {
  const state = new WrecState("dynamic-state");
  expect(state.id).toBeTypeOf("symbol");

  state.addProperty("score", 1);
  expect(state.score).toBe(1);

  state.score = 2;
  expect(state.score).toBe(2);

  expect(WrecState.get("dynamic-state")).toBe(state);
});

test("rejects empty and duplicate state names", () => {
  expect(() => new WrecState("")).toThrow("name cannot be empty");

  new WrecState("duplicate-state");
  expect(() => new WrecState("duplicate-state")).toThrow(
    'WrecState with name "duplicate-state" already exists',
  );
});

test("rejects subscribing the same callback twice", () => {
  const state = new WrecState("duplicate-callback-state", { value: 1 });

  const callback = () => undefined;
  const unsubscribe = state.subscribe(callback);

  expect(() => state.subscribe(callback)).toThrow(
    "WrecState subscribe was passed a callback that was already added",
  );

  unsubscribe();
});

test("subscribes to all changes and stops after unsubscribe", () => {
  const state = new WrecState("all-changes-state", { first: 1, second: 2 });
  const callback = vi.fn();
  const unsubscribe = state.subscribe(callback);

  state.first = 3;
  state.second = 4;
  unsubscribe();
  state.first = 5;

  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback.mock.calls.map(([change]) => change.statePath)).toEqual(["first", "second"]);
});
