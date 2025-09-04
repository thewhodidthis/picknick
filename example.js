import createPager from "./main.js"

const tabs = document.querySelectorAll("li a")

const { prev, next } = createPager(tabs.length, (n) => {
  tabs.forEach((tab) => {
    tab.classList.remove("pick")
  })

  tabs[n].classList.add("pick")
})

document.addEventListener("click", (e) => {
  if (e.target.localName === "a") {
    return
  }

  e.preventDefault()
  e.stopPropagation()

  next()
})

document.addEventListener("keydown", (e) => {
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
