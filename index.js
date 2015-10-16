function Picknick(options) {
  'use strict';

  var defaults = {
    total: 0,
    offset: 0,
    callback: function() {}
  };

  var total = options.total || defaults.total;

  // Limit offset between 0 and total - 1
  var current = Math.max(Math.min(options.offset || defaults.offset, total - 1), 0);
  var callback = options.callback || defaults.callback;

  var update = function _update(target) {
    if (total < 1 || target > total) {
      return;
    }

    current = target;

    callback(target);
  };

  var prev = function _prev() {
    var target = (current === 0) ? total - 1 : current - 1;

    update(target);
  };

  var next = function _next() {
    var target = (current === total - 1) ? 0 : current + 1;

    update(target);
  };

  var setTotal = function _setTotal(target) {
    if (!target) {
      return;
    }

    total = target;
  };

  var getTotal = function _getTotal() {
    return total;
  };

  update(current);

  return {
    prev: prev,
    next: next,
    update: update,
    setTotal: setTotal,
    getTotal: getTotal,
  };
}

module.exports = Picknick;
