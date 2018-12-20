const { getInput } = require('./utils');

module.exports = function day1() {
  const input = getInput('day1.txt');

  const values = input.split('\n').map(line => Number.parseInt(line));

  return values.reduce((acc, cur) => (Number.isNaN(cur) ? acc : acc + cur));
};
