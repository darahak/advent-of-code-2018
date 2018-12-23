// @ts-check

/**
 * @typedef Point
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef Grid
 * @property {Array<string>} view
 * @property {number} width
 * @property {number} height
 */

module.exports = {
  /** @param {Array<string>} lines */
  part1(lines) {
    const locations = parseCoordinates(lines);
    const grid = createGrid(locations);

    // TODO: For each grid point, find the closest location(s).
  },

  /** @param {Array<string>} lines */
  part2(lines) {
    // TODO
  }
};

/**
 * @param {Point} here
 * @param {Array<Point>} locations
 */
function getIndexOfClosestLocations(here, locations) {
  // TODO
}

/**
 * @param {Point} p1
 * @param {Point} p2
 * */
function getDistance(p1, p2) {
  return Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);
}

/**
 * @param {Array<Point>} locations
 * @returns {Grid}
 */
function createGrid(locations) {
  const xs = locations.map(p => p.x);
  const ys = locations.map(p => p.y);

  const width = Math.max(...xs) + 1;
  const height = Math.max(...ys) + 1;

  return {
    view: new Array(width * height).fill(''),
    width,
    height
  };
}

/** @param {Array<string>} lines */
function parseCoordinates(lines) {
  return lines.map(line => {
    const [x, y] = line.split(',').map(half => half.trim());
    return { x: Number.parseInt(x), y: Number.parseInt(y) };
  });
}
