const { getInput } = require('./utils');
const { part1, part2 } = require('./day8');

describe('Day 8', () => {
  const input = getInput('day8.txt');
  const line = input.split('\n')[0];
  const numbers = line.split(' ').map(value => Number.parseInt(value));

  test('Part 1', () => {
    expect(part1(numbers)).toBe(35852);
  });

  test('Part 2', () => {
    // expect(part2()).toBe(0);
  });
});
