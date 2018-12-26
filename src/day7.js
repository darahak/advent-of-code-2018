// @ts-check

/**
 * @typedef Node
 * @property {string} id
 * @property {Array<Node>} before
 * @property {Array<Node>} after
 */

/**
 * @typedef Step
 * @property {string} first
 * @property {string} second
 */

module.exports = {
  /**
   * @param {Array<string>} lines
   * @returns {string}
   */
  part1(lines) {
    const steps = parseSteps(lines);

    /** @type {Map<string, Node>} */
    let nodes = new Map();

    steps.forEach(({ first, second }) => {
      if (!nodes.has(first)) {
        nodes.set(first, new Node(first, [], [second]));
      } else {
        let node = nodes.get(first);
        node.after.push(second);

        nodes.set(first, node);
      }

      if (!nodes.has(second)) {
        nodes.set(second, new Node(second, [first], []));
      } else {
        let node = nodes.get(second);
        node.before.push(first);

        nodes.set(second, node);
      }
    });

    /** @type Array<Node> */
    let currentNodes = [];

    // First pass.
    nodes.forEach(node => {
      if (node.before.length === 0) {
        currentNodes.push(node);
      }
    });

    /** @type string */
    let orderedSteps = '';

    // FIXME: Take prerequisites into account.
    while (currentNodes.length > 0) {
      currentNodes.sort(sortById);

      const { id, after } = currentNodes[0];

      currentNodes.splice(0, 1);
      nodes.delete(id);

      after.forEach(nodeId => {
        const toAdd = nodes.get(nodeId);
        if (toAdd && !currentNodes.includes(toAdd)) {
          currentNodes.push(toAdd);
        }
      });

      orderedSteps += id;
    }

    return orderedSteps;
  },

  part2(lines) {
    // TODO
  }
};

/**
 * @param {Node} a
 * @param {Node} b
 * @returns {number}
 */
function sortById(a, b) {
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

/**
 * @param {string} id
 * @param {Array<string>} before
 * @param {Array<string>} after
 * @returns {Node}
 */
function Node(id, before, after) {
  this.id = id;
  this.before = before;
  this.after = after;
}

/**
 * @param {Array<string>} lines
 * @returns {Array<Step>}
 */
function parseSteps(lines) {
  return lines.map(line => {
    const [first, second] = line.match(/ [A-Z] /g);
    return { first: first.trim(), second: second.trim() };
  });
}
