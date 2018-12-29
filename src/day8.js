// @ts-check

module.exports = {
  /**
   * @param {Array<number>} numbers
   * @returns {number}
   */
  part1(numbers) {
    let nextNumbers = numbers;

    const scan = () => {
      const childCount = nextNumbers.shift();
      const metadataCount = nextNumbers.shift();

      let sum = 0;

      for (let i = 0; i < childCount; ++i) {
        sum += scan();
      }

      for (let j = 0; j < metadataCount; ++j) {
        sum += nextNumbers.shift();
      }

      return sum;
    };

    return scan();
  },

  part2() {
    // TODO
  }
};
