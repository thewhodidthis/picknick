(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Picknick = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function Picknick(options, callback) {
  this.start = options.start || 0;
  this.total = options.total || parseInt(options, 10) || 0;
  this._nick = options.onUpdate || callback;

  this.index = this.start;
  this.pick();
}

Picknick.prototype = {
  constructor: Picknick,

  pick: function tick(target) {
    if (target >= 0 && target < this.total) {
      this.index = target;
    }

    return this._nick(this.index);
  },

  prev: function prev() {
    var target = (this.index === 0) ? this.total - 1 : this.index - 1;

    this.pick(target);
  },

  next: function next() {
    var target = (this.index === this.total - 1) ? 0 : this.index + 1;

    this.pick(target);
  }
};

module.exports = Picknick;

},{}]},{},[1])(1)
});