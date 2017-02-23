'use strict';

const test = require('tape');
const pager = require('../').createPager;

test('will cycle through', (t) => {
  const counter = pager(23, 17);

  t.plan(2);

  counter.prev();
  t.equal(counter.nick(), 16, 'prev is a match');

  counter.next();
  counter.next();
  t.equal(counter.nick(), 18, 'next is a match');
});

test('will pause if index or total misconfigured', (t) => {
  const counter = pager(-1, -2);

  t.plan(2);

  counter.prev();
  t.equal(counter.nick(), -2, 'prev has no effect');

  counter.next();
  t.equal(counter.nick(), -2, 'next has no effect');
});

test('will protect data', (t) => {
  const counter1 = pager(2, 1);
  const counter2 = pager(3, 2);

  counter1.prev();
  counter2.prev();

  t.equal(counter1.nick(), 0, 'index is a match');
  t.equal(counter2.nick(), 1, 'index is a match');

  t.end();
});

test('will default silently when fed garbage', (t) => {
  const garbage = [undefined, ' ', '', '\n', NaN, {}, [], Date()];

  garbage.forEach((v) => {
    const counter = pager(v);
    const methods = Object.keys(counter)
      .filter(key => typeof counter[key] === 'function')
      .map(key => counter[key])
      .forEach(val => t.doesNotThrow(val));

    t.equal(counter.pick(v), 0, 'cannot mess with index');
    t.equal(counter.total(v), 0, 'cannot mess with total');
  });

  t.end();
});

