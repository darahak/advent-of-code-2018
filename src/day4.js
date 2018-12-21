// @ts-check

/**
 * @typedef Record
 * @property {number} date Actually just the minutes
 * @property {number | string} record Can be a guard id, 'wake' or 'sleep'
 */

/**
 * @typedef {number} GuardId
 * @typedef {number} SleepTime
 * @typedef {Map<GuardId, SleepTime>} RecordMap
 */

module.exports = {
  /** @param {Array<string>} lines */
  part1(lines) {
    const sortedLines = lines.sort().map(parseRecord);
    const records = createSleepRecords(sortedLines);
    const sleepiestGuardId = findSleepiestGuard(records);

    // FIXME: Should be (sleepiestGuardId * minuteWithMostSleep)
    return sleepiestGuardId * records.get(sleepiestGuardId);
  },

  /** @param {Array<string>} lines */
  part2(lines) {}
};

/** @param {RecordMap} records */
function findSleepiestGuard(records) {
  let maxId = 0;
  let maxSleep = 0;

  records.forEach((sleepTime, guardId) => {
    if (sleepTime > maxSleep) {
      maxSleep = sleepTime;
      maxId = guardId;
    }
  });

  return maxId;
}

/**
 * @param {Array<Record>} records
 * @returns {RecordMap}
 */
function createSleepRecords(records) {
  /** @type RecordMap */
  let stats = new Map();

  let currentGuard = 0;
  let lastDate = records[0].date;

  records.forEach(({ date, record }) => {
    const currentDate = date;

    if (typeof record === 'number') {
      currentGuard = record;

      if (!stats.has(currentGuard)) {
        stats.set(currentGuard, 0);
      }
    } else {
      switch (record) {
        case 'sleep':
          {
            lastDate = currentDate;
          }
          break;
        case 'wake':
          {
            const sleepTime = stats.get(currentGuard);
            const diff = currentDate - lastDate;

            stats.set(currentGuard, sleepTime + diff);
          }
          break;
      }
    }
  });

  return stats;
}

/**
 * @param {string} line
 * @returns {Record}
 */
function parseRecord(line) {
  const timestampStart = line.indexOf('[');
  const timestampEnd = line.indexOf(']');

  const date = sanitizeDate(line.substring(timestampStart + 1, timestampEnd));
  const record = sanitizeRecord(line.substring(timestampEnd + 2));

  return { date, record };
}

/**
 * @param {string} text
 * @returns {number}
 */
function sanitizeDate(text) {
  return Number.parseInt(text.substring(text.indexOf(':') + 1));
}

/**
 * @param {string} text
 * @returns {number | string}
 */
function sanitizeRecord(text) {
  if (text.includes('Guard')) {
    return Number.parseInt(text.replace('Guard #', '').replace(' begins shift', ''));
  } else if (text.includes('wakes')) {
    return 'wake';
  } else if (text.includes('asleep')) {
    return 'sleep';
  }

  return text;
}
