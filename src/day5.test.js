const { getInput } = require('./utils');
const { part1, part2 } = require('./day5');

test('Day 5', () => {
  const input = getInput('day5.txt');
  const line = input.split('\n')[0];

  expect(part1(line)).toBe(11264);
  expect(part2(line)).toBe(0);
});
