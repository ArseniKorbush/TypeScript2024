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

