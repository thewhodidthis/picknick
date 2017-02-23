const isNum = n => (!isNaN(parseFloat(n)) && isFinite(n));
const createPager = (...args) => {
  let max = isNum(args[0]) ? args[0] : 0;
  let idx = isNum(args[1]) ? args[1] : 0;

  const echo = (typeof args[args.length - 1] === 'function') ? args.pop() : () => {};
  const tick = (n) => {
    if (isNum(n) && n >= 0 && n < max) {
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
      if (isNum(n)) {
        max = n;
      }

      return max;
    },
  };
};

export default { createPager };

