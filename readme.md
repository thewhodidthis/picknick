## about

A mixin friendly pager useful for setting up rotating slideshows.

## setup

Fetch latest from _npm_,

```sh
# Includes import (ESM) and require (CJS) compatible versions
npm i picknick
```

## usage

Instantiate with optional arguments for total, starting index and a callback function. In return you get a plain object with `prev()` and `next()` methods attached.

```js
import createPager from 'picknick'

const pager = createPager(12, 0, console.log)

// Decrement, prints 0
pager.prev()

// Increment, prints 1
pager.next()
```
