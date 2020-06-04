## about

A mixin friendly pager useful for setting up rotating slideshows.

## setup

Fetch latest from the _npm_ registry:

```sh
# Includes ESM (import) and CJS (require) compatible versions
npm i picknick
```

## usage

Instantiate with optional arguments for the wrap-around total and start position, plus a function to call with each index change. In return you get a plain object with `prev()` and `next()` methods attached for moving that index back and forth. For example,

```js
import createPager from 'picknick'

// Page through a dozen elements
const pager = createPager(12, 0, console.log)

// Decrement, prints 0
pager.prev()

// Increment, prints 1
pager.next()
```
