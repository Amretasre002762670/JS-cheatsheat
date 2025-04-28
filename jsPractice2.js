// write a function that returns a reverse of a string
const inputString = "Hello World";

function reverseString(str) {
  // let output = "";
  return str.split("").reverse().join("");
}

console.log("reverseString: ", reverseString(inputString));

// write a function that returns the longest word in the sentence
const sentence = "I love Javascript";

function longestWord(str) {
  const words = str.split(" ");
  let longestWord = "";
  for (let word of words) {
    if (longestWord.length < word.length) {
      longestWord = word;
    }
  }
  return longestWord;
}

console.log("longestWord: ", longestWord(sentence));

// write a function that checks if a string is palindrome or not

const palindromeString = "madam";

function isPalindrome(str) {
  const reveredStr = str.split("").reverse().join("");
  return str === reveredStr;
}

console.log("isPalindrome: ", isPalindrome(palindromeString));

// write a function that removes duplicate elements from an ordered array

const orderedArray = [1, 2, 3, 4, 5, 5, 6, 7, 8, 8];

function removeDuplicates(arr) {
  const uniqueArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (uniqueArray.indexOf(arr[i]) === -1) {
      uniqueArray.push(arr[i]);
    }
  }

  return uniqueArray;
}

const removeDuplicatesSet = function (arr) {
  return [...new Set(arr)];
};

console.log("removeDuplicates: ", removeDuplicates(orderedArray));

// write a function that checks if two strings are anagrams or not
const str1 = "listen";
const str2 = "silent";

function isAnagram(str1, str2) {
  const arr1 = str1.split("").sort().join("");
  const arr2 = str2.split("").sort().join("");

  return arr1 === arr2;
}

console.log("isAnagram:", isAnagram(str1, str2));

// write a function that returns the number of vowels in a string
const vowelString = "Javascript";

function countVowels(str) {
  const vowelsArr = ["a", "e", "i", "o", "u"];
  let count = 0;
  const strArr = str.split("");
  for (let i = 0; i < strArr.length; i++) {
    if (vowelsArr.includes(strArr[i].toLowerCase())) {
      count++;
    }
  }
  return count;
}

console.log("countVowels: ", countVowels(vowelString));

// write a function to find the largest number in an array
const numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function findLargestNumber(arr) {
  let largest = 0;
  for (let i = 0; i < arr.length; i++) {
    if (largest < arr[i]) {
      largest = arr[i];
    }
  }

  return largest;
}

console.log("findLargestNumber: ", findLargestNumber(numberArr));

// write a function to check if a given number is a prime number or not
const primeNumber = 7;

function isPrime(num) {
  for (let i = 2; i < num / 2; i++) {
    if (num % i == 0) {
      return false;
    }
  }
  return true;
}

console.log("isPrime: ", isPrime(primeNumber));

// write a function to find the factorial of a number
const factorialNumber = 5;

function factorial(num) {
  let factorialResult = 1;
  if (num == 0) {
    return 1;
  }

  for (let i = 1; i < num + 1; i++) {
    factorialResult *= i;
  }

  return factorialResult;
}

console.log("factorial: ", factorial(factorialNumber));

// write a function to remove all white space characters from a string
const whiteSpaceString = "I love Javascript";

function removeWhiteSpaces(str) {
  return str.split(" ").join("");
}

console.log("removeWhiteSpaces: ", removeWhiteSpaces(whiteSpaceString));

// Write a function that checks if a given value is an instance of a given class or superclass.
// For this problem, an object is considered an instance of a given class if that object has access to that class's methods.
// There are no constraints on the data types that can be passed to the function.
// For example, the value or the class could be undefined.

function isInstaceOf(obj, classFunction) {
  // Note: instanceof will only compare an object with constructor function
  if (obj === undefined || obj === null || typeof classFunction != "function")
    return false;
  return Object(obj) instanceof classFunction;
}

console.log(isInstaceOf(new Date(), Date));

// Write a class that allows getting and setting key-value pairs, however a time until expiration is associated with each key.
// The class has three public methods:
// set(key, value, duration): accepts an integer key, an integer value, and a duration in milliseconds. Once the duration has elapsed, the key should be inaccessible. The method should return true if the same un-expired key already exists and false otherwise. Both the value and duration should be overwritten if the key already exists.
// get(key): if an un-expired key exists, it should return the associated value. Otherwise it should return -1.
// count(): returns the count of un-expired keys.

var TimeLimitedCache = function () {
  this.cache = {};
};

TimeLimitedCache.prototype.set = function (key, value, duration) {
  // if the key exists then over write the value and the timer and the function should return true
  if (this.cache[key] && this.cache[key].timer) {
    clearTimeout(this.cache[key].timer);
    this.cache[key].value = value;
    this.cache[key].timer = setTimout(function () {
      delete this.cache[key];
    }, duration);
    return true;
  } else {
    // create a new record for the key and return false
    this.cache[key] = {
      value: value,
      timer: setTimeout(function () {
        delete this.cache[key];
      }, duration),
    };
    return false;
  }
};

TimeLimitedCache.prototype.get = function (key) {
  if (this.cache[key] && this.cache[key].timer) {
    return this.cache[key].value;
  }
  return -1;
};

TimeLimitedCache.prototype.count = function () {
  let count = 0;
  for (let key in this.cache) {
    if (this.cache[key].timer) {
      count++;
    }
  }

  return count;
};

// 2623. Memoize
// Given a function fn, return a memoized version of that function.

// A memoized function is a function that will never be called twice with the same inputs. Instead it will return a cached value.

// You can assume there are 3 possible input functions: sum, fib, and factorial.

// sum accepts two integers a and b and returns a + b. Assume that if a value has already been cached for the arguments (b, a) where a != b, it cannot be used for the arguments (a, b). For example, if the arguments are (3, 2) and (2, 3), two separate calls should be made.
// fib accepts a single integer n and returns 1 if n <= 1 or fib(n - 1) + fib(n - 2) otherwise.
// factorial accepts a single integer n and returns 1 if n <= 1 or factorial(n - 1) * n otherwise.

function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      return cache[key];
    }

    const result = fn.apply(this, args);
    cache[key] = result;

    return result;
  };
}

// 2626. Array Reduce Transformation
// Given an integer array nums, a reducer function fn, and an initial value init, return the final result obtained by executing the fn function on each element of the array, sequentially, passing in the return value from the calculation on the preceding element.

// This result is achieved through the following operations: val = fn(init, nums[0]), val = fn(val, nums[1]), val = fn(val, nums[2]), ... until every element in the array has been processed. The ultimate value of val is then returned.

// If the length of the array is 0, the function should return init.

// Please solve it without using the built-in Array.reduce method.

var reduce = function (nums, fn, init) {
  if (nums.length === 0) return init;
  let val = nums.reduce(function (acc, curr) {
    acc = fn(acc, curr);
    return acc;
  }, init);
  return val;
};

// 2627. Debounce
// Given a function fn and a time in milliseconds t, return a debounced version of that function.

// A debounced function is a function whose execution is delayed by t milliseconds and whose execution is cancelled if it is called again within that window of time. The debounced function should also receive the passed parameters.

// For example, let's say t = 50ms, and the function was called at 30ms, 60ms, and 100ms.

// The first 2 function calls would be cancelled, and the 3rd function call would be executed at 150ms.

// If instead t = 35ms, The 1st call would be cancelled, the 2nd would be executed at 95ms, and the 3rd would be executed at 135ms.

function debounce(fn, t) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    setTimeout(() => fn(...args), t);
  };
}

// 2629. Function Composition
// Given an array of functions [f1, f2, f3, ..., fn], return a new function fn that is the function composition of the array of functions.

// The function composition of [f(x), g(x), h(x)] is fn(x) = f(g(h(x))).

// The function composition of an empty list of functions is the identity function f(x) = x.

// You may assume each function in the array accepts one integer as input and returns one integer as output.

var compose = function (functions) {
  if (functions.length === 0) {
    return function (x) {
      return x;
    };
  }

  return function (x) {
    let result = x;
    for (let i = functions.length - 1; i >= 0; i--) {
      result = functions[i](result);
    }
    return result;
  };
};

// using reduceRight method in array

var compose = function (functions) {
  if (functions.length === 0) {
    return function (x) {
      return x;
    };
  }

  return functions.reduceRight(function (prevFunc, nextFunc) {
    return function (x) {
      return nextFunc(prevFunc(x));
    };
  });
};

// 2631. Group By
// Write code that enhances all arrays such that you can call the array.groupBy(fn) method on any array and it will return a grouped version of the array.

// A grouped array is an object where each key is the output of fn(arr[i]) and each value is an array containing all items in the original array which generate that key.

// The provided callback fn will accept an item in the array and return a string key.

// The order of each value list should be the order the items appear in the array. Any order of keys is acceptable.

// Please solve it without lodash's _.groupBy function.

Array.prototype.groupBy = function (fn) {
  return this.reduce((acc, curr) => {
    const key = fn(curr);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(curr);
    return acc;
  });
};

// 2634. Filter Elements from Array
// Given an integer array arr and a filtering function fn, return a filtered array filteredArr.

// The fn function takes one or two arguments:

// arr[i] - number from the arr
// i - index of arr[i]
// filteredArr should only contain the elements from the arr for which the expression fn(arr[i], i) evaluates to a truthy value. A truthy value is a value where Boolean(value) returns true.

// Please solve it without the built-in Array.filter method.

var filter = function (arr, fn) {
  let filteredArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) {
      filteredArr.push(arr[i]);
    }
  }
  return filteredArr;
};

// 2635. Apply Transform Over Each Element in Array
// Given an integer array arr and a mapping function fn, return a new array with a transformation applied to each element.

// The returned array should be created such that returnedArray[i] = fn(arr[i], i).

// Please solve it without the built-in Array.map method.

var map = function (arr, fn) {
  let transformArr = [];
  for (let i = 0; i < arr.length; i++) {
    transformArr.push(fn(arr[i], i));
  }
  return transformArr;
};

// Write a function retryUntilSuccess(fn, maxRetries, delay) that tries running fn.
// If fn fails (rejects), retry it after delay milliseconds, up to maxRetries times.
// If it still fails after maxRetries, reject the final error.

var retryUntilSuccess = function (fn, maxRetries, delay) {
  return new Promise((resolve, reject) => {
    let tries = 0;
    const attempt = () => {
      fn()
        .then(resolve)
        .catch((error) => {
          tries++;
          if (tries < maxRetries) {
            setTimeout(attempt, delay);
          } else {
            reject(error);
          }
        });
    };
    attempt();
  });
};

// Promise Timeout with Fallback Value
// Write a promiseWithTimeout(fn, t, fallbackValue) that:

// Resolves with fn if it finishes within t milliseconds.

// Otherwise resolves with fallbackValue instead of rejecting.

// Concepts: Promise.race, timeout, fallback strategies.

var promiseWithTimeout = function (fn, t, fallbackValue) {
    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
            resolve(fallbackValue);
        }, t)
        fn().then((result) => {
            clearTimeout(timeout);
            resolve(result);
        })
    })
}

// 3. Throttle Function Calls
// Implement a throttle(fn, t) function.

// fn can only be called once every t milliseconds.

// If called again during the wait, ignore the call.

// ✅ Concepts: limiting how often a function runs (different from debounce).

var throttle = function (fn, t) {
    let lastCall = 0;
    return function (...args) {
        let now = Date.now();
        if (now - lastCall <= t) {
            return;
        }
        lastCall = now;
        return fn(...args);
    }
}

// using setTimeout
var throttle = function (fn, t) {
    let canCall = true;
    return function (...args) {
        if (!canCall) return;
        canCall = false;
        fn(...args);
        setTimeout(() => {
            canCall = true;
        }, t);

    }
}

// 4. Sequential Async Execution
// Write a function that accepts an array of async functions and runs them one after another, waiting for each to finish before starting the next.

// ✅ Concepts: chaining promises, async sequencing.

var runSequentially = function (functions) {
    return functions.reduce((acc, curr) => {
        return acc.then(curr());
    }, Promise.resolve())
}

// 5. Cancelable Promise
// Implement a CancelablePromise(fn) where you can call .cancel() to prevent it from resolving or rejecting.

// ✅ Concepts: promise control, manual cancellation.



// 6. Delay Wrapper
// Implement a delay(fn, ms) function that delays execution of fn by ms milliseconds.

// ✅ Concepts: simple setTimeout and Promise wrapping.

var delay = function (fn, ms) {
    return function (...args) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(fn(...args));
            }, ms);
        })
    }
}

// without promise
function delay(fn, ms) {
    return function (...args) {
        setTimeout(() => {
            fn(...args);
        }, ms);
    };
}
