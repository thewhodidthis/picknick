## Picknick
> Mixin friendly pager useful for setting up rotating slideshows

### Setup
```sh
# Fetch latest from github
npm i thewhodidthis/picknick
```

### Usage
```js
import createPager from picknick'

const pager = createPager(12, 0, console.log)

// Decrement, prints 0
pager.prev()

// Increment, prints 1
pager.next()
```
