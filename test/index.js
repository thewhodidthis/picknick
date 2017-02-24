'use strict';

const test = require('tape');
const pager = require('../').createPager;

const trash = [ undefined, null, Infinity, NaN, Object, Function, ' ', '\t\t', '\n\r', '-1', 1.1 ];

test('will maintain own state', (t) => {
  const counter1 = pager(1);
  const counter2 = pager(1);

  counter1.prev();
  counter2.prev();

  t.notDeepEqual(counter1, counter2);
  t.equal(counter1.nick(), 0);
  t.equal(counter2.nick(), 0);

  t.end();
});

test('will cycle through', (t) => {
  const counter = pager(5);

  t.plan(2);

  for (let i = 0, total = counter.total(); i < total; i += 1) {
    counter.next();
  }

  t.equal(counter.nick(), 0);

  for (let i = 0, total = counter.total(); i < total; i += 1) {
    counter.prev();
  }

  t.equal(counter.nick(), 0);
});

test('will respond but default when thrown trash at', (t) => {
  const counter = pager(null);
  const results = trash.reduce((acc, val) => {
    return acc + counter.total(val) + counter.pick(val);
  }, 0);

  t.equal(results, 0);
  t.end();
});

test('will only allow positive finite numbers', (t) => {
  const counter = pager(-1, -1);

  t.equal(counter.total(-8e5), 0);
  t.equal(counter.nick(), 0);
  t.equal(counter.pick(Infinity), 0);
  t.end();
});

test('will pause if', (t) => {
  // Both total and index are zero
  let counter = pager();

  counter.next();
  counter.next();

  t.equal(counter.nick(), 0, 'index and total are zero');

  // Total less than index
  counter = pager(0, 10);

  counter.next();
  counter.next();
  counter.total(1);

  t.equal(counter.nick() + counter.total(), 10, 'index greater than total');
  t.end();
});

