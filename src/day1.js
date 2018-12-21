// @ts-check

module.exports = {
  /**
   * @param {Array<number>} deltas
   */
  part1(deltas) {
    return deltas.reduce((acc, cur) => acc + cur);
  },

  /**
   * @param {Array<number} deltas
   */
  part2(deltas) {
    let hz = [];
    let acc = 0;

    let i = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      acc += deltas[i++];

      if (hz.includes(acc)) {
        return acc;
      }

      hz.push(acc);

      if (i === deltas.length) {
        i = 0;
      }
    }
  }
};
