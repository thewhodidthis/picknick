'use strict';

const test = require('tape');
const pager = require('../').createPager;

test('will accept bare total', (t) => {
  const counter = pager(2);

  t.equal(counter.total, 2, 'total is a match');
  t.end();
});

test('will respect defaults', function(t) {
  const counter = pager();

  try {
    counter.pick();
  } catch (e) {
    t.fail(e);
  }

  t.equal(counter.index, 0, 'index is a match');
  t.equal(counter.total, 0, 'total is a match');
  t.end();
});

test('will respect settings', (t) => {
  const myFactory = pager(23);
  const counter = Object.assign(myFactory, {
    total: 5,
    index: 2,
  });

  t.plan(2);
  t.equal(counter.total, 5, 'total is a match');
  t.equal(counter.index, 2, 'index is a match');
});

test('will throw if options are null', (t) => {
  try {
    pager(null);
  } catch (e) {
    t.pass(e);
  };

  t.end();
});

test('callback affects method calls', (t) => {
  const counter = pager({
    total: 5,
    index: 2,
  }, null);

  try {
    counter.pick() && counter.prev() && counter.next();
  } catch (e) {
    t.pass(e);
  }

  t.equal(counter.total, 5, 'total is a match');
  t.equal(counter.index, 2, 'index is a match');
  t.end();
});

test('settings do not affect method calls', (t) => {
  const garbage = [undefined, NaN, {}, [], () => {}, Symbol, Date()];
  const counters = garbage.map((val) => pager(val));

  counters.forEach((counter, i) => {
    try {
      counter.pick() && counter.prev() && counter.next();
    } catch (e) {
      t.fail(e);
    }
  });

  t.end();
});

test('settings will pause index', (t) => {
  const garbage = [undefined, NaN, {}, [], () => {}, Symbol, Date()];
  const counter = pager({});

  t.plan(2);

  counter.prev();
  t.equal(counter.index, 0, 'prev has no effect');

  counter.next();
  t.equal(counter.index, 0, 'next has no effect');
});

test('will pause if index greater than total', (t) => {
  const counter = pager({
    total: 2,
    index: 3,
  });

  t.plan(2);

  counter.prev();
  counter.prev();
  t.equal(counter.index, 3, 'prev has no effect');

  counter.next();
  counter.next();
  counter.next();
  t.equal(counter.index, 3, 'next has no effect');
});

test('will cycle through', (t) => {
  const counter = pager({
    total: 5,
    index: 2,
  });

  t.plan(2);

  counter.prev();
  t.equal(counter.index, 1, 'prev is a match');

  counter.next();
  t.equal(counter.index, 2, 'next is a match');
});

