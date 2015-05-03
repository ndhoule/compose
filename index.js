'use strict';

var arity = require('@ndhoule/arity');

/**
 * Creates a function that is the [composition](https://en.wikipedia.org/wiki/Function_composition)
 * of a list of functions, where each function is passed the return value of the previous function.
 *
 * Compose is right-associative, which means functions are called in right-to-left order. For
 * example, the operation `h(g(f()))` is represented as `compose(h, g, f)`.
 *
 * @name compose
 * @api public
 * @param {...Function} funcs The functions to compose into a single function.
 * @return {Function} Returns a new function which, when called, will invoke each input function in
 * right-to-left order and return the result of the final function call.
 * @example
 * var add = function(a, b) { return a + b; };
 * var square = function(x) { return x * x; };
 *
 * var addThenSquare = compose(square, add);
 *
 * addThenSquare(1, 2);
 * //=> 9
 */

var compose = function compose(/* funcs */) {
  if (!arguments.length) {
    throw new Error('Expected at least one argument but received zero');
  }

  for (var i = 0; i < arguments.length; i += 1) {
    if (typeof arguments[i] !== 'function') {
      throw new TypeError('Expected a function but received a ' + typeof arguments[i] + ' at argument index ' + i);
    }
  }

  // Don't wrap a single function
  if (arguments.length === 1) {
    return arguments[0];
  }

  var funcs = Array.prototype.slice.call(arguments);
  var first = funcs.pop();
  var rest = funcs.reverse();
  return arity(first.length, function() {
    var result = first.apply(this, arguments);

    for (var i = 0; i < rest.length; i += 1) {
      result = rest[i].call(this, result);
    }
    return result;
  });
};

/**
 * Exports.
 */

module.exports = compose;
