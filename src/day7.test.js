const { getInput } = require('./utils');
const { part1, part2 } = require('./day7');

describe('Day 7', () => {
  const input = getInput('day7-mini.txt');
  const lines = input.split('\n').filter(line => line.length > 0);

  test('Part 1', () => {
    expect(part1(lines)).toBe('CABDFE');
  });

  test('Part 2', () => {
    // expect(part2(lines)).toBe(0);
  });
});
