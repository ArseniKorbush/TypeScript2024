// Mapped Types NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// If you don't want to repeat yourself, sometimes a type should be based on another type.

// Mapped types are based on index signature syntax, which is used to declare property types that have not been declared beforehand:

type OnlyBoolsAndHorses = {
    [key: string]: boolean | Horse;
  };
   
  const conforms: OnlyBoolsAndHorses = {
    del: true,
    rodney: false,
  };

// A mapped type is a generic type that uses a PropertyKey union (often created via a keyof ) to iterate over the keys to create the type:

type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
  };

// In this example, Options Flags will take all properties of Type and change their values to boolean values.

type Features = {
    darkMode: () => void;
    newUserProfile: () => void;
  };
   
  type FeatureOptions = OptionsFlags<Features>;

// Mapping Modifiers NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// There are two additional modifiers that can be applied during matching: readonly and ? , which affect variability and optionality, respectively.

// You can remove or add these modifiers by adding a - or + prefix. If you don't add a prefix, + is assumed.

// Removes read-only attributes from type properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;

// Removes optional attributes from type properties
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
 
type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};
 
type User = Concrete<MaybeUser>;

// Reassigning keys via as NEW TOPIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// In TypeScript 4.1 and later, you can reassign keys in mapped types using the as clause in the mapped type:

type MappedTypeWithNewProperties<Type> = {
     [Properties in keyof Type as NewKeyType]: Type[Properties]
}

// You can use functions like template literal types to create new property names based on previous ones:

type Getters<Type> = {
     [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};
 
interface Person {
     name: string;
     age:number;
     location: string;
}
 
type LazyPerson = Getters<Person>;

// You can filter the keys by creating never using a conditional type:

// Remove the 'kind' property
type RemoveKindField<Type> = {
     [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};
 
interface Circle {
     kind: "circle";
     radius: number;
}
 
type KindlessCircle = RemoveKindField<Circle>;

// You can display arbitrary joins, not just string | number | symbol , but also unions of any type:

type EventConfig<Events extends { kind: string }> = {
     [E in Events as E["kind"]]: (event: E) => void;
}
 
type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };
 
type Config = EventConfig<SquareEvent | CircleEvent>

// Further Exploration

// Mapped types work well with other functions in this type manipulation section,
// For example here's a mapped type using a conditional type that returns either true or false
// Depending on whether the object has the pii property set to the literal true :

type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};
 
type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};
 
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;

// Result - type ObjectsNeedingGDPRDeletion = {
//   id: false;
//   name: true;
// }