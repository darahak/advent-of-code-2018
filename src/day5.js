module.exports = {
  /** @param {string} input */
  part1(input) {
    let chars = input.split('');

    let i = 0;

    while (i < chars.length) {
      const cur = chars[i];

      let destroyed = false;

      if (isUpperCase(cur)) {
        if (chars[i - 1] === cur.toLowerCase()) {
          chars.splice(i - 1, 2);
          destroyed = true;
        } else if (chars[i + 1] === cur.toLowerCase()) {
          chars.splice(i, 2);
          destroyed = true;
        }
      }

      if (destroyed) {
        i = 0;
      } else {
        ++i;
      }
    }

    return chars.length;
  },

  /** @param {string} input */
  part2(input) {}
};

/** @param {string} char */
function isUpperCase(char) {
  return char === char.toUpperCase();
}
