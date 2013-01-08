# Numeric Arrays

Provides a library of utility mixins for dealing with numeric arrays in
JavaScript. For example:

    var NumericArray = require('numeric_array'),
        myArray      = [1, 2, 3, 4];

    NumericArray.extend(myArray);
    myArray.sum();  // 10
    myArray.mean(); // 2.5
    myArray.add([1, 1, 1, 1]);      // myArray is now [2, 3, 4, 5]
    myArray.dot([1, 0, 1, 0]);      // 6
    myArray.multiply([0, 1, 0, 1]); // myArray is now [0, 3, 0, 5]

Note that the above is a slightly verbose way of using the library. Most
methods can be chained, so you could write:

    var $A = require('numeric_array').extend,
      myArray = $A([1, 2, 3, 4]);

    myArray
      .add([1, 1, 1, 1])
      .multiply([0, 1, 0, 1]); // myArray is now [0, 3, 0, 5]

    $A([1, 1, 1, 1, 1.1]).sum();  // 5.1
    $A([1, 1, 2, 2, 1.5]).mean(); // 1.5
    $A([1, 2, 3, 4, 3.3]).max();  // 4

## Things to note

**Beware, these methods modify the original array.** As shown in the examples
above, using methods that return an array (like `add()` or `multiply()`) will
modify the variable in-place and return itself. This means that to do things
like find the difference between two arrays without modifying one of them, you
will need to take a clone first. For example, it is very easy to do something
like the following:

    // Do not do this. This is the wrong way to find the difference
    var a, b, diff;
    a = $A([1, 2, 3, 4]);
    b = [1, 1, 1, 1];
    diff = a.subtract(b); // diff is now [0, 1, 2, 3], which is correct
                          // but a now also equals [0, 1, 2, 3]

Instead, use the `slice()` command to create a copy of the array and use that.

    // This is the correct way to find the difference
    var a, b, diff;
    a    = [1, 2, 3, 4];
    b    = [1, 1, 1, 1];
    diff = $A(a.slice(0)).subtract(b); // diff is [0, 1, 2, 3]
                                       // a and b are intact

**This library assumes that your arrays are already numeric.** The `extend()`
function does not check to see if every element in the array can be parsed to
a numeric value. It is up to you to not pass silly things for extension. If you
do happen to throw a string or object in there, most of the time you will just
get back a `NaN` value, but sometimes you will cause exceptions to be thrown.

## Methods

### Sum `sum()`

Adds each element in the array together and returns the total.

    $A([1, 2, 3]).sum(); // 6

### Mean `mean()`

Calculates the
*[arithmetic mean](http://en.wikipedia.org/wiki/Arithmetic_mean)* of the numbers
in the array.

    $A([1, 2, 3, 4]).mean(); // 3.5

### Standard Deviation `stddev()`

Calculates the *sample* standard deviation
(see en.wikipedia.org/wiki/Standard_deviation) of the numbers in the array.

    $A([1, 2, 3]).stddev(); // 1.0

### Population Standard Deviation `stddevpop()`

Calculates the *population* standard deviation
(see en.wikipedia.org/wiki/Standard_deviation) of the numbers in the array.

    $A([1, 2, 3]).stddevpop(); // 0.8165

### Maximum `max()`

Returns the largest number in the array (delegates to `Math.max()`).

    $A([-1, 0, 1]).max(); // 1

### Minimum `min()`

Returns the smallest number in the array (delegates to `Math.min()`)

    $A([-1, 0, 1]).min(); // -1

### Pad `pad(len, val)`

Appends the value of *val* to the array until it has length *len*. Returns
the extended array, allowing for chaining.

    $A([1, 2, 3]).pad(5, 0); // [1, 2, 3, 0, 0]

### Add `add(arr)`

Adds the values of *arr* to the array. If one of the two arrays is longer than
the other, the shorter one will be padded with zeros to make them the same
length.

    $A([1, 1, 1]).add([1, 1, 1, 1, 1]); // [2, 2, 2, 1, 1]

### Subtract `subtract(arr)`

Subtracts *arr* from the array. If one of the two arrays is longer than
the other, the shorter one will be padded with zeros to make them the same
length.

    $A([1, 2, 3, 4]).subtract([1, 1, 1, 1]); // [0, 1, 2, 3]

### Multiply `multiply(arr)`

Multiplies each element of the array with the corresponding element from *arr*.
If one of the two arrays is longer than
the other, the shorter one will be padded with zeros to make them the same
length.

    $A([1, 2, 3, 4]).multiply([2, 2, 2, 2]); // [2, 4, 6, 8]

### Scale `scale(num)`

Scales each element of the array by *num*.

    $A([1, 2, 3]).scale(1.5); // [1.5, 3, 4.5]

### Dot Product `dot(arr)`

Calculates the dot product of the array with *arr*. If one of the two arrays is
longer than the other, the shorter one will be padded with zeros to make them
the same length.


    $A([1, 2, 3, 4]).dot([1, 0, 1, 0]); // 4

### Strip `strip()`

Returns a copy of the array stripped of its extended functionality.

