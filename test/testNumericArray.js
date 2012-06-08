/**
 * Test Base Data Set
 */
/*jslint indent:2, nomen:false*/

(function () {
  "use strict";
  var NA = require('../numeric_array'),
    exec = require('child_process').exec;

  /**
   * Extend should add sum function to array's properties
   */
  function testExtendShouldAddFunctionsToArray(test) {
    var arr, funcs;
    arr = [];
    funcs = [
      'sum', 'mean', 'stddevpop', 'stddev', 'max', 'min', 'add', 'subtract',
      'pad', 'multiply', 'dot'
    ];
    NA.extend(arr);
    function test_func_exists(funcname) {
      test.ok(
        arr[funcname],
        "NumericArray.extend() should add " + funcname + "() to array"
      );
    }
    funcs.forEach(test_func_exists);
    test.done();
  }
  exports['NumericArray.extend() should add functions to array']
    = testExtendShouldAddFunctionsToArray;

  /**
   * Sum function should return sum of elements
   */
  function testSumShouldReturnSumOfElements(test) {
    var arr = [1];
    NA.extend(arr);
    test.equals(1, arr.sum());
    arr.push(1);
    test.equals(2, arr.sum());
    arr.push(2);
    test.equals(4, arr.sum());
    test.done();
  }
  exports['sum() should return sum of elements']
    = testSumShouldReturnSumOfElements;

  /**
   * Mean function should return mean of elements
   */
  function testMeanShouldReturnSumOfElements(test) {
    var arr = [1];
    NA.extend(arr);
    test.equals(1, arr.mean());
    arr.push(1);
    test.equals(1, arr.mean());
    arr.push(4);
    test.equals(2, arr.mean());
    test.done();
  }
  exports['mean() should return mean of elements']
    = testMeanShouldReturnSumOfElements;

  function testStdDevPopShouldReturnStdDev(test) {
    var arr = [1];
    NA.extend(arr);
    test.equals(0, arr.stddevpop());
    arr.push(2);
    test.equals(0.5, arr.stddevpop());
    test.done();
    arr.push(3);
    test.equals(Math.sqrt(2/3), arr.stddevpop());
    arr.push(4);
    test.equals(Math.sqrt(5/4), arr.stddevpop());
  }
  exports['stddevpop() should return population standard dev']
    = testStdDevPopShouldReturnStdDev;

  function testStdDevShouldReturnStdDev(test) {
    var arr = [1];
    NA.extend(arr);
    test.equals(0, arr.stddev());
    arr.push(2);
    test.equals(Math.sqrt(1/2), arr.stddev());
    test.done();
    arr.push(3);
    test.equals(1, arr.stddev());
    arr.push(4);
    test.equals(Math.sqrt(5/3), arr.stddev());
  }
  exports['stddev() should return population standard dev']
    = testStdDevShouldReturnStdDev;

  function testStdDevFuncsZeroLength(test) {
    var arr = [];
    NA.extend(arr);
    test.ok(isNaN(arr.stddevpop()));
    test.ok(isNaN(arr.stddev()));
    test.done();
  }
  exports['Standard Dev functions should return NaN on zero length']
    = testStdDevFuncsZeroLength;

  function testStdDevFuncsUnitLength(test) {
    var arr = [1];
    NA.extend(arr);
    test.equals(arr.stddevpop(), 0);
    test.equals(arr.stddev(), 0);
    test.done();
  }
  exports['Standard Dev functions should return NaN on zero length']
    = testStdDevFuncsUnitLength;

  function testMaxShouldReturnArrayMax(test) {
    var arr = [1, 2, 3, 4];
    NA.extend(arr);
    test.equals(arr.max(), 4);
    arr = NA.extend([-1, -2, -3, -4]);
    test.equals(arr.max(), -1);
    test.done();
  }
  exports['max() function should return largest integer']
    = testMaxShouldReturnArrayMax;

  function testMinShouldReturnArrayMin(test) {
    var arr = [1, 2, 3, 4];
    NA.extend(arr);
    test.equals(arr.min(), 1);
    arr = NA.extend([-1, -2, -3, -4]);
    test.equals(arr.min(), -4);
    test.done();
  }
  exports['min() function should return largest integer']
    = testMinShouldReturnArrayMin;

  function testPadChangesArrayLength(test) {
    var arr = [];
    NA.extend(arr).pad(5, 0);
    test.equals(5, arr.length);
    test.same([0, 0, 0, 0, 0], arr.slice(0));
    arr = NA.extend([1, 2, 3]);
    arr.pad(4, -1);
    test.same([1, 2, 3, -1], arr.slice(0));
    test.done();
  }
  exports['pad() should extend array length to given value']
    = testPadChangesArrayLength;

  function testAddAddsTwoArrays(test) {
    var arr, added;
    arr   = NA.extend([1, 1, 1]);
    added = arr.add([1, 1, 1]);
    test.same([2, 2, 2], added.slice(0));

    added = NA.extend([0, 0, 0]).add([1, 1, 1]);
    test.same([1, 1, 1], added.slice(0));

    added = NA.extend([-1, 0, 1]).add([1, 0, -1]);
    test.same([0, 0, 0], added.slice(0));
    test.done();
  }
  exports['add() should sum two arrays together'] = testAddAddsTwoArrays;

  function testSubtractGivesDifferenceOfTwoArrays(test) {
    var arr, added;
    arr   = NA.extend([1, 1, 1]);
    added = arr.subtract([1, 1, 1]);
    test.same([0, 0, 0], added.slice(0));

    added = NA.extend([0, 0, 0]).subtract([1, 1, 1]);
    test.same([-1, -1, -1], added.slice(0));

    added = NA.extend([-1, 0, 1]).subtract([1, 0, -1]);
    test.same([-2, 0, 2], added.slice(0));
    test.done();
  }
  exports['subtract() should subtract one array from another']
    = testSubtractGivesDifferenceOfTwoArrays;

  function testAddPadsOutWithZeros(test) {
    var arr;
    arr = NA.extend([0, 0]).add([0, 0, 0, 0]);
    test.equals(4, arr.length);
    test.same([0, 0, 0, 0], arr.slice(0));
    test.done();
  }
  exports['add() should pad with zeros'] = testAddPadsOutWithZeros;

  function testMultiplyMultipliesElements(test) {
    var arr = NA.extend([1, 2, 3]).multiply([2, 3, 4]);
    test.same([2, 6, 12], arr.slice(0));
    arr = NA.extend([1, 1, 1]).multiply([4, 3, 2]);
    test.same([4, 3, 2], arr.slice(0));
    arr = NA.extend([2, 1, 4]).multiply([0, 0, 0, 0]);
    test.same([0, 0, 0, 0], arr.slice(0));
    test.done();
  }
  exports['multiply() should multiply each element together']
    = testMultiplyMultipliesElements;

  function testDotCalculatesDotProduct(test) {
    test.equals(4, NA.extend([1, 2]).dot([2, 1]));
    test.equals(0, NA.extend([1, 0, 0]).dot([0, 1, 1]));
    test.equals(0, NA.extend([1, -1]).dot([-1, -1]));
    test.done();
  }
  exports['dot() should calculate dot product'] = testDotCalculatesDotProduct;

  function testFilesLintOK(test) {
    test.expect(1);
    function check_jslint_result(error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
      test.ok((/is\sOK\.\s*$/m).test(stdout), "Errors in jslint:\n" + stdout);
      test.done();
    }
    exec('jslint ' + __dirname + '/../numeric_array.js', check_jslint_result);
  }
  exports['File should pass JSLint check']
    = testFilesLintOK;
}());
