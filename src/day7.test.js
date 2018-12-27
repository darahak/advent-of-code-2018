const { getInput } = require('./utils');
const { part1, part2 } = require('./day7');

describe('Day 7', () => {
  const input = getInput('day7.txt');
  const lines = input.split('\n').filter(line => line.length > 0);

  let order;

  test('Part 1', () => {
    order = part1(lines);
    expect(order).toBe('BCEFLDMQTXHZGKIASVJYORPUWN');
  });

  test('Part 2', () => {
    expect(part2(lines, order, 5)).toBe(987);
  });
});
