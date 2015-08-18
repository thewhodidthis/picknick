# Picknick
> Run a callback each time the index inside of this thing gets updated. Useful for building slideshows.

### Setup
```
npm install picknick --save
# or
bower install picknick
```

### Usage
See example for typical use case.
```js
var picknick = require('picknick');

// And/or
var pager = picknick({
	total: 12,
	offset: 2,
	callback: function(idx) {
		console.log('current idx', idx);
	}
});

// Set current index
pager.update(target);

// Cycle through -1
pager.prev();

// Cycle through +1
pager.next();

// Limit up
pager.setTotal(max);

// Check current total
pager.getTotal();
```
