# compose [![CI][ci-badge]][ci-link]

Compose a list of functions into a single function.

## Installation

```sh
$ component install ndhoule/compose
$ npm install @ndhoule/compose
```

## API

### `compose(...funcs: Function)`

Creates a function that is the [composition](https://en.wikipedia.org/wiki/Function_composition) of a list of functions, where each function is passed the return value of the previous function.

Compose is right-associative, which means functions are called in right-to-left order. For example, the operation `h(g(f()))` is represented as `compose(h, g, f)`.

```javascript
var add = function(a, b) { return a + b; };
var square = function(x) { return x * x; };
var addThenSquare = compose(square, add);

addThenSquare(1, 2); //=> 9
```

## License

Released under the [MIT license](LICENSE.md).

[ci-link]: https://travis-ci.org/ndhoule/compose
[ci-badge]: https://travis-ci.org/ndhoule/compose.svg?branch=master
