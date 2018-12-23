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
  /**
   * @param {Array<string>} lines
   * @returns {number}
   */
  part1(lines) {
    const locations = parseCoordinates(lines);
    const { view, width, height } = createGrid(locations);

    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        const closestLocations = getIndexOfClosestLocations({ x, y }, locations);
        const pos = y * width + x;

        if (closestLocations.length > 1) {
          view[pos] = '.';
        } else if (closestLocations.length === 1) {
          view[pos] = closestLocations[0].toString();
        } else {
          throw new Error('No closest location found');
        }
      }
    }

    dumpGrid(view, width, height);
  },

  /** @param {Array<string>} lines */
  part2(lines) {
    // TODO
  }
};

function dumpGrid(view, width, height) {
  const viewCopy = Array.from(view);

  for (let i = 0; i < viewCopy.length; ++i) {
    viewCopy[i] = viewCopy[i].padStart(2, ' ');
  }

  for (let i = width - 1; i < width * height; i += width) {
    viewCopy[i] += '\n';
  }

  const fs = require('fs');
  const path = require('path');

  fs.writeFileSync(path.resolve(__dirname, '..', 'out', 'grid.txt'), viewCopy.join(' '));
}

/**
 * @param {Point} here
 * @param {Array<Point>} locations
 * @returns {Array<number>}
 */
function getIndexOfClosestLocations(here, locations) {
  let shortestDistance = Number.MAX_VALUE;
  let distances = [];

  locations.forEach(loc => {
    const distance = getDistance(here, loc);
    distances.push(distance);

    if (distance < shortestDistance) {
      shortestDistance = distance;
    }
  });

  let results = [];

  distances.forEach((d, i) => {
    if (d === shortestDistance) {
      results.push(i);
    }
  });

  return results;
}

/**
 * @param {Point} p1
 * @param {Point} p2
 * @returns {number}
 * */
function getDistance(p1, p2) {
  return Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);
}

/**
 * @param {Array<Point>} locations
 * @returns {Grid}
 */
function createGrid(locations) {
  const width = Math.max(...locations.map(p => p.x)) + 1;
  const height = Math.max(...locations.map(p => p.y)) + 1;

  let view = new Array(width * height).fill('');

  locations.forEach((loc, i) => (view[loc.y * width + loc.x] = i.toString()));

  return { view, width, height };
}

/**
 * @param {Array<string>} lines
 * @returns {Array<Point>}
 */
function parseCoordinates(lines) {
  return lines.map(line => {
    const [x, y] = line.split(',').map(half => half.trim());
    return { x: Number.parseInt(x), y: Number.parseInt(y) };
  });
}
