// NaN is a special numeric value that stands for “Not A Number”.
// The result of comparing a numeric value or NaN itself with NaN will be false.

console.log(0 === NaN)       // false
console.log(0 == NaN)        // false
console.log(NaN === NaN)    // false
console.log(NaN == NaN)     // false

// The best solution to check if a value is NaN is to use the static isNaN method of the Number class.

console.log(Number.isNaN(0))      // false
console.log(Number.isNaN(NaN))   // true

// TS 4.9
// When directly comparing a value with NaN, TypeScript throws an error:

This condition will always return 'false' 
Did you mean 'Number.isNaN(...)'?