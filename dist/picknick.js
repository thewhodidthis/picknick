var picknick = (function () {
  'use strict';

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  // # Picknick
  /**
   * Helps setup pagers
   * @module picknick
   */

  // Helps filter out negative, infinite and non numeric values
  var isAllowed = function isAllowed(str) {
    return (/^\+?\d+$/.test(str)
    );
  };

  // __Pager factory__
  /**
   * @param {Number} cutoff - Counts up to
   * @param {Number} offset - Starts counting from
   * @param {Function} callback - Fired as a consequence of picking out the index
   * @returns {Object}
   * @example
   * picknick.createPager(2, 3, console.log);
   */
  var createPager = function createPager() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // Cutoff, offset
    var _args$filter = args.filter(isAllowed),
        _args$filter2 = slicedToArray(_args$filter, 2),
        _args$filter2$ = _args$filter2[0],
        max = _args$filter2$ === undefined ? 0 : _args$filter2$,
        _args$filter2$2 = _args$filter2[1],
        idx = _args$filter2$2 === undefined ? 0 : _args$filter2$2;

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

  var index = { createPager: createPager };

  return index;

}());
//# sourceMappingURL=picknick.js.map
