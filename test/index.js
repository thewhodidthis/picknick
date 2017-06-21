const test = require('tape');
const createPager = require('../');

const trash = [undefined, null, Infinity, NaN, Object, Function, ' ', '\t\t', '\n\r', '-1', 1.1];

test('will maintain own state', (t) => {
  const pager1 = createPager(1);
  const pager2 = createPager(1);

  pager1.prev();
  pager2.prev();

  t.notDeepEqual(pager1, pager2);
  t.equal(pager1.nick(), 0);
  t.equal(pager2.nick(), 0);

  t.end();
});

test('will cycle through', (t) => {
  const pager = createPager(5);

  t.plan(2);

  for (let i = 0, total = pager.total(); i < total; i += 1) {
    pager.next();
  }

  t.equal(pager.nick(), 0);

  for (let i = 0, total = pager.total(); i < total; i += 1) {
    pager.prev();
  }

  t.equal(pager.nick(), 0);
});

test('will respond but default when thrown trash at', (t) => {
  const pager = createPager(null);
  const results = trash.reduce((acc, val) => acc + pager.total(val) + pager.pick(val), 0);

  t.equal(results, 0);
  t.end();
});

test('will only allow positive finite numbers', (t) => {
  const pager = createPager(-1, -1);

  t.equal(pager.total(-8e5), 0);
  t.equal(pager.nick(), 0);
  t.equal(pager.pick(Infinity), 0);
  t.end();
});

test('will pause if', (t) => {
  // Both total and index are zero
  let pager = createPager();

  pager.next();
  pager.next();

  t.equal(pager.nick(), 0, 'index and total are zero');

  // Total less than index
  pager = createPager(0, 10);

  pager.next();
  pager.next();
  pager.total(1);

  t.equal(pager.nick() + pager.total(), 10, 'index greater than total');
  t.end();
});

