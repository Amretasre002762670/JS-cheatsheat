// Arrays Properties

// 1. length: can return and set the length of the array
var fruits = ["banana", "apple", "orange"];
console.log(fruits.length); // 3

var a = [];
a.length = 3; // sets the length of the array to 3

// 2. prototype: add new properties and methods to array objects
Array.prototype.uCase = function() {
    for (let i = 0; i < this.length; i++) {
        this[i] = this[i].toUpperCase();
    }
}

var fruits = ["banana", "apple", "orange"];
fruits.uCase();
console.log(fruits); // ["BANANA", "APPLE", "ORANGE"]

// Arrays methods

// 1. concat(): merge two or more arrays; returns a new array
var fruits = ["banana", "apple", "orange"];
var vegetables = ["carrot", "potato"];
var food = fruits.concat(vegetables);
console.log(food); // ["banana", "apple", "orange", "carrot", "potato"]

// 2. copyWithin(): copies value from a specified index to another index in the same array
var fruits = ["banana", "apple", "orange", "mango"];
fruits.copyWithin(2, 0);
console.log(fruits); // ["banana", "apple", "banana", "apple"]

// 3. entries(): returns a key/value pair array
var fruits = ["banana", "apple", "orange"];
var f = fruits.entries();
console.log(f);
console.log(f.next().value); // [0, "banana"]

// 4. every(): checks if all elements in an array pass a test
var ages = [32, 33, 16, 40];
function checkAdult(age) {
    return age >= 18;
}
console.log(ages.every(checkAdult)); // false

// 5. fill(): fill the elements in an array with a static value
var fruits = ["banana", "apple"];
fruits.fill("kiwi");

console.log(fruits);

// 6. filter(): creates a new array with all elements that pass the test
var ages = [32, 33, 16, 40];
function checkAdult(age) {
    return age >= 18;
}
var adults = ages.filter(checkAdult);
console.log(adults); // [32, 33, 40]

// 7. find(): returns the value of the first element that passes the test
var ages = [3, 10, 18, 20];
function checkAdult(age) {
    return age >= 18;
}
console.log(ages.find(checkAdult)); // 18

// 8. findIndex(): returns the index of the first element that passes the test
var ages = [3, 10, 18, 20];
function checkAdult(age) {
    return age >= 18;
}
console.log(ages.findIndex(checkAdult)); // 2

// 9. forEach(): calls a function for each array element
var number = [4, 5, 6, 7, 8];

number.forEach(myFunction);

function myFunction(item, index, arr) { 
    arr[index] = arr[index] * 10;
};

console.log(number);

// 10. includes: calls a function for each array element
var fruits = ["banana", "apple", "orange"];

console.log(fruits.includes("banana")); // true

// 11. indexOf(): search the array for an element and returns its position
var fruits = ["banana", "apple", "orange"];
console.log(fruits.indexOf("apple")); // 1

// 12. isArray(): checks whether an object is an array
console.log(Array.isArray(fruits)); // true

// 13. join(): joins all elements of an array into a string
console.log(fruits.join()); // banana,apple,orange

// 14. 





