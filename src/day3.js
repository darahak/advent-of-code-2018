// @ts-check

/**
 * @typedef Claim
 * @property {string} id
 * @property {object} pos
 * @property {number} pos.x
 * @property {number} pos.y
 * @property {object} size
 * @property {number} size.width
 * @property {number} size.height
 */

module.exports = {
  /** @param {Array<string>} lines */
  part1(lines) {
    const fabricWidth = 1000;

    return applyClaimsToFabric(
      createSquareFabric(fabricWidth),
      fabricWidth,
      lines.map(parseClaim)
    ).filter(cell => cell === 'x').length;
  },

  /** @param {Array<string>} lines */
  part2(lines) {
    const fabricWidth = 1000;

    const claims = lines.map(parseClaim);
    const fabric = applyClaimsToFabric(createSquareFabric(fabricWidth), fabricWidth, claims);

    let intactId = '';

    claims.forEach(claim => {
      if (intactId !== '') {
        return;
      }

      const {
        id,
        pos: { x, y },
        size: { width, height }
      } = claim;

      intactId = id;

      for (let j = y; j < y + height; ++j) {
        for (let i = x; i < x + width; ++i) {
          const cellPos = fabricWidth * j + i;

          if (fabric[cellPos] === 'x') {
            intactId = '';
          }
        }
      }
    });

    return intactId;
  }
};

/** @param {number} width */
function createSquareFabric(width) {
  let fabric = new Array(width * width);
  fabric.fill('.');

  return fabric;
}

/**
 * @param {Array<string>} fabric
 * @param {number} fabricWidth
 * @param {Array<Claim>} claims
 */
function applyClaimsToFabric(fabric, fabricWidth, claims) {
  claims.forEach(claim => {
    const {
      id,
      pos: { x, y },
      size: { width, height }
    } = claim;

    for (let j = y; j < y + height; ++j) {
      for (let i = x; i < x + width; ++i) {
        const cellPos = fabricWidth * j + i;

        fabric[cellPos] = fabric[cellPos] === '.' ? id : 'x';
      }
    }
  });

  return fabric;
}

/** @param {string} line */
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
