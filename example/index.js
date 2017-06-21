(function () {
'use strict';

// # Picknick
// Helps setup pagers

// Helps filter out negative, infinite and non numeric values
var isAllowed = function isAllowed(str) {
  return (/^\+?\d+$/.test(str)
  );
};

// __Pager factory__
var createPager$1 = function createPager(cutoff, offset, callback) {
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

var anchors = document.getElementsByTagName('a');

var select = function select(n) {
  for (var i = 0, total = anchors.length; i < total; i += 1) {
    anchors[i].classList.remove('is-active');
  }

  anchors[n].classList.add('is-active');
};

var slider = createPager$1(anchors.length, select);

if (window !== window.top) {
  document.documentElement.classList.add('is-iframe');
}

document.addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation();

  slider.next();
});

document.addEventListener('keydown', function (e) {
  switch (e.keyCode) {
    case 32:
      slider.next();
      break;
    case 37:
      slider.prev();
      break;
    case 39:
      slider.next();
      break;
    default:
      break;
  }
});

}());
