// Library Structures NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// In general terms, the way the declaration file is structured depends on how the library is used.
// There are many ways to offer a library for consumption in JavaScript, and you will need to write a declaration file to match this.
// This tutorial explains how to identify common library patterns and how to write declaration files that match that pattern.

// Each type of basic library structuring template has a corresponding file in the Templates section.
// You can start with these templates that will help you work faster.

// Definition of Libraries types NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// First we'll look at the TypeScript libraries declaration file types. 
// We'll briefly show how each type of library is used, how it's written, and give some real-world examples of libraries.

// Defining the structure of a library is the first step in writing its declaration file.
// We'll give hints on how to identify a structure based on both its usage and its code.
// Depending on the documentation and organization of the library, one may be simpler than the other. We recommend using the one that is more convenient for you.

// What should you look for?

// A question to ask yourself when looking at the library you are trying to print.

//      How to get the library?

//      For example, is it possible to get it only through npm or only from CDN?

//      How would you import it?

//      Does it add a global object? Are require or import/export statements used?

// Smaller samples for different types of T1721T
// Modular Libraries

// Almost every modern Node.js library falls into a family of modules. These types of libraries only work in a JS environment with a module loader. For example, express only works in Node.js and must be loaded using the CommonJS require function.

// ECMAScript 2015 (also known as ES2015, ECMAScript 6 and ES6), CommonJS and RequireJS have similar module import ideas. In JavaScript CommonJS (Node.js), for example, you would write

var fs = require("fs");

// In TypeScript or ES6, the import keyword serves the same purpose:

import * as fs from "fs";

// Typically you'll see that modular libraries include one of these lines in their documentation:

var someLib = require("someLib");

or

define(..., ['someLib'], function(someLib) {

});

// As with global modules, you can see these examples in the documentation of a UMD module, so be sure to check the code or documentation.