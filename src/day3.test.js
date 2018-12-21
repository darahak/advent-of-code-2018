const { part1, part2 } = require('./day3');
const { getInput } = require('./utils');

test('Day 3', () => {
  const input = getInput('day3.txt');
  const lines = input.split('\n').filter(line => line.length > 0);

  expect(part1(lines)).toBe(109143);
  expect(part2(lines)).toBe(0);
});
