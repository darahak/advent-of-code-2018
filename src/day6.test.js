const { getInput } = require('./utils');
const { part1, part2 } = require('./day6');

describe('Day 6', () => {
  const input = getInput('day6.txt');
  const lines = input.split('\n').filter(line => line.length > 0);

  test('Part 1', () => {
    expect(part1(lines)).toBe(3420);
  });

  test('Part 2', () => {
    expect(part2(lines)).toBe(46667);
  });
});
