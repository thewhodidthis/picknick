'use strict';

var picknick = picknick;

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
      console.log('current slide', idx + 1, 'of', max);
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
