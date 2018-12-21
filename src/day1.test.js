const { part1, part2 } = require('./day1');
const { getInput } = require('./utils');

test('Day 1', () => {
  const input = getInput('day1.txt');
  const deltas = input
    .split('\n')
    .map(line => Number.parseInt(line))
    .filter(line => !Number.isNaN(line));

  expect(part1(deltas)).toBe(540);
  expect(part2(deltas)).toBe(73056);
});
