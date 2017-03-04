// # Picknick
/**
 * Helps setup pagers
 * @module picknick
 */

// Helps filter out negative, infinite and non numeric values
const isAllowed = str => /^\+?\d+$/.test(str);

// __Pager factory__
/**
 * @param {Number} cutoff - Counts up to
 * @param {Number} offset - Starts counting from
 * @param {Function} callback - Fired as a consequence of picking out the index
 * @returns {Object}
 * @example
 * picknick.createPager(2, 3, console.log);
 */
const createPager = (cutoff, offset, callback) => {
  // Reset cutoff, offset if non numeric
  let max = isAllowed(cutoff) ? cutoff : 0;
  let idx = isAllowed(offset) ? offset : 0;

  // Look for callback within args
  const echo = [cutoff, offset, callback].filter(val => typeof val === 'function')[0] || (n => n);

  // Set the index
  const tick = (n) => {
    // Check supplied index remains below cutoff
    if (isAllowed(n) && n < max) {
      idx = parseInt(n, 10);
    }

    // Call back with index
    return echo(idx);
  };

  // The pager object
  return {
    // Alias tick
    pick: tick,

    // Get current index
    nick: () => idx,

    // Increment current index by one
    prev: () => tick(idx === 0 ? max - 1 : idx - 1),

    // Decrement current index by one
    next: () => tick(idx === max - 1 ? 0 : idx + 1),

    // Get/set total
    total(n) {
      // Check total is greater than current index
      if (isAllowed(n) && n > idx) {
        max = parseInt(n, 10);
      }

      return max;
    },
  };
};

export default { createPager };

