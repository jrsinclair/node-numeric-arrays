/**
 * Mixin functions (aka traits) for numeric arrays
 */
/*jslint indent:2, node:true, sloppy:true, nomen:true*/
(function () {
  //"use strict";
  var extend, exported_functions;

  /**
   * Strip
   *
   * Return a copy of the array without extensions
   */
  function strip() {
    return this.slice(0);
  }

  /**
   * Return the sum of an array
   */
  function sum() {
    function add_next(memo, val) {
      return memo + val;
    }
    return this.reduce(add_next, 0);
  }

  /**
   * Calculate the mean of an array
   */
  function mean() {
    return this.sum() / this.length;
  }

  /**
   * Population Standard Deviation
   */
  function stddevpop() {
    var mu, len;

    if (this.length === 0) { return NaN; }
    if (this.length === 1) { return 0; }

    mu  = this.mean();
    len = this.length;
    function add_sub_mean_and_square(memo, val) {
      return memo + (val - mu) * (val - mu);
    }
    return Math.sqrt(this.reduce(add_sub_mean_and_square, 0) / len);
  }

  /**
   * Sample Standard Deviation
   */
  function stddev() {
    var mu, len;

    if (this.length === 0) { return NaN; }
    if (this.length === 1) { return 0; }

    mu = this.mean();
    len = this.length;
    function add_sub_mean_and_square(memo, val) {
      return memo + (val - mu) * (val - mu);
    }
    return Math.sqrt(this.reduce(add_sub_mean_and_square, 0) / (len - 1));
  }

  /**
   * Maximum
   */
  function max() {
    return Math.max.apply(null, this);
  }

  /**
   * Minimum
   */
  function min() {
    return Math.min.apply(null, this);
  }

  /**
   * Pad
   *
   * Pad array to a given length with a given value
   */
  function pad(len, val) {
    while (this.length < len) {
      this.push(val);
    }
  }

  function _padToEqualLengths(arr) {
    var len;

    // Make sure arrays are equal length
    this.pad(arr.length, 0);
    len = this.len;
    while (arr.length < len) {
      arr.push(0);
    }
    return arr;
  }

  /**
   * Add one array to another
   */
  function add(arr) {

    // Make sure arrays are equal length
    arr = _padToEqualLengths.call(this, arr);

    // Add the two arrays
    function add_together(val, idx) {
      this[idx] += val;
    }
    arr.forEach(add_together, this);
    return this;
  }

  /**
   * Subtract one array from another
   */
  function subtract(arr) {

    // Make sure arrays are equal length
    arr = _padToEqualLengths.call(this, arr);

    // Add the two arrays
    function add_together(val, idx) {
      this[idx] -= val;
    }
    arr.forEach(add_together, this);
    return this;
  }

  /**
   * Multiply
   *
   * Multiply two arrays, element by element
   */
  function multiply(arr) {

    // Make sure arrays are equal length
    arr = _padToEqualLengths.call(this, arr);

    // Multiply the two arrays together
    function mul_together(val, idx) {
      this[idx] = val * this[idx];
    }
    arr.forEach(mul_together, this);
    return this;
  }

  /**
   * Calculate dot product of two arrays
   */
  function dot(arr) {
    return extend(this.slice(0)).multiply(arr).sum();
  }

  /**
   * Multiply each element by a scalar value
   */
  function scale(val) {
    function mul(x, idx) {
      this[idx] = val * x;
    }
    this.forEach(mul, this);
    return this;
  }

  exported_functions = [
    sum, mean, stddevpop, stddev, max, min, pad, add, subtract, multiply, dot,
    scale
  ];

  /**
   * Extend a given array with mixins
   */
  extend = function (arr) {
    function export_funcs(func) {
      arr[func.name] = func.bind(arr);
    }
    exported_functions.forEach(export_funcs);
    return arr;
  };

  exports.extend = extend;
}());