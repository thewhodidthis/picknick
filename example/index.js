import createPager from '../index.mjs'

const tabs = document.querySelectorAll('li a')

const { prev, next } = createPager(tabs.length, (n) => {
  tabs.forEach((tab) => {
    tab.classList.remove('is-active')
  })

  tabs[n].classList.add('is-active')
})

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
