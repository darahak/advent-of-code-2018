// @ts-check

module.exports = {
  /**
   * @param {Array<string>} lines
   */
  part1(lines) {
    const fabricWidth = 1000;
    let fabric = createSquareFabric(fabricWidth);

    lines.forEach(line => {
      const {
        id,
        pos: { x, y },
        size: { width, height }
      } = parseClaim(line);

      for (let j = y; j < y + height; ++j) {
        for (let i = x; i < x + width; ++i) {
          const cellPos = fabricWidth * j + i;

          fabric[cellPos] = fabric[cellPos] === '.' ? id : 'x';
        }
      }
    });

    return fabric.filter(cell => cell === 'x').length;
  },

  /**
   * @param {Array<string>} lines
   */
  part2(lines) {
    // TODO: Implement part 2.
  }
};

/**
 * @param {number} width
 */
function createSquareFabric(width) {
  let fabric = new Array(width * width);
  fabric.fill('.');

  return fabric;
}

/**
 * @param {string} line
 */
function parseClaim(line) {
  const claim = line.replace(/\s/, '');

  const index = {
    id: claim.indexOf('#'),
    pos: {
      x: claim.indexOf('@'),
      y: claim.indexOf(',')
    },
    size: {
      width: claim.indexOf(':'),
      height: claim.indexOf('x')
    }
  };

  const id = claim.substring(index.id + 1, index.pos.x);
  const pos = {
    x: Number.parseInt(claim.substring(index.pos.x + 1, index.pos.y)),
    y: Number.parseInt(claim.substring(index.pos.y + 1, index.size.width))
  };
  const size = {
    width: Number.parseInt(claim.substring(index.size.width + 1, index.size.height)),
    height: Number.parseInt(claim.substring(index.size.height + 1))
  };

  return { id, pos, size };
}
