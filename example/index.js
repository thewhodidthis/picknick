'use strict';

var html = document.documentElement;
var anchors = document.getElementsByTagName('a');

var select = function (n) {
  for (var i = 0, total = anchors.length; i < total; i += 1) {
    anchors[i].classList.remove('is-active');
  }

  anchors[n].classList.add('is-active');
};

var slider = picknick.createPager(anchors.length, select);

if (window !== window.top) {
  html.className = html.className + ' is-iframe';
}

document.addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();

  slider.next();
});

document.addEventListener('keydown', function(e) {
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
  }
});
