const { part1, part2 } = require('./day1');
const { getInput } = require('./utils');

describe('Day 1', () => {
  const input = getInput('day1.txt');
  const deltas = input
    .split('\n')
    .map(line => Number.parseInt(line))
    .filter(line => !Number.isNaN(line));

  test('Part 1', () => {
    expect(part1(deltas)).toBe(540);
  });

  test('Part 2', () => {
    expect(part2(deltas)).toBe(73056);
  });
});
