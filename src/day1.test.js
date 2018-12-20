test('Day 1', () => {
  const day1 = require('./day1');

  const res = day1();

  console.log('Day 1 result: ', res);
  expect(res).toBe(540);
});
