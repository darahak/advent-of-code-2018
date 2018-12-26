const { part1, part2 } = require('./day2');
const { getInput } = require('./utils');

describe('Day 2', () => {
  const input = getInput('day2.txt');
  const lines = input.split('\n').filter(line => line.length > 0);

  test('Part 1', () => {
    expect(part1(lines)).toBe(8398);
  });

  test('Part 2', () => {
    expect(part2(lines)).toBe('hhvsdkatysmiqjxunezgwcdpr');
  });
});
