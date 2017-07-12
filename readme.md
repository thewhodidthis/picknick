## Picknick
> Mixin friendly pager useful for setting up rotating slideshows

### Setup
```sh
npm install picknick
```

### Usage
```js
const createPager = require('picknick');
const pager = createPager(12, 0, console.log);

// Decrement, prints 0
pager.prev();

// Increment, prints 1
pager.next();
```
