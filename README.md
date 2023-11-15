## New features of Typescript 2024 🥇

Welcome to my project showcasing the new features added to TypeScript 2024. In this project you will find examples of using all the new features of the language => keywords, operators, functions, performance, changes to previous features.

### Below I will describe the file hierarchy using `Ctrl+F` the name of the feature you wanna study! 🐤

- `TypeScript2024/`: typescript 4.9, 5.0, 5.1, 5.2, 5.3;
- `using.ts`: File demonstrating how to use the `keyword` click there.
- `enum.ts`: Benefits and how to improve your experience with `enum` click there.
- `jsx.ts`: Improved work, new types, bug fixes and support in the `jsx` click there.
- `satisfies.ts`: File demonstrating how to use the operator `satisfies` click there.
- `accessor.ts`: New modifier, types and improved type checking in `accessor` click there.
- `const.ts`: Parameters of `const` types in the declaration of types, conditional and index types click there.
- `decorators.ts`: Decorator metadata, named and anonymous tuple elements, `decorators` for constructor parameters click there.
- `in.ts`: Big changes to operator types `in` click there.
- `NaN.ts`: Checking for equality in conditional, index types and checking for narrowing types by the presence of properties `Nan` click there.

### readonly no longer required when checking if arrays satisfy as const
In TypeScript 5.2, this code would throw an error:
```JS
const array = [] as const satisfies string[];
// Type 'readonly []' does not satisfy the expected type 'string[]'.
```

This would go away if you added a `readonly` modifier to `string[]`:
```JS
const array = [] as const satisfies readonly string[];
```

But this is a bit annoying. Since we're already specifying `as const`, it feels redundant to also add `readonly`.

### switch(true) will be narrowed properly
`switch(true)` is a popular way to express complicated if/else in TypeScript. It lets you achieve a pattern-matching-like syntax:
```JS
function getNodeDescriptionSwitch(node: Node) {
  switch (true) {
    case isArrayLiteralExpression(node):
    case isObjectLiteralExpression(node):
      return "Array or object";
    case isBigIntLiteral(node):
    case isNumericLiteral(node):
      return "Numberish";
    case isNoSubstitutionTemplateLiteral(node):
    case isRegularExpressionLiteral(node):
    case isStringLiteral(node):
    case isTemplateLiteral(node):
      return "Stringlike";
    default:
      return "Some sort of node";
  }
}
```

The unfortunate thing about this pattern is that TypeScript wouldn't do any narrowing in the `case` statements.
```JS
function handleStringOrNumber(value: string | number) {
  switch (true) {
    case typeof value === "string":
      // Error: value is still string | number
      return value.toUpperCase();
    case typeof value === "number":
      // Error: value is still string | number
      return value.toFixed(2);
  }
}
```
### Import Attributes
TypeScript 5.3 supports the latest updates to the import attributes proposal.

One use-case of import attributes is to provide information about the expected format of a module to the runtime.

```JS
// We only want this to be interpreted as JSON,
// not a runnable/malicious JavaScript file with a `.json` extension.
import obj from "./something.json" with { type: "json" };
```

The contents of these attributes are not checked by TypeScript since they’re host-specific, and are simply left alone so that browsers and runtimes can handle them (and possibly error).
```JS
// TypeScript is fine with this.
// But your browser? Probably not.
import * as foo from "./foo.js" with { type: "fluffy bunny" };
```
Dynamic `import()` calls can also use import attributes through a second argument.
```JS
const obj = await import("./something.json", {
    with: { type: "json" }
});
```
The expected type of that second argument is defined by a type called `ImportCallOptions`, which by default just expects a property called `with`.

Evolution from Import Assertions to Import Attributes :

* Transition from `import assertions`: Import attributes have evolved from the earlier concept of "import assertions" introduced in TypeScript 4.5.
* Main Differences:
  * Keyword Change: The prominent alteration is the shift from using the `assert` keyword to the `with` keyword.
  * Expanded Functionality: `Import attributes` grant runtimes the freedom to employ attributes to direct the resolution and interpretation of import paths. In         contrast, import assertions could only assert certain characteristics after loading a module.
* Deprecation of Old Syntax: TypeScript will phase out the old syntax for import assertions in favor of the proposed import attributes syntax.
* Migration Guidelines:
  * Existing Code: Code using `assert` should migrate towards utilizing the `with` keyword.
  * New Code: For new code requiring import attributes, the exclusive choice should be the `with` keyword.
* Acknowledgments: Special thanks to `Oleksandr Tarasiuk` for implementing the proposal. Additionally, recognition is given to `Wenlu Wang` for their work on import assertions.

### The 'using'
Using is a new keyword that lets us declare new fixed bindings, kind of like const . The key difference is that variables declared with using get their Symbol. dispose method called at the end of the scope!

Keyword can be used to dispose of something using the Symbol.dispose function when it leaves the scope.
```JS
{
  const getResource = () => {
    return {
      [Symbol.dispose]: () => {
        console.log('SENYA!')
      }
    }
  }
  using resource = getResource();
} // 'SENYA!

using will be extremely useful for managing resources such as file handlers, database connections, etc.
```

### Symbol.dispose
Symbol.dispose is a new global symbol in JavaScript. Anything that has a function assigned to Symbol.dispose will be considered a "resource" - "an object with a defined lifetime" - and can be used with the using keyword.
```JS
const resource = {
  [Symbol.dispose]: () => {
    console.log("SENYA!");
  },
};
```

### await using

You can also use Symbol.asyncDispose and await to work with resources that need to be disposed of asynchronously.
```JS
const getResource = () => ({
  [Symbol.asyncDispose]: async () => {
    await someAsyncFunc();
  },
});
{
  await using resource = getResource();
}
```

As a result, the Symbol.async Dispose function will wait before the program continues.
This will be useful for resources such as database connections where you need to ensure that the connection is closed before the program continues.

### File management

Accessing the file system through file handlers in node can be significantly easier with using.
* Without using:
```JS
import { open } from "node:fs/promises";
let filehandle;
try {
  filehandle = await open("thefile.txt", "r");
} finally {
  await filehandle?.close();
}
```
* With using:
```JS
import { open } from "node:fs/promises";
const getFileHandle = async (path: string) => {
  const filehandle = await open(path, "r");
  return {
    filehandle,
    [Symbol.asyncDispose]: async () => {
      await filehandle.close();
    },
  };
};
{
  await using file = await getFileHandle("thefile.txt");
  // doing smt with file.filehandle
} // automatically disposed of!
```
### Database connections

* Without using:
```JS
const connection = await getDb();
try {
  // Doing smt with connections
} finally {
  await connection.close();
}
```
* With using:
```JS
const getConnection = async () => {
  const connection = await getDb();
  return {
    connection,
    [Symbol.asyncDispose]: async () => {
      await connection.close();
    },
  };
};
{
  await using db = await getConnection();
  // doint smt with db.connection
} // automatically closed!
```
### Examples
Embedding enumeration values is not difficult at first glance, but it has some subtleties. These pitfalls only apply to const environment enums (basically const enums in .d.ts files) and sharing them between projects, but if you publish or use .d.ts files, these pitfalls probably apply to you since tsc --declaration converts .ts files to .d.ts files :

* For reasons stated in the isolatedModules documentation, this mode is fundamentally incompatible with surrounding constants. This means that if you publish const environment enums, subsequent consumers will not be able to use isolatedModules and those enum values at the same time.
* You can easily inline the values from version A of a dependency at compile time and import version B at runtime. Version A and B enums can have different meanings if you're not very careful, leading to surprising bugs like you're taking the wrong branches of if statements. These errors are especially dangerous because automated tests typically run around the same time projects are built, with the same versions of dependencies, which misses these errors entirely.
* ImportsNotUsedAsValues: "preserve" will not prevent the import of const enums used as values, but surrounding const enums do not guarantee the existence of .js files at runtime. Unresolved imports cause run-time errors. The usual way to explicitly exclude imports, type-only imports , does not allow const enum values , for now.

## Here are two approaches to help avoid these mistakes: 

Don't use constant enums at all. You can easily `T8318T` using a linter. Obviously this avoids any problems with const enums, but it prevents your project from embedding its own enums. Unlike inlining enumerations from other projects, inlining a project's own enumerations is hassle-free and has a performance impact. B. 

Don't publish const environment enums by deconstituting them with preserveConstEnums . This is exactly the approach used within the TypeScript project itself. preserveConstEnums produces the same JavaScript for const enums as it does for simple enums. You can then safely remove the const modifier from .d.ts files in a build step.

## Launch of the project
To run the project, simply open index.html in your browser.