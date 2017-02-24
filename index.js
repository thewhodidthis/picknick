'use strict';

/**
 * Helps setup pagers
 * @module picknick
 */

// Helps filter out negative, infinite and non numeric values
var isAllowed = function isAllowed(str) {
  return (/^\+?\d+$/.test(str)
  );
};

/**
 * @alias module:picknick.createPager
 * @param {Number} cutoff - Counts up to
 * @param {Number} offset - Starts counting from
 * @param {Function} callback - Fired as a consequence of picking out the index
 * @returns {Object}
 * @example
 * picknick.createPager(2, 3, console.log);
 */
// Pager factory
var createPager = function createPager() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  // Cutoff
  var max = isAllowed(args[0]) ? args[0] : 0;

  // Offset
  var idx = isAllowed(args[1]) ? args[1] : 0;

  // Assume last argument is the callback
  var echo = typeof args[args.length - 1] === 'function' ? args.pop() : function (n) {
    return n;
  };

  // Set the index
  var tick = function tick(n) {
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
    nick: function nick() {
      return idx;
    },

    // Increment current index by one
    prev: function prev() {
      return tick(idx === 0 ? max - 1 : idx - 1);
    },

    // Decrement current index by one
    next: function next() {
      return tick(idx === max - 1 ? 0 : idx + 1);
    },

    // Get or set the total
    total: function total(n) {
      // Check total is greater than current index
      if (isAllowed(n) && n > idx) {
        max = parseInt(n, 10);
      }

      // Get total
      return max;
    }
  };
};

var index = { createPager: createPager };

module.exports = index;
