module.exports = {
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

  part2(lines) {
    // TODO: Implement part 2.
  }
};
