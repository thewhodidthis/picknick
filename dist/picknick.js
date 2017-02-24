var picknick = (function () {
  'use strict';

  /**
   * Helps setup pagers
   * @module picknick
   */

  /**
   * Helps filter out negative numbers, infinite and non numeric values
   * @alias module:picknick~isAllowed
   * @protected
   * @param {String} input - Check if input will evaluate as a positive number or zero
   * @returns {Boolean}
   * @see http://stackoverflow.com/questions/10834796/validate-that-a-string-is-a-positive-integer
   */
  var isAllowed = function isAllowed(str) {
    return (/^\+?\d+$/.test(str)
    );
  };

  /**
   * @alias module:picknick.createPager
   * @param {Number} cutoff - Counts up to
   * @param {Number} offset - Starts counting from
   * @param {Function} callback - Fired as a consequence of picking out the index
   * @returns {module:picknick~Pager}
   * @example
   * picknick.createPager(2, 3, console.log);
   */
  var createPager = function createPager() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var max = isAllowed(args[0]) ? args[0] : 0;
    var idx = isAllowed(args[1]) ? args[1] : 0;

    var echo = typeof args[args.length - 1] === 'function' ? args.pop() : function (n) {
      return n;
    };
    var tick = function tick(n) {
      if (isAllowed(n) && n < max) {
        idx = parseInt(n, 10);
      }

      return echo(idx);
    };

    /**
     * @name Pager
     * @typedef
     * @type {Object}
     * @property {function} pick - {@link module:picknick~pick Set current index}
     * @property {function} nick - {@link module:picknick~nick Get current index}
     * @property {function} prev - {@link module:picknick~prev Go back}
     * @property {function} next - {@link module:picknick~next Advance}
     * @property {function} total - {@link module:picknick~total Get or set total}
     */

    return {
      /**
       * Set the index
       * @name pick
       * @function
       * @param {number} index - The new index
       * @returns {undefined} Result of callback
       */
      pick: tick,
      /** Get the index
       * @returns {number} Current index
       */
      nick: function nick() {
        return idx;
      },
      /** Increment current index by one
       * @returns {undefined} Result of callback post update
       */
      prev: function prev() {
        return tick(idx === 0 ? max - 1 : idx - 1);
      },
      /** Decrement current index by one
       * @returns {undefined} Result of callback post update
       */
      next: function next() {
        return tick(idx === max - 1 ? 0 : idx + 1);
      },
      /** Get or set the total
       * @returns {number} The current total post update if update successful
       */
      total: function total(n) {
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
