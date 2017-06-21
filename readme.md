## Picknick
> Mixin friendly pager useful for setting up rotating slideshows

### Setup
```sh
npm install picknick
```

### Usage
```js
const picknick = require('picknick');
const pager = picknick(12, 0, console.log);

// Decrement, prints 0
pager.prev();

// Increment, prints 1
pager.next();
```

### Example
```sh
# Symlink freshly built standalone module into example folder
# Start a php server on port 8000
npm run example

# Open using default browser
open http://localhost:8000
```

