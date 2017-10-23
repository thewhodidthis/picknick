'use strict'

const { equal, notDeepEqual } = require('tapeless')
const createPager = require('./')

const trash = [undefined, null, Infinity, NaN, Object, Function, ' ', '\t\t', '\n\r', '-1', 1.1]

const p1 = createPager(1)
const p2 = createPager(1)

p1.prev()
p2.prev()

notDeepEqual(p1, p2, 'pagers are different', 'will maintain own state')
equal(p1.nick(), 0)
equal(p2.nick(), 0)

const p3 = createPager(5)

for (let i = 0, total = p3.total(); i < total; i += 1) {
  p3.next()
}

equal(p3.nick(), 0, 'back to zero', 'will cycle through')

for (let i = 0, total = p3.total(); i < total; i += 1) {
  p3.prev()
}

equal(p3.nick(), 0, 'back to zero')

const p4 = createPager(null)
const results = trash.reduce((acc, val) => acc + p4.total(val) + p4.pick(val), 0)

equal(results, 0, 'nothing', 'will respond but default when thrown trash at')

const p5 = createPager(-1, -1)

equal(p5.total(-8e5), 0, 'total is a match', 'will only allow positive finite numbers')
equal(p5.nick(), 0)
equal(p5.pick(Infinity), 0)

// Both total and index are zero
let pager = createPager()

pager.next()
pager.next()

equal(pager.nick(), 0, 'index and total are zero', 'will pause if')

// Total less than index
pager = createPager(0, 10)

pager.next()
pager.next()
pager.total(1)

equal(pager.nick() + pager.total(), 10, 'index greater than total')
