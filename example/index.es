import Picknick from '../index.es'

const items = document.querySelectorAll('a')
const itemsN = items.length

const select = (n) => {
  for (let i = 0; i < itemsN; i += 1) {
    items[i].classList.remove('is-active')
  }

  items[n].classList.add('is-active')
}

const gallery = Picknick(itemsN, select)

document.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopPropagation()

  gallery.next()
})

document.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
  case 32:
    gallery.next()
    break
  case 37:
    gallery.prev()
    break
  case 39:
    gallery.next()
    break
  default:
    break
  }
})
