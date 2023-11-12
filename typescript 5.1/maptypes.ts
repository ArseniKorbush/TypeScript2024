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