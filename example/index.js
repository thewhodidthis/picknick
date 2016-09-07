'use strict';

var html = document.documentElement;
var anchors = document.getElementsByTagName('a');

var chooser = new Picknick(anchors.length, function _onAfterUpdate(idx) {
  var current = document.querySelectorAll('.active')[0];

  if (current) {
    current.classList.remove('active');
  }

  anchors[idx].classList.add('active');
});

html.className = 'html';

if (window !== window.top) {
  html.classList.add('is-iframe');
}

document.addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();

  chooser.next();
}, false);

document.addEventListener('keydown', function(e) {
  switch (e.keyCode) {
    case 37:
      chooser.prev();
      break;
    case 39:
      chooser.next();
      break;
  }
}, false);
