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

// Almost every modern Node.js library falls into a family of modules. These types of libraries only work
// in a JS environment with a module loader. For example, express only works in Node.js and must be loaded using the CommonJS require function.

// ECMAScript 2015 (also known as ES2015, ECMAScript 6 and ES6), CommonJS and RequireJS have similar module import ideas.
//  In JavaScript CommonJS (Node.js), for example, you would write

var fs = require("fs");

// In TypeScript or ES6, the import keyword serves the same purpose:

import * as fs from "fs";

// Typically you'll see that modular libraries include one of these lines in their documentation:

var someLib = require("someLib");

or

define(..., ['someLib'], function(someLib) {

});

// As with global modules, you can see these examples in the documentation of a UMD module, so be sure to check the code or documentation.

// Identifying a Library module by code NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Modular libraries usually have at least some of the following characteristics:

// Unconditional calls to require or define
// Declarations like import * as a from 'b'; or export c;
// Destinations for exports or module.exports

// They rarely have:
// Assigning window or global properties
// Templates for modules

// There are four templates available for modules: module.d.ts, module-class.d.ts, module-function.d.ts and module-plugin.d.ts.

// You should read module.d.ts first to get a general idea of how they all work.

// Then use the module-function.d.ts template if your module can be called as a function:

const x = require("foo");
// Note: call 'x' as a function
const y = x(42);

// Use the module-class.d.ts template if your module can be built using new :

const x = require("bar");
// Note: using the new operator on an imported variable
const y = new x("hello");

// If you have a module that makes changes to other modules when imported, use the module-plugin.d.ts template:

const jest = require("jest");
require("jest-matchers-files");

// Global Libraries NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// A global library is one that can be accessed from the global scope (i.e. without using any form of import ). 
// Many libraries simply provide one or more global variables for use. For example, if you were using jQuery, the $ variable can be used by simply referencing it:

$(() => {
   console.log("hello!");
});

// Typically in the global library documentation you will find instructions for using library in an HTML script tag:

<script src="http://a.great.cdn.for/someLib.js"></script>

// Today, the most popular and globally available libraries are actually referred to as UMD libraries (see below). 
// The UMD library documentation is difficult to distinguish from the global library documentation.
// Before writing a global declaration file, make sure library is not actually UMD.

// Identification of the global Library by code NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// The global library code is usually extremely simple. The global “Hello, world” library might look like this:

function createGreeting(s) {
   return "Hello, " + s;
}

// or like this:

// Web
window.createGreeting = function (s) {
   return "Hello, " + s;
};

// Node
global.createGreeting = function (s) {
   return "Hello, " + s;
};

// Potentially any runtime
globalThis.createGreeting = function (s) {
   return "Hello, " + s;
};

// When looking through the global library code, you typically see:

//      Top-level var statements or function declarations.
//      One or more assignments to window.someName .
//      Assumptions about the existence of DOM primitives such as document or window.

// You won't see:

//   Checks for the presence or use of module loaders such as require or define .
//   CommonJS/Node.js-style import form var fs = require("fs");
//   Calls to number define(...)
//   Documentation describing how to use require or import library .

// Global Libraries Overview NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Trend towards UMD Libraries: Most popular libraries have shifted away from the global style due to ease of converting them into UMD libraries.
// However, smaller libraries or those with no dependencies and requiring a DOM may still utilize the global style.

// Global Library Template:

//   The file global.d.ts presents the myLib example.
//   Cautionary note: Refer to the "Preventing Name Conflicts" footnote for considerations.

// UMD Modules NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// UMD Definition: UMD modules are versatile, functioning as either a module via 'import' or a global module in environments without a loader module.
// Node.js or RequireJS: Usage involves importing as :

import moment = require("moment");
console.log(moment.format());

// Vanilla Browser Environment: Directly use functions as in 

console.log(moment.format());

// Examples of Noteworthy Libraries:

// Moment.js: An instance of a popular library utilizing the UMD approach for its implementation.

// UMD library identification NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// UMD modules checks for the presence of a module loader environment. It's an easy-to-see pattern that looks something like this:

(function (root, factory) {
   if (typeof define === "function" && define.amd) {
       define(["libName"], factory);
   } else if (typeof module === "object" && module.exports) {
       module.exports = factory(require("libName"));
   } else {
       root.returnExports = factory(root.libName);
   }
}(this, function (b) {

// If you see tests for typeof define , typeof window , or typeof module in library code, especially at the top of the file, it is almost always a UMD library.

// The documentation for UMD libraries also often demonstrates “Using in a Node.js example” showing require,
// And “Using in a browser example” showing using the <script> tag to load a script.
// The most popular libraries are now available in UMD packages. Examples include jQuery, Moment.js, lodash and many others.

// Consuming Dependencies NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Your library can have several types of dependencies. This section shows how to import them into a declaration file.
// Dependencies on Global Libraries

// If your library depends on the global library , use the // <reference types="..." /> directive:

/// <reference types= "someLib" />

function getThing(): someLib.thing;

// Module Dependencies

// If your library depends on a module, use the import statement:

import * as moment from "moment";

function getThing(): moment;

// Dependencies on UMD libraries NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// From Global Library

// If your global library depends on the UMD module, use the /// <reference types directive:

/// <reference types= "moment" />

function getThing(): moment;

// From a UMD or Library module

// If your module or UMD library depends on the UMD library, use the import statement:

import * as someLib from "someLib";

// Do not use the /// <reference directive to declare a dependency on the UMD library!