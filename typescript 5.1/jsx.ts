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

// Operator Т3416Т NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const foo = <foo>bar;

// This states that the variable bar is of type foo . Since TypeScript also uses angle brackets for type statements,
// Combining them with JSX's syntax can lead to certain parsing difficulties. As a result, TypeScript prohibits angle bracket type assertions in .tsx files.
// Because the above syntax cannot be used in .tsx files, an alternative type assertion operator must be used: as. 
// The example can be easily rewritten using the as operator.

const foo = bar as foo;

// The as operator is available in both .ts and .tsx files, and its behavior is identical to the angle bracket assertion style.

// Type Checking NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// To understand type checking with JSX, you must first understand the difference between internal elements and value-based elements.
// Given the JSX <expr /> expression, expr can either refer to something native to the environment
// (e.g. a div or span in the DOM environment) or to a custom component you created. This is important for two reasons:

// In React, internal elements are created as strings ( React.createElement("div") ), while the component you create is not ( React.createElement(MyComponent) ).
// The types of attributes passed in the JSX element must be looked for differently.
// An element's internal attributes must be known internally, whereas components will likely want to specify their own set of attributes.

// TypeScript uses the same convention that React does to differentiate them.
// An inner element always starts with a lowercase letter, and a value-based element always starts with an uppercase letter.

// Intrinsic elements NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Internal elements are viewed using a special interface, JSX.IntrinsicElements. By default, if this interface
// Is not specified, then everything works and internal elements will not be type checked. However, if this interface is present,
// Then the name of the inner element is treated as a property of the JSX.IntrinsicElements interface. For example:

declare namespace JSX {
    interface IntrinsicElements {
      foo: any;
    }
  }
  
  <foo />; // ok
  <bar />; // error

// In the example above, <foo /> will work fine, but <bar /> will throw an error since it is not specified in JSX.IntrinsicElements . 

declare namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }

// Value-based elements NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Value-based elements are simply looked up by IDs that are in scope.

import MyComponent from "./myComponent";

<MyComponent />; // ok
<SomeOtherComponent />; // error


// There are two ways to define an element based on value:

//    Functional Component (FC)
//    Class Component

// Because these two value-based element types are indistinguishable from each other in a JSX expression,
// TS first attempts to resolve the expression as a functional component using overload resolution. If the process succeeds,
// The TS completes converting the expression to its declaration. If a value cannot be resolved as a function component,
// TS will try to resolve it as a class component. If this fails, TS will report an error.

// Function Component NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// As the name suggests, a component is defined as a JavaScript function where its first argument is a props object.
// TS requires that the return type be assigned to JSX.Element.

interface FooProp {
  name: string;
  X: number;
  Y: number;
}

declare function AnotherComponent(prop: { name: string });
function ComponentFoo(prop: FooProp) {
  return <AnotherComponent name={prop.name} />;
}

const Button = (prop: { value: string }, context: { color: string }) => (
  <button />
);

// Since a function component is simply a JavaScript function, function overloads can be used here as well:

interface ClickableProps {
  children: JSX.Element[] | JSX.Element;
}
 
interface HomeProps extends ClickableProps {
  home: JSX.Element;
}
 
interface SideProps extends ClickableProps {
  side: JSX.Element | string;
}
 
function MainButton(prop: HomeProps): JSX.Element;
function MainButton(prop: SideProps): JSX.Element;
function MainButton(prop: ClickableProps): JSX.Element {
  // ...
}

// Note. Functional components were formerly called stateless functional components (SFC).
// Because functional components can no longer be considered stateless in recent versions of react,
// The SFC type and its alias StatelessComponent have been deprecated.

// Class Component NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// You can determine the type of a class component. However, to do this, it's best to understand two new terms: element class type and element instance type.
// Given <Expr />, the class type of the element is the type Expr. So, in the above example, 
// If MyComponent were an ES6 class, the type of the class would be the constructor and static class of that class.
// If MyComponent were a factory drop, the class type would be this function.

// Once the class type is established, the instance type is determined by the union of the return types of the class type
// Construct or call signatures (whichever is present). So again, in the case of an ES6 class instance, the type of the instance 
// Of that class will be the type of the instance of that class, and in the case of a factory function, that type will be the return value of the slowdown.

class MyComponent {
  render() {}
}

// use the design signature
const myComponent = new MyComponent();

// element class type => MyComponent
// element instance type => { render: () => void }

function MyFactoryFunction() {
  return {
    render: () => {},
  };
}

// use call signature
const myComponent = MyFactoryFunction();

// element class type => MyFactoryFunction
// element instance type => { render: () => void }

// The interesting thing about the element instance type is that it must be assigned to JSX.ElementClass or it will throw an error.
// By default, JSX.ElementClass is {} , but it can be extended to limit the use of JSX to only those types that conform to the appropriate interface.

declare namespace JSX {
  interface ElementClass {
    render: any;
  }
}

class MyComponent {
  render() {}
}
function MyFactoryFunction() {
  return { render: () => {} };
}

<MyComponent />; // ok
<MyFactoryFunction />; // ok

class NotAValidComponent {}
function NotAValidFactoryFunction() {
  return {};
}

<NotAValidComponent />; // error
<NotAValidFactoryFunction />; // error

// Attribute Type Check NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// The first step in checking attribute types is to determine the element's attribute type. It's a little different between intrinsic and value elements.
// For internal elements, this is the property type JSX.IntrinsicElements.

declare namespace JSX {
  interface IntrinsicElements {
    foo: { bar?: boolean };
  }
}

// element attribute type for 'foo' is '{bar ?: boolean}'
<foo bar />;

// For value-based elements, things are a little more complicated. It is determined by the type of the element instance type property 
// That was previously defined. Which property to use is determined by JSX.ElementAttributesProperty . It must be declared with one property.
// The name of this property is then used. Starting with TypeScript 2.8, if JSX.ElementAttributesProperty is not specified, the type
// Of the first parameter of the class element constructor or function bean call will be used instead.

declare namespace JSX {
  interface ElementAttributesProperty {
    props; // specify the name of the property that we will use
  }
}

class MyComponent {
  // specify the element instance type property
  props: {
    foo?: string;
  };
}

// element attribute type for 'MyComponent' is '{foo ?: string}'
<MyComponent foo="bar" />;

// The element attribute type is used to check the type of attributes in JSX. Optional and required properties are supported.

declare namespace JSX {
  interface IntrinsicElements {
    foo: { requiredProp: string; optionalProp?: number };
  }
}

<foo requiredProp="bar" />; // ok
<foo requiredProp="bar" optionalProp={0} />; // ok
<foo />; // error, requiredProp is missing
<foo requiredProp={0} />; // error, requiredProp must be a string
<foo requiredProp="bar" unknownProp />; // error, unknownProp does not exist
<foo requiredProp="bar" some-unknown-prop />; // ok because "some-unknown-prop" is not a valid identifier

// ! Warning below

// If the attribute name is not a valid JS identifier (for example, data-* attribute ), 
// It is not considered an error unless it is found in the element's attribute type.

// Additionally, the JSX.IntrinsicAttributes interface can be used to specify additional properties used by the JSX framework 
// That are not typically used by props or components' arguments—for example, key in React. To specialize further, 
// The generic type JSX.IntrinsicClassAttributes<T> can also be used to specify additional attributes of the same type 
// Only for class components (and not for the Components function). In this type, the general parameter corresponds to the type of the class instance.
// In React, this is used to resolve the ref attribute of type Ref<T> . Generally speaking, all properties of these interfaces should be optional,
// Unless you expect users of your JSX platform to need to provide some attribute on a per-tag basis.

// The spread operator also works:

const props = { requiredProp: "bar" };
<foo {...props} />; // ok

const badProps = {};
<foo {...badProps} />; // error

// Checking the type of children NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// TypeScript 2.3 introduced type checking for child elements in TS. Children is a special property in an element's attribute type
// Where the JSXExpressions child element is used to insert into attributes. Just as TS uses 
// JSX.ElementAttributesProperty to define the name of a prop, TS uses JSX.ElementChildrenAttribute
// To define the names of the child elements in those props. JSX.ElementChildrenAttribute should be declared with a single property.

declare namespace JSX {
  interface ElementChildrenAttribute {
    children: {}; // specify the name of the child element that we will use
  }
}

// <div>
//   <h1>Hello</h1>
// </div>;

// <div>
//   <h1>Hello</h1>
//   World
// </div>;

const CustomComp = (props) => <div>{props.children}</div>
<CustomComp>
  <div>Hello World</div>
  {"This is just a JS expression..." + 1000}
</CustomComp>

// You can specify the type of child elements just like any other attribute. 
// This will override the default type e.g . React typings if you use them.

interface PropsType {
  children: JSX.Element
  name: string
}

class Component extends React.Component<PropsType, {}> {
  render() {
    return (
      <h2>
        {this.props.children}
      </h2>
    )
  }
}

// OK
<Component name="foo">
  <h1>Hello World</h1>
</Component>

// Error: children are of type JSX.Element, not an array of JSX.Element
<Component name="bar">
  <h1>Hello World</h1>
  <h2>Hello World</h2>
</Component>

// Error: Children are of type JSX.Element, not a JSX.Element array or string.
<Component name="baz">
  <h1>Hello</h1>
  World
</Component>

// Result type JSX NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// By default, the result of a JSX expression is typed as any. You can customize the type by specifying the JSX.Element interface.
// However, it is not possible to obtain type information about the JSX element, attributes, or child elements from this interface. This is a black box.

// Embedding Expressions NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// JSX allows you to insert expressions between tags by enclosing the expressions in curly braces ( { } ).

const a = (
  <div>
    {["foo", "bar"].map((i) => (
      <span>{i / 2}</span>
    ))}
  </div>
);

// The above code will throw an error because you can't split a string by a number. The output when using the preserve option looks like this:

const a = (
  <div>
    {["foo", "bar"].map(function (i) {
      return <span>{i / 2}</span>;
    })}
  </div>
);