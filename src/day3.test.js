const { part1, part2 } = require('./day3');
const { getInput } = require('./utils');

describe('Day 3', () => {
  const input = getInput('day3.txt');
  const lines = input.split('\n').filter(line => line.length > 0);

  test('Part 1', () => {
    expect(part1(lines)).toBe(109143);
  });

  test('Part 2', () => {
    expect(part2(lines)).toBe('506');
  });
});
