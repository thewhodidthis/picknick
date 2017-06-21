'use strict';

// # Picknick
// Helps setup pagers

// Helps filter out negative, infinite and non numeric values
var isAllowed = function isAllowed(str) {
  return (/^\+?\d+$/.test(str)
  );
};

// __Pager factory__
var createPager = function createPager(cutoff, offset, callback) {
  // Reset cutoff, offset if non numeric
  var max = isAllowed(cutoff) ? cutoff : 0;
  var idx = isAllowed(offset) ? offset : 0;

  // Look for callback within args
  var echo = [cutoff, offset, callback].filter(function (val) {
    return typeof val === 'function';
  })[0] || function (n) {
    return n;
  };

  // Set the index
  var tick = function tick(n) {
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

    // Get/set total
    total: function total(n) {
      // Check total is greater than current index
      if (isAllowed(n) && n > idx) {
        max = parseInt(n, 10);
      }

      return max;
    }
  };
};

module.exports = createPager;
