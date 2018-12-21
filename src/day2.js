// @ts-check

module.exports = {
  /**
   * @param {Array<string>} lines
   */
  part1(lines) {
    let twos = 0;
    let threes = 0;

    lines.forEach(line => {
      const chars = line.split('');
      const uniqueChars = [...new Set(chars)];

      let hasTwo = false;
      let hasThree = false;

      uniqueChars.forEach(uniqueChar => {
        const count = chars.filter(c => c === uniqueChar).length;

        if (count === 2 && !hasTwo) {
          hasTwo = true;
          ++twos;
        } else if (count === 3 && !hasThree) {
          hasThree = true;
          ++threes;
        }
      });
    });

    return twos * threes;
  },

  /**
   * @param {Array<string>} lines
   */
  part2(lines) {
    const maxLength = lines[0].trim().length;

    for (let i = 0; i < lines.length; ++i) {
      for (let j = i; j < lines.length; ++j) {
        const commonChars = getCommonChars(lines[i], lines[j]);
        if (commonChars.length === maxLength - 1) {
          return commonChars;
        }
      }
    }

    return '';
  }
};

/**
 * @param {string} first
 * @param {string} second
 */
function getCommonChars(first, second) {
  const firstChars = first.split('');
  const secondChars = second.split('');

  let commonChars = '';

  firstChars.forEach((c, i) => {
    if (c === secondChars[i]) {
      commonChars += c;
    }
  });

  return commonChars.trim();
}
