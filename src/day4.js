// @ts-check

/**
 * @typedef Record
 * @property {number} date Actually just the minutes
 * @property {number | string} record Can be a guard id, 'wake' or 'sleep'
 */

/**
 * @typedef {number} GuardId
 * @typedef {number} SleepMinutes
 * @typedef {Map<GuardId, Array<SleepMinutes>>} RecordMap
 */

module.exports = {
  /** @param {Array<string>} lines */
  part1(lines) {
    const sortedLines = lines.sort().map(parseRecord);

    const sleepiestGuardId = findSleepiestGuard(createSleepRecords(sortedLines));
    const minuteWithMostSleep = findMinuteWithMostSleep(sortedLines, sleepiestGuardId);

    return sleepiestGuardId * minuteWithMostSleep;
  },

  /** @param {Array<string>} lines */
  part2(lines) {
    const records = createSleepRecords(lines.sort().map(parseRecord));

    let maxSleepTime = 0;
    let maxMinute = 0;
    let maxGuardId = 0;

    records.forEach((minutes, guardId) => {
      const tmpSleepTime = Math.max(...minutes);

      if (tmpSleepTime > maxSleepTime) {
        maxSleepTime = tmpSleepTime;
        maxMinute = minutes.indexOf(tmpSleepTime);
        maxGuardId = guardId;
      }
    });

    return maxGuardId * maxMinute;
  }
};

/**
 * @param {Array<Record>} lines
 * @param {number} guardId
 */
function findMinuteWithMostSleep(lines, guardId) {
  let minutes = new Array(60).fill(0);

  let shouldCountSleepingMinutes = false;
  let sleepStart = 0;

  lines.forEach(line => {
    if (typeof line.record === 'number') {
      shouldCountSleepingMinutes = line.record === guardId;
    } else if (shouldCountSleepingMinutes) {
      switch (line.record) {
        case 'sleep':
          {
            sleepStart = line.date;
          }
          break;

        case 'wake':
          {
            for (let i = sleepStart; i < line.date; ++i) {
              ++minutes[i];
            }

            sleepStart = 0;
          }
          break;
      }
    }
  });

  return minutes.indexOf(Math.max(...minutes));
}

/** @param {RecordMap} records */
function findSleepiestGuard(records) {
  let maxId = 0;
  let maxSleep = 0;

  records.forEach((sleepMinutes, guardId) => {
    const totalSleep = sleepMinutes.reduce((acc, cur) => acc + cur);

    if (totalSleep > maxSleep) {
      maxSleep = totalSleep;
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
        let minutes = new Array(60);
        minutes.fill(0);

        stats.set(currentGuard, minutes);
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
            let sleepMinutes = stats.get(currentGuard);

            for (let i = lastDate; i < currentDate; ++i) {
              ++sleepMinutes[i];
            }

            stats.set(currentGuard, sleepMinutes);
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
