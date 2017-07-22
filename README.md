### RuddyJS is now deprecated, development moved to wrapjs https://github.com/RuddyMonkey/wrapjs.

# RuddyJS
## Version 0.0.3 Documentation
RuddyJS is a javascript library, and it's main purpose is to simplify and unify javascript.
RuddyJS uses 'global wrappers' in order to make javascript more strict, type based and make it compatible with most browsers and platforms.

## Install (npm)

```bash
$ npm install ruddy
```

## Install (bower)

```bash
$ bower install ruddy
```

## Install (browser)

```html
<script src="scripts/ruddy.min.js"></script>
```

## Usage (Node)

```js
var ruddy = require('ruddy')(false);
var $arr = ruddy.$arr;
var $str = ruddy.$str;
...
```

## Usage (ES6)

```js
import ruddy from 'ruddy';
let {$arr, $str, ...} = ruddy(false);
```

## Node (Dom included)

Using jsdom in this exmaple usage.

```js
import ruddy from 'ruddy';
import jsdom from 'jsdom';

jsdom.env({
    html: content,
    done: function (err, window) {
        if(err)
            console.log(err);

        var document = window.document || {};
        let {$el, $arr, ...} = ruddy(false, window, document);
    }
});
```

## Node (Global Object)

Importing the module and calling it with the parameter `setGlobals` set to TRUE.

```js
import ruddy from 'ruddy';
ruddy(true);
```

## Example

```js
//Right
var list = $arr([1,2,3]);

list.forEach(function(value, index){
    console.log(index, value);
});
```

```js
//Wrong
var list = $arr({a:1,b:2,c:3});

list.forEach(function(value, index){
    console.log(index, value);
});
```

Output

```bash
//Right
0,1
1,2
2,3
```

```bash
//Wrong
TypeError: Array type - argument provided is not an array type
```
