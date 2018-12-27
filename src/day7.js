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

  /**
   * @param {Array<string>} lines
   * @param {string} expectedOrder
   * @param {number} workerLimit
   * @returns {number}
   */
  part2(lines, expectedOrder, workerLimit) {
    let allNodes = createNodes(parseSteps(lines));
    let taskQueue = expectedOrder.split('');

    /** @type Map<string, number> */
    let ongoingTasks = new Map(); // <id, remainingTime>
    ongoingTasks.limit = workerLimit;

    let totalDuration = 0;

    while (taskQueue.length > 0) {
      // Fetch new tasks.
      if (ongoingTasks.size < ongoingTasks.limit) {
        const nextTasks = getNextTasks(taskQueue, ongoingTasks, allNodes);

        nextTasks.forEach(task => {
          if (!ongoingTasks.has(task) && ongoingTasks.size < ongoingTasks.limit) {
            ongoingTasks.set(task, getTaskDuration(task));
          }
        });
      }

      // Process ongoing tasks.
      for (let [id] of ongoingTasks) {
        let remainingTime = ongoingTasks.get(id);

        if (--remainingTime > 0) {
          ongoingTasks.set(id, remainingTime);
        } else {
          allNodes.delete(id);
          ongoingTasks.delete(id);
          taskQueue.splice(taskQueue.indexOf(id), 1);
        }
      }

      ++totalDuration;
    }

    return totalDuration;
  }
};

/**
 * @param {Array<string>} queue
 * @param {Map<string, number>} ongoing
 * @param {Map<string, Node>} nodes
 * @returns {Array<string>}
 */
function getNextTasks(queue, ongoing, nodes) {
  let nextTasks = [];

  const it = nodes.values();

  let added = 0;

  while (added < ongoing.limit) {
    const next = it.next();

    if (next.done) {
      break;
    }

    const task = next.value;

    let shouldAdd = true;

    for (let prereq of task.before) {
      if (ongoing.has(prereq) || queue.includes(prereq)) {
        shouldAdd = false;
        break;
      }
    }

    if (shouldAdd) {
      nextTasks.push(task.id);
      ++added;
    }
  }

  return nextTasks;
}

/**
 * @param {string} taskId
 * @returns {number}
 */
function getTaskDuration(taskId) {
  // Minus 64 which is the char code before 'A', plus 60 seconds from the instructions.
  return taskId.charCodeAt(0) - 4;
}

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
