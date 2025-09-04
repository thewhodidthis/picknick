// # Picknick
// Helps set up pagers

// Helps filter out negative, infinite and non numeric values.
const isAllowed = str => /^\+?\d+$/.test(str)

// __Pager factory__
export default function createPager(cutoff, offset, callback) {
  // Reset cutoff, offset if non numeric.
  let max = isAllowed(cutoff) ? cutoff : 0
  let idx = isAllowed(offset) ? offset : 0

  // Look for callback within args.
  const echo = [cutoff, offset, callback].filter(val => typeof val === "function")[0] || (n => n)

  // Set the index.
  const tick = (n) => {
    // Check supplied index remains below cutoff.
    if (isAllowed(n) && n < max) {
      idx = parseInt(n, 10)
    }

    // Call back with index.
    return echo(idx)
  }

  // The pager object.
  return {
    // Alias tick.
    pick: tick,

    // Read current index.
    nick: () => idx,

    // Increment current index by one.
    prev: () => tick(idx === 0 ? max - 1 : idx - 1),

    // Decrement current index by one.
    next: () => tick(idx === max - 1 ? 0 : idx + 1),

    // Get or set the total.
    total(n) {
      // Check total is greater than the current index.
      if (isAllowed(n) && n > idx) {
        max = parseInt(n, 10)
      }

      return max
    },
  }
}
