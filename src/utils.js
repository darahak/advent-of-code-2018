const fs = require('fs');
const path = require('path');

module.exports = {
  getInput(name) {
    const file = path.resolve(__dirname, '../inputs', name);

    const stat = fs.statSync(file);

    return stat.isFile() ? fs.readFileSync(file, { encoding: 'utf8' }) : '';
  }
};
