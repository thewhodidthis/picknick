const isAllowed = str => /^\+?\d+$/.test(str);

const createPager = (...args) => {
  let max = isAllowed(args[0]) ? args[0] : 0;
  let idx = isAllowed(args[1]) ? args[1] : 0;

  const echo = (typeof args[args.length - 1] === 'function') ? args.pop() : n => n;
  const tick = (n) => {
    if (isAllowed(n) && n < max) {
      idx = parseInt(n, 10);
    }

    return echo(idx);
  };

  return {
    pick: tick,
    nick: () => idx,
    prev: () => tick(idx === 0 ? max - 1 : idx - 1),
    next: () => tick(idx === max - 1 ? 0 : idx + 1),
    total(n) {
      if (isAllowed(n) && n > idx) {
        max = parseInt(n, 10);
      }

      return max;
    },
  };
};

export default { createPager };

