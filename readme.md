## Picknick
> Run a callback each time the index inside of this thing gets updated, useful for slideshows, pagers etc.

### Setup
```sh
npm install picknick --save
```

### Usage
```js
var picknick = require('picknick');

var pager = new Picknick({
	total: 12,
	start: 2,
	onUpdate: function(idx) {
		console.log('current idx', idx);
	}
});

var seed = Math.floor(Math.random() * pager.total);

// Set current index
pager.pick(seed);

// Cycle through -1
pager.prev();

// Cycle through +1
pager.next();

// Check current index
console.log(pager.index === seed);
```

### Example
```sh
# Symlink freshly built standalone module into example folder
# Start a php server on port 8000
npm run example

# Open using default browser
open http://localhost:8000
```

