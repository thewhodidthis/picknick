'use strict';

var $galleries = document.querySelectorAll('.slides');

var setupGallery = function _setupGallery($host) {
  var $children = $host.querySelectorAll('.slide');
  var total = $children.length;

  var chooser = picknick({
    total: total,
    callback: function _onAfterUpdate(idx) {
      var $active = $host.querySelectorAll('.active')[0];

      if ($active) {
        $active.classList.remove('active');
      }

      $children[idx].classList.add('active');
      console.log('---------------------------------');
      console.log('current slide', idx + 1, 'of', total);
    }
  });

  // IE9>
  $host.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    chooser.next();
  });
};

for (var i = 0, total = $galleries.length; i < total; i += 1) {
  setupGallery($galleries[i]);
}

document.documentElement.classList.remove('nojs');
