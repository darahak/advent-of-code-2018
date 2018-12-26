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
    const grid = populateGrid(createGrid(locations), locations);

    return Math.max(
      ...getIndexOfFiniteAreas(locations, grid).map(
        id => grid.view.filter(cell => cell === id.toString()).length
      )
    );
  },

  /** @param {Array<string>} lines */
  part2(lines) {
    const locations = parseCoordinates(lines);
    const grid = populateGrid(createGrid(locations), locations);

    const viewWithSafeAreas = grid.view.map((value, i) => {
      const totalDistance = locations.reduce((sum, location) => {
        return sum + getDistance(location, { x: i % grid.width, y: Math.floor(i / grid.width) });
      }, 0);

      return totalDistance < 10000 ? '#' : value;
    });

    return viewWithSafeAreas.filter(value => value === '#').length;
  }
};

/**
 * @param {Grid} grid
 * @param {Array<Point>} locations
 * @returns {Grid}
 */
function populateGrid(grid, locations) {
  const { width, height } = grid;

  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      const closestLocations = getIndexOfClosestLocations({ x, y }, locations);
      const pos = y * width + x;

      if (closestLocations.length > 1) {
        grid.view[pos] = '.';
      } else if (closestLocations.length === 1) {
        grid.view[pos] = closestLocations[0].toString();
      } else {
        throw new Error('No closest location found');
      }
    }
  }

  return grid;
}

/**
 * @param {Array<Point>} locations
 * @param {Grid} grid
 * @returns {Array<number>}
 */
function getIndexOfFiniteAreas(locations, grid) {
  let borderValues = [];

  for (let x = 0; x < grid.width; ++x) {
    // Top.
    borderValues.push(grid.view[x]);
    // Bottom.
    borderValues.push(grid.view[grid.width * (grid.height - 1) + x]);
  }

  for (let y = 1; y < grid.height - 1; ++y) {
    // Left.
    borderValues.push(grid.view[grid.width * y]);
    // Right.
    borderValues.push(grid.view[grid.width * y + grid.width - 1]);
  }

  borderValues = [...new Set(borderValues)];

  let finiteAreas = [];

  for (let i = 0; i < locations.length; ++i) {
    if (!borderValues.includes(i.toString())) {
      finiteAreas.push(i);
    }
  }

  return finiteAreas;
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
