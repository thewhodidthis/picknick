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
const createPager = (...args) => {
  // Cutoff, offset
  let [max = 0, idx = 0] = args.filter(isAllowed);

  // Assume last argument is the callback
  const echo = (typeof args[args.length - 1] === 'function') ? args.pop() : n => n;

  // Set the index
  const tick = (n) => {
    // Check supplied index does not exceed cuttoff
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

