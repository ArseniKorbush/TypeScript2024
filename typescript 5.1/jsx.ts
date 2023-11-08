// JSX is an XML-like embeddable syntax. It is intended to be converted to actual JavaScript, 
// Although the semantics of this conversion are implementation dependent. JSX gained popularity with the React framework,
// But has seen other implementations since then. TypeScript supports inlining, type checking, and compiling JSX directly into JavaScript.

// Basic usage
// To use JSX you need to do two things :

// Name your files with a .tsx extension.
// Enable the jsx option.

// TypeScript comes with three JSX modes: preserve, react, and react-native. These modes only affect
// The generation stage—type checking is not affected. The preserve mode will preserve the JSX
// As part of the output for later use in another transformation step (e.g. T9694T). Additionally, the output will have a 
// Jsx file extension. react mode will generate React.createElement , does not require JSX conversion before use, and the
// Output will have a .js file extension. react-native mode is equivalent to preserve mode in that it preserves all JSX,
// But the output will have a .js file extension instead.

// Operator Т3416Т

const foo = <foo>bar;

// This states that the variable bar is of type foo . Since TypeScript also uses angle brackets for type statements,
// Combining them with JSX's syntax can lead to certain parsing difficulties. As a result, TypeScript prohibits angle bracket type assertions in .tsx files.
// Because the above syntax cannot be used in .tsx files, an alternative type assertion operator must be used: as. 
// The example can be easily rewritten using the as operator.

const foo = bar as foo;

// The as operator is available in both .ts and .tsx files, and its behavior is identical to the angle bracket assertion style.