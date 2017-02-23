## Picknick
> Useful for rotating slideshows, mixin friendly pager 

### Setup
```sh
npm install picknick
```

### Usage
```js
const pager = require('picknick').createPager;
const myPager = pager(12, 0, console.log);

// Decrement, prints 0
myPager.prev();

// Increment, prints 1
myPager.next();
```

### Example
```sh
# Symlink freshly built standalone module into example folder
# Start a php server on port 8000
npm run example

# Open using default browser
open http://localhost:8000
```

