const inc = (idx, max) => (idx === max - 1 ? 0 : idx + 1);
const dec = (idx, max) => (idx === 0 ? max - 1 : idx - 1);

const createPager = (opts = { total: 0, index: 0 }, echo = () => {}) => ({
  total: Object.hasOwnProperty.call(opts, 'total') ? opts.total : opts,
  index: Object.hasOwnProperty.call(opts, 'index') ? opts.index : 0,

  pick(n) {
    if (n >= 0 && n < this.total) {
      this.index = n;
    }

    return echo(this.index);
  },

  nick() {
    return this.index;
  },

  prev() {
    this.pick(dec(this.index, this.total));
  },

  next() {
    this.pick(inc(this.index, this.total));
  },
});

export default { createPager };

