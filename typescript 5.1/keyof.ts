// Keyof operator or Operator type T8217T NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// The keyof operator takes an object's type and creates a string or numeric union of its keys. The next type P is similar to type P = "x" | "y" :

type Point = { x: number; y: number };
type P = keyof Point;

// If the type has an index signature of string or number , keyof will return these types instead:

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;
 
type Mapish = { [k: string]: boolean };
type M = keyof Mapish;

// Note that in this example M is string | number - This is because JavaScript object keys are always cast to a string, so obj[0] is always the same as obj["0"] .

// Keyof types become especially useful when combined with mapped types, which we'll learn about later.