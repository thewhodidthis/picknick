(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.picknick = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = Picknick;

function Picknick(options) {
  'use strict';

  var defaults = {
    total: 0,
    offset: 0,
    callback: function() {}
  };

  var settings = options || {};

  // TODO allow passing of total and/or callback on init
  var total = parseInt(settings.total) || defaults.total;
  var current = parseInt(settings.offset) || defaults.offset;
  var callback = (typeof settings.callback === 'function') ? settings.callback : defaults.callback;

  var update = function _update(target) {
    if (total < 1 || target > total) {
      return;
    }

    current = target;

    callback(target);
  };

  var prev = function _prev() {
    var target = (current === 0) ? total : current - 1;

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


},{}]},{},[1])(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
'use strict';

var picknick = require('../../dist/picknick');

var supports = {
  queries: 'querySelector' in document,
  listeners: 'addEventListener' in window
};

var $galleries = document.querySelectorAll('.slides');

var setupGallery = function($host) {
  var $children = $host.querySelectorAll('.slide');
  var max = $children.length;

  var chooser = picknick({
    total: max,
    callback: function _onAfterUpdate(idx) {
      var $active = $host.querySelectorAll('.active')[0];

      if ($active) {
        $active.classList.remove('active');
      }

      $children[idx].classList.add('active');
      console.log('---------------------------------');
      console.log('current slide', idx, 'of', max);
    }
  });

  // IE9>
  $host.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    chooser.next();
  });
}

for (var i = 0, total = $galleries.length; i < total; i += 1) {
  setupGallery($galleries[i]);
}

document.documentElement.classList.remove('nojs');

},{"../../dist/picknick":1}]},{},[2,3]);
