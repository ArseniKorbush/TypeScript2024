// In TypeScript 5.0, the behavior of enumerations has changed. When an enumeration is created, each of it's keys
// Is assigned a numeric value corresponding to its ordinal number, starting from 0.

enum LogLevel {
    Debug, // 0
    Log, // 1
    Warning, // 2
    Error // 3
  }

// A function that will accept enumeration values and a message.

  const showMessage = (logLevel: LogLevel, message: string) => {
    // code...
  }

// When working with this function, the first parameter we can pass is a numeric value corresponding to the enumeration value.

showMessage(0, 'debug message')
showMessage(2, 'warning message')

// In previous versions of TypeScript, we could pass any numeric value:

showMessage(99, 'anything text…')

// Argument of type '99' is not assignable to parameter of type 'LogLevel' 

// Much better doing this like this

showMessage(LogLevel.Debug, 'debug message')
showMessage(LogLevel.Warning, 'warning message')

// Also in TypeScript 5.0, all enumerations are now treated as concatenated enumerations,
// Which was achieved by creating a unique type for each computed enum value.
// TS 4.9 :
enum FieldName {
    MonthIncome = "monthIncome",
    AdditionalMonthIncome = `additional-${FieldName.MonthIncome}`
    // We get an error:
    // Computed values are not permitted in an enum with string valued members
  }

// Enumerations are used to describe the form of already existing enumeration types.

declare enum Enum {
  A = 1,
  B,
  C = 2,
}

// One important difference between surrounding and non-enclosing enumerations is that in regular enumerations,
// Members that do not have an initializer will be considered constant if the enumeration member
// That precedes them is considered constant. In contrast, a surrounding (and non-const)
// Enumeration member that has no initializer is always considered to be computed.

// In modern TypeScript, an enum may not be needed if an object with as const is enough :

const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}
 
const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;
 
EDirection.Up;
 
ODirection.Up;
 
// Использование перечисления в качестве параметра
function walk(dir: EDirection) {}
 
// Требуется дополнительная строка для извлечения значений
type Direction = typeof ODirection[keyof typeof ODirection];
function run(dir: Direction) {}
 
walk(EDirection.Left);
run(ODirection.Right);

// The biggest argument for this format over TypeScript's enum is that it keeps your codebase
// Consistent with JavaScript state, and when/if enums are added to JavaScript, after which you can move on to additional syntax.

// Each enumeration member has an associated value, which can be constant or calculated. An enumeration member is considered permanent if:

// This is the first member of the enum, and it has no initializer, in which case it is assigned the value 0 :

// E.X constants:

enum E {
  X,
}

// It does not have an initializer, and the previous enumeration member was a numeric constant. 
// In this case, the value of the current enumeration member will be equal to the value of the previous enumeration member plus one.

// E1.E2 constants:

enum E1 {
  X,
  Y,
  Z,
}
 
enum E2 {
  A = 1,
  B,
  C,
}

// An enumeration member is initialized with a constant enumeration expression. A constant enumeration expression is a subset of 
// TypeScript expressions that can be fully evaluated at compile time. An expression is a constant enumeration expression if it:

//      Literal enumeration expression (basically a string or numeric literal)
//      A reference to a previously defined permanent enum member (which may come from another enum)
//      Constant enumeration in parentheses
//      One of the unary operators + , - , ~ applied to a constant enumeration expression
//      + , - , * , / , % , << , >> , >>> , & , | , ^ binary operators with constant enumeration expressions as operands

// This is a compile-time error for constant enumeration expressions, which must evaluate to NaN or Infinity .
// In all other cases, the enumeration member is considered evaluated.

enum FileAccess {
  // постоянные члены
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // вычисляемый элемент
  G = "123".length,
}

// Union Enumerations and Enumeration Member Types

// There is a special subset of constant enumeration members that are not evaluated: literal enumeration members.
// A literal enumeration member is a permanent enumeration member with no initialized value or with values that are initialized

//      any string literal (e.g. Т9837Т, З5657З, А8487А)
//      any numeric literal (e.g. Т8941Т, З4941З)
//      unary minus applied to any numeric literal (e.g. Т7968Т, З7127З)

// When all the members of an enum have literal enum values, some special semantics come into play.

// First of all, enum members become types too! For example, we can say that some members can only have the value of an enum member:

enum ShapeKind {
  Circle,
  Square,
}
 
interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}
 
interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}
 
let c: Circle = {
  kind: ShapeKind.Square,
  radius: 100,
};

// Another change is that enum types effectively become the union of each enum member.
// When using pooled enums, the type system can take advantage of the fact that it knows the exact set
// Of values that exist in the enumeration itself. Because of this, TypeScript can catch errors that may cause us to compare values incorrectly. For example:

enum E {
  Foo,
  Bar,
}
 
function f(x: E) {
  if (x !== E.Foo || x !== E.Bar) {
    //
  }
}

// In this example, we first checked to see if x is E.Foo . If this check is successful,
// Then our || a short circuit will occur and the ‘if’ body will work. However, if the check fails,
// Then x can only be E.Foo , so there is no point in checking whether it is equal to E.Bar.

// Enumerations are real objects that exist at runtime. For example, the following listing

enum B {
  X,
  Y,
  Z,
}

// Can actually be passed to functions

function f(obj: { X: number }) {
  return obj.X;
}
 
// Works because 'E' has a property 'X' which is a number.
f(E);

// Even though Enums are real objects that exist at runtime, the keyof keyword works differently than you would expect for typical objects.
// Instead, use keyof typeof to get a type that represents all the Enum's keys as strings.

enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}
 
/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;
 
function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];
  if (num <= LogLevel.WARN) {
    console.log("Log level key is:", key);
    console.log("Log level value is:", num);
    console.log("Log level message is:", message);
  }
}
printImportant("ERROR", "This is a message");