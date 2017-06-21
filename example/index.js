const anchors = document.getElementsByTagName('a');

const select = (n) => {
  for (let i = 0, total = anchors.length; i < total; i += 1) {
    anchors[i].classList.remove('is-active');
  }

  anchors[n].classList.add('is-active');
};

const slider = Picknick(anchors.length, select);

if (window !== window.top) {
  document.documentElement.classList.add('is-iframe');
}

document.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  slider.next();
});

document.addEventListener('keydown', (e) => {
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

