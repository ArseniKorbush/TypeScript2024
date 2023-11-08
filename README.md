# New features of Typescript 2024

## The 'using' keyword can be used to dispose of something using the Symbol.dispose function when it leaves the scope.

{
  const getResource = () => {
    return {
      [Symbol.dispose]: () => {
        console.log('Hooray!')
      }
    }
  }
  using resource = getResource();
} // 'Hooray!

using will be extremely useful for managing resources such as file handlers, database connections, etc.

# Symbol.dispose

Symbol.dispose is a new global symbol in JavaScript. Anything that has a function assigned to Symbol.dispose will be considered a "resource" - "an object with a defined lifetime" - and can be used with the using keyword.

const resource = {
  [Symbol.dispose]: () => {
    console.log("Hooray!");
  },
};

# await using

You can also use Symbol.asyncDispose and await to work with resources that need to be disposed of asynchronously.

const getResource = () => ({
  [Symbol.asyncDispose]: async () => {
    await someAsyncFunc();
  },
});
{
  await using resource = getResource();
}

As a result, the Symbol.async Dispose function will wait before the program continues.
This will be useful for resources such as database connections where you need to ensure that the connection is closed before the program continues.

# File management

Accessing the file system through file handlers in node can be significantly easier with using.
* Without using:

import { open } from "node:fs/promises";
let filehandle;
try {
  filehandle = await open("thefile.txt", "r");
} finally {
  await filehandle?.close();
}

* With using:

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

# Database connections

* Without using:

const connection = await getDb();
try {
  // Делаем что-нибудь с connections
} finally {
  await connection.close();
}

* With using:

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

## Embedding enumeration values is not difficult at first glance, but it has some subtleties. These pitfalls only apply to const environment enums (basically const enums in .d.ts files) and sharing them between projects, but if you publish or use .d.ts files, these pitfalls probably apply to you since tsc --declaration converts .ts files to .d.ts files :

* For reasons stated in the isolatedModules documentation, this mode is fundamentally incompatible with surrounding constants. This means that if you publish const environment enums, subsequent consumers will not be able to use isolatedModules and those enum values at the same time.
* You can easily inline the values from version A of a dependency at compile time and import version B at runtime. Version A and B enums can have different meanings if you're not very careful, leading to surprising bugs like you're taking the wrong branches of if statements. These errors are especially dangerous because automated tests typically run around the same time projects are built, with the same versions of dependencies, which misses these errors entirely.
* ImportsNotUsedAsValues: "preserve" will not prevent the import of const enums used as values, but surrounding const enums do not guarantee the existence of .js files at runtime. Unresolved imports cause run-time errors. The usual way to explicitly exclude imports, type-only imports , does not allow const enum values , for now.

# Here are two approaches to help avoid these mistakes: 

Don't use constant enums at all. You can easily T8318T using a linter. Obviously this avoids any problems with const enums, but it prevents your project from embedding its own enums. Unlike inlining enumerations from other projects, inlining a project's own enumerations is hassle-free and has a performance impact. B. Don't publish const environment enums by deconstituting them with preserveConstEnums . This is exactly the approach used within the TypeScript project itself. preserveConstEnums produces the same JavaScript for const enums as it does for simple enums. You can then safely remove the const modifier from .d.ts files in a build step.

## Таким образом, последующие потребители не будут встраивать перечисления из вашего проекта, избегая описанных выше ошибок, но проект все равно может встраивать свои собственные перечисления, в отличие от полного запрета константных перечислений. 