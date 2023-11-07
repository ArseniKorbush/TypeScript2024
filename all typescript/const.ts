// Const function parameter types
// TypeScript 5.0 added the ability to work with a type that is passed to a generic as with a literal.

// Let's create a function to which we will pass an array of users.

const parseUsers = <T extends {name: string, place: string}, >(users: T[]) => {
    const getUserByName = (name: T['name']) => users.find((user) => user.name === name)
    return getUserByName
  }

// The function returns another function, when called, we will get the user whose name we passed into it.

const getUser = parseUsers([{
    name: "Ilya",
    place: "Krasnodar"
  }, {
    name: "Dmitry",
    place: "Moscow"
  }, {
    name: "Pavel",
    place: "Saint Petersburg"
  }])
  
  const currentUser = getUser("Sergey") 

// And the currentUser variable will be equal to undefined, since we passed the username, which is not in the users array.
// To avoid this problem, TypeScript 5.0 added the ability to use const notation in generic.
// To use it, just add const to the generic parseUsers function.

const parseofUsers = <const T extends {name: string, place: string}, >(users: T[]) => {
    const getUserByName = (name: T['name']) => users.find((user) => user.name === name)
    return getUserByName
  }

// Now, when calling the getUsers function with a username that is not in the users array, TypeScript will give us an error:

const currentUser = getUser("Sergey") 

//  Argument of type '"Sergey"' is not assignable to parameter of type '"Ilya" | "Dmitry" | "Pavel"

// Const enums

// In most cases, enumerations are a perfectly acceptable solution. However, sometimes the requirements become more stringent.
// To avoid the cost of additional generated code and additional indirection when accessing enum values,
// You can use const enums. Const enums are defined using the const modifier in our enums:

const enum Enum {
  A = 1,
  B = A * 2,
}

// Const enums can only use constant enum expressions and, unlike regular enums, they are completely removed at compile time.
// Const enumeration members are embedded in usage sites. This is possible because constant enumerations cannot have computed members.

const enum Direction {
  Up,
  Down,
  Left,
  Right,
}
 
let directions = [
  Direction.Up,
  Direction.Down,
  Direction.Left,
  Direction.Right,
];

// In the generated code it will be

"use strict";
let directions = [
    0 /* Direction.Up */,
    1 /* Direction.Down */,
    2 /* Direction.Left */,
    3 /* Direction.Right */,
];