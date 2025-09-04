## about

A mixin friendly pager useful for setting up rotating slideshows.

## setup

Load via script tag:

```html
<!-- Just an IIFE namespaced `picknick` -->
<script src="https://thewhodidthis.github.io/picknick/picknick.js"></script>
```

Source from an import map:

```json
{
  "imports": {
    "picknick": "https://thewhodidthis.github.io/picknick/main.js"
  }
}
```

Download from GitHub directly if using a package manager:

```sh
# Add to package.json
npm install thewhodidthis/picknick
```

## usage

Instantiate with optional arguments for the wrap-around total and start position, plus a function to call with each index change. In return you get a plain object with `prev()` and `next()` methods attached for moving that index back and forth. For example:

```js
import createPager from "picknick"

// Page through a dozen elements.
const pager = createPager(12, 0, console.log)

// Decrement, prints 0.
pager.prev()

// Increment, prints 1.
pager.next()
```
