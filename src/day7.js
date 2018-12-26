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
    let allNodes = createNodes(parseSteps(lines));

    /** @type Array<string> */
    let nextNodeIds = [];

    allNodes.forEach(node => {
      if (node.before.length === 0) {
        nextNodeIds.push(node.id);
      }
    });

    let orderedSteps = '';

    while (nextNodeIds.length > 0) {
      nextNodeIds.sort();

      const targetNode = allNodes.get(nextNodeIds.shift());

      orderedSteps += targetNode.id;

      allNodes.delete(targetNode.id);

      targetNode.after.forEach(nextNodeId => {
        if (allNodes.has(nextNodeId)) {
          const nextNode = allNodes.get(nextNodeId);

          let prereqConsumed = true;

          for (let prereq of nextNode.before) {
            if (allNodes.has(prereq)) {
              prereqConsumed = false;
              break;
            }
          }

          if (!nextNodeIds.includes(nextNodeId) && prereqConsumed) {
            nextNodeIds.push(nextNodeId);
          }
        }
      });
    }

    return orderedSteps;
  },

  part2(lines) {
    // TODO
  }
};

/**
 * @param {Array<Step>} steps
 * @returns {Map<string, Node>}
 */
function createNodes(steps) {
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

  return nodes;
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
