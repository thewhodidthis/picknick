const createPager = (...args) => {
  // Not using args filter or find to prevent babel form intervening
  let max = (typeof args[0] === 'number') ? args[0] : 0;
  let idx = (typeof args[1] === 'number') ? args[1] : 0;

  const echo = (typeof args[args.length - 1] === 'function') ? args.pop() : () => {};
  const tick = (n) => {
    if (n >= 0 && n < max) {
      idx = n;
    }

    return echo(idx);
  };

  return {
    pick: tick,
    nick: () => idx,
    prev: () => tick(idx === 0 ? max - 1 : idx - 1),
    next: () => tick(idx === max - 1 ? 0 : idx + 1),
    total(n) {
      if (n) {
        max = n;
      }

      return max;
    },
  };
};

export default { createPager };

