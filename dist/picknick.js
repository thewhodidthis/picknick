var picknick = (function () {
  'use strict';

  var inc = function inc(idx, max) {
    return idx === max - 1 ? 0 : idx + 1;
  };
  var dec = function dec(idx, max) {
    return idx === 0 ? max - 1 : idx - 1;
  };

  var createPager = function createPager() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { total: 0, index: 0 };
    var echo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    return {
      total: Object.hasOwnProperty.call(opts, 'total') ? opts.total : opts,
      index: Object.hasOwnProperty.call(opts, 'index') ? opts.index : 0,

      pick: function pick(n) {
        if (n >= 0 && n < this.total) {
          this.index = n;
        }

        return echo(this.index);
      },
      nick: function nick() {
        return this.index;
      },
      prev: function prev() {
        this.pick(dec(this.index, this.total));
      },
      next: function next() {
        this.pick(inc(this.index, this.total));
      }
    };
  };

  var index = { createPager: createPager };

  return index;

}());
//# sourceMappingURL=picknick.js.map
