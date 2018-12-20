const fs = require('fs');
const path = require('path');

module.exports = function day1() {
  const input = fs.readFileSync(path.resolve(__dirname, '../inputs/day1.txt'), {
    encoding: 'utf8'
  });

  const values = input.split('\n').map(line => Number.parseInt(line));

  return values.reduce((acc, cur) => (Number.isNaN(cur) ? acc : acc + cur));
};
