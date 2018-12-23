// @ts-check

module.exports = {
  /** @param {string} input */
  part1(input) {
    return createPolymer(input).length;
  },

  /** @param {string} input */
  part2(input) {
    const types = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    let shortestPolymerLength = input.length;

    types.forEach(type => {
      const polymer = createPolymer(input.replace(new RegExp(`${type}`, 'gi'), ''));

      if (polymer.length < shortestPolymerLength) {
        shortestPolymerLength = polymer.length;
      }
    });

    return shortestPolymerLength;
  }
};

/** @param {string} input */
function createPolymer(input) {
  let chars = input.split('');

  let i = 0;

  while (i < chars.length) {
    const cur = chars[i];

    if (isUpperCase(cur)) {
      if (chars[i - 1] === cur.toLowerCase()) {
        chars.splice(i - 1, 2);
        i = i > 2 ? i - 2 : 0;
        continue;
      } else if (chars[i + 1] === cur.toLowerCase()) {
        chars.splice(i, 2);
        i = i > 1 ? i - 1 : 0;
        continue;
      }
    }

    ++i;
  }

  return chars;
}

/** @param {string} char */
function isUpperCase(char) {
  return char === char.toUpperCase();
}
