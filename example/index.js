'use strict';

var html = document.documentElement;
var anchors = document.getElementsByTagName('a');

var chooser = new Picknick(anchors.length, function _onAfterUpdate(index) {
  for (var i = 0, total = anchors.length; i < total; i += 1) {
    anchors[i].removeAttribute('class');
  }

  anchors[index].className = 'is-active';
});

html.className = 'html';

if (window !== window.top) {
  html.className = html.className + ' is-iframe';
}

document.addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();

  chooser.next();
}, false);

document.addEventListener('keydown', function(e) {
  switch (e.keyCode) {
    case 32:
      chooser.next();
      break;
    case 37:
      chooser.prev();
      break;
    case 39:
      chooser.next();
      break;
  }
}, false);
