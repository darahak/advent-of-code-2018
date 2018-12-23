const { getInput } = require('./utils');
const { part1, part2 } = require('./day6');

test('Day 6', () => {
  const input = getInput('day6.txt');
  const lines = input.split('\n').filter(line => line.length > 0);

  // FIXME: Insert solutions.
  expect(part1(lines)).toBe(0);
  expect(part2(lines)).toBe(0);
});
