import createPager from '../index.mjs'

const items = document.querySelectorAll('li a')
const itemsN = items.length

const select = (n) => {
  for (let i = 0; i < itemsN; i += 1) {
    items[i].classList.remove('is-active')
  }

  items[n].classList.add('is-active')
}

const { prev, next } = createPager(itemsN, select)

document.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopPropagation()

  next()
})

document.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
  case 32:
    next()
    break
  case 37:
    prev()
    break
  case 39:
    next()
    break
  default:
    break
  }
})
