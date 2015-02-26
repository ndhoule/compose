/* globals describe it beforeEach */

'use strict';

var assert = require('assert');
var sinon = require('sinon');
var compose = require('../');

describe('compose', function() {
  var add, identity;

  beforeEach(function() {
    add = function(a, b) { return a + b; };
    identity = function(val) { return val; };
  });

  it('should be a function', function() {
    assert.equal(typeof compose, 'function');
  });

  it('should have an arity of 0', function() {
    assert.equal(compose.length, 0);
  });

  it('should return a function with an arity equal to that of the final argument', function() {
    var a = function(a, b) { return a + b; };
    var b = function(a, b, c) { return a + b + c; };
    var fn = compose(a, b);

    assert.equal(fn.length, b.length);
  });

  it('should return the original function when passed only one argument', function() {
    assert.equal(compose(add), add);
  });

  it('should call functions in right-associative order', function() {
    var first = sinon.spy();
    var second = sinon.spy();
    var third = sinon.spy();

    compose(third, second, first)();

    assert(first.calledBefore(second));
    assert(second.calledBefore(third));
  });

  it('should only call each function once', function() {
    var first = sinon.spy();
    var second = sinon.spy();
    var third = sinon.spy();

    compose(third, second, first)();

    assert(first.calledOnce);
    assert(second.calledOnce);
    assert(third.calledOnce);
  });

  it('should pass the results of the previous function call to the next', function() {
    var increment = function(a) { return add(a, 1); };
    var first = sinon.spy(increment);
    var second = sinon.spy(increment);
    var third = sinon.spy(increment);

    compose(third, second, first)(0);

    assert(first.calledWithExactly(0));
    assert(second.calledWithExactly(1));
    assert(third.calledWithExactly(2));

  });

  it('should throw an error if any of its arguments are non-functions', function() {
    assert.throws(function() { compose('abc'); });
    assert.throws(function() { compose(true, identity, identity); });
    assert.throws(function() { compose(identity, 1, identity); });
    assert.throws(function() { compose(identity, identity, 'fdsa'); });
  });
});
