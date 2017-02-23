var picknick = (function () {
  'use strict';

  var isNum = function isNum(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };
  var createPager = function createPager() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var max = isNum(args[0]) ? args[0] : 0;
    var idx = isNum(args[1]) ? args[1] : 0;

    var echo = typeof args[args.length - 1] === 'function' ? args.pop() : function (n) {
      return n;
    };
    var tick = function tick(n) {
      if (isNum(n) && n >= 0 && n < max) {
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
        if (isNum(n)) {
          max = n;
        }

        return max;
      }
    };
  };

  var index = { createPager: createPager };

  return index;

}());
//# sourceMappingURL=picknick.js.map
