const { getInput } = require('./utils');
const { part1, part2 } = require('./day4');

test('Day 4', () => {
  const input = getInput('day4.txt');
  const lines = input.split('\n').filter(line => line.length > 0);

  expect(part1(lines)).toBe(20859);
  expect(part2(lines)).toBe(76576);
});
