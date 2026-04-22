import {describe, expect, test} from 'vitest';
import {getPathValue, setPathValue} from './paths.js';

describe('getPathValue', () => {
  test('gets top-level and nested object values', () => {
    const obj = {
      color: 'red',
      team: {
        leader: {
          name: 'Alice'
        }
      }
    };

    expect(getPathValue(obj, 'color')).toBe('red');
    expect(getPathValue(obj, 'team.leader.name')).toBe('Alice');
  });

  test('supports getting numeric path segments for arrays', () => {
    const obj = {
      teams: [{leader: {name: 'Alice'}}, {leader: {name: 'Bob'}}]
    };

    expect(getPathValue(obj, 'teams.0.leader.name')).toBe('Alice');
    expect(getPathValue(obj, 'teams.1.leader.name')).toBe('Bob');
  });

  test('returns undefined for well-formed paths that do not exist', () => {
    const obj = {
      team: {
        leader: {
          name: 'Alice'
        }
      }
    };

    expect(getPathValue(obj, 'team.missing')).toBeUndefined();
    expect(getPathValue(obj, 'team.leader.name.first')).toBeUndefined();
  });

  test('throws for malformed paths', () => {
    const obj = {team: {leader: {name: 'Alice'}}};

    expect(() => getPathValue(obj, '')).toThrow('path cannot be empty');
    expect(() => getPathValue(obj, 'team..leader')).toThrow(
      'path "team..leader" contains an empty segment'
    );
  });
});

describe('setPathValue', () => {
  test('sets top-level and nested object values', () => {
    const obj = {
      color: 'red',
      team: {
        leader: {
          name: 'Alice'
        }
      }
    };

    setPathValue(obj, 'color', 'blue');
    setPathValue(obj, 'team.leader.name', 'Bob');

    expect(getPathValue(obj, 'color')).toBe('blue');
    expect(getPathValue(obj, 'team.leader.name')).toBe('Bob');
  });

  test('supports setting numeric path segments for arrays', () => {
    const obj = {
      teams: [{leader: {name: 'Alice'}}, {leader: {name: 'Bob'}}]
    };

    setPathValue(obj, 'teams.1.leader.name', 'Pat');

    expect(getPathValue(obj, 'teams.1.leader.name')).toBe('Pat');
  });

  test('throws when an intermediate path segment is missing', () => {
    const obj = {
      team: {
        leader: {
          name: 'Alice'
        }
      }
    };

    expect(() => setPathValue(obj, 'team.coach.name', 'Pat')).toThrow(
      'cannot set path "team.coach.name": missing "team.coach"'
    );
  });

  test('throws when an intermediate path segment is not object-like', () => {
    const obj = {
      team: {
        leader: {
          name: 'Alice'
        }
      }
    };

    expect(() => setPathValue(obj, 'team.leader.name.first', 'A')).toThrow(
      'cannot set path "team.leader.name.first": "team.leader.name" is not object-like'
    );
  });

  test('throws for malformed paths', () => {
    const obj = {team: {leader: {name: 'Alice'}}};

    expect(() => setPathValue(obj, '', 'Pat')).toThrow('path cannot be empty');
    expect(() => setPathValue(obj, 'team..leader', 'Pat')).toThrow(
      'path "team..leader" contains an empty segment'
    );
  });
});
