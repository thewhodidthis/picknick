'use strict';

var createPager = function createPager() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  // Not filtering to avoid polyfill
  var max = typeof args[0] === 'number' ? args[0] : 0;
  var idx = typeof args[1] === 'number' ? args[1] : 0;

  var echo = typeof args[args.length - 1] === 'function' ? args.pop() : function () {};
  var tick = function tick(n) {
    if (n >= 0 && n < max) {
      idx = n;
    }

    return echo(idx);
  };

  return {
    pick: tick,
    nick: function nick() {
      return idx;
    },
    prev: function prev() {
      return tick(idx === 0 ? max - 1 : idx - 1);
    },
    next: function next() {
      return tick(idx === max - 1 ? 0 : idx + 1);
    },
    total: function total(n) {
      if (n) {
        max = n;
      }

      return max;
    }
  };
};

var index = { createPager: createPager };

module.exports = index;
