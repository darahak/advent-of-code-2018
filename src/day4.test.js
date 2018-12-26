const { getInput } = require('./utils');
const { part1, part2 } = require('./day4');

describe('Day 4', () => {
  const input = getInput('day4.txt');
  const lines = input.split('\n').filter(line => line.length > 0);

  test('Part 1', () => {
    expect(part1(lines)).toBe(20859);
  });

  test('Part 2', () => {
    expect(part2(lines)).toBe(76576);
  });
});
