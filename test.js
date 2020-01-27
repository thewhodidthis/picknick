'use strict'

const { equal, notDeepEqual } = require('tapeless')
const createPager = require('./')

const trash = [undefined, null, Infinity, NaN, Object, Function, ' ', '\t\t', '\n\r', '-1', 1.1]

const p1 = createPager(1)
const p2 = createPager(1)

p1.prev()
p2.prev()

notDeepEqual
  .describe('pagers are different', 'will maintain own state')
  .test(p1, p2)

equal
  .test(p1.nick(), 0)
  .test(p2.nick(), 0)

const p3 = createPager(5)

for (let i = 0, total = p3.total(); i < total; i += 1) {
  p3.next()
}

equal
  .describe('back to zero', 'will cycle through')
  .test(p3.nick(), 0)

for (let i = 0, total = p3.total(); i < total; i += 1) {
  p3.prev()
}

equal
  .describe('back to zero')
  .test(p3.nick(), 0)

const p4 = createPager(null)
const results = trash.reduce((acc, val) => acc + p4.total(val) + p4.pick(val), 0)

equal
  .describe('nothing', 'will respond but default when thrown trash at')
  .test(results, 0)

const p5 = createPager(-1, -1)

equal
  .describe('total is a match', 'will only allow positive finite numbers')
  .test(p5.total(-8e5), 0)
  .test(p5.nick(), 0)
  .test(p5.pick(Infinity), 0)

// Both total and index are zero
let pager = createPager()

pager.next()
pager.next()

equal
  .describe('index and total are zero', 'will pause if')
  .test(pager.nick(), 0)

// Total less than index
pager = createPager(0, 10)

pager.next()
pager.next()
pager.total(1)

equal
  .describe('index greater than total')
  .test(pager.nick() + pager.total(), 10)
