var Picknick = (function () {
  'use strict';

  function Picknick(options, callback) {
    if (this instanceof Picknick === false) {
      return new Picknick(options, callback);
    }

    this.start = options.start || 0;
    this.total = options.total || parseInt(options, 10) || 0;
    this.nick = options.onUpdate || callback;

    this.index = this.start;
    this.pick();
  }

  Picknick.prototype = {
    constructor: Picknick,

    pick: function pick(target) {
      if (target >= 0 && target < this.total) {
        this.index = target;
      }

      return this.nick(this.index);
    },
    prev: function prev() {
      var target = this.index === 0 ? this.total - 1 : this.index - 1;

      this.pick(target);
    },
    next: function next() {
      var target = this.index === this.total - 1 ? 0 : this.index + 1;

      this.pick(target);
    }
  };

  return Picknick;

}());
//# sourceMappingURL=picknick.js.map
