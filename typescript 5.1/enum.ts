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