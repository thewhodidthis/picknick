## Picknick
> Useful for rotating slideshows, mixin friendly pager 

### Setup
```sh
npm install picknick
```

### Usage
```js
const pager = require('picknick').createPager;

// The following are equivalent
const myPager = pager({
	total: 12,
}, console.log);

const pager12 = pager(12, console.log);

// Decrement
myPager.prev();

// Increment
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

