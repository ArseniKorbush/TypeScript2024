type FormFields = "name" | "surname" | "age";

const data: Record<FormFields, number | string> = {
    name: "name",
    surname: "surname",
    age: 21,
}

const newAge = data.age * 2;
const nameUpperCase = data.name.toUpperCase();

The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type. 


Property 'toUpperCase' does not exist on type 'string | number'.
Property 'toUpperCase' does not exist on type 'number'.

// Use satisfies

type FormFields = "name" | "surname" | "age";

const data = {
    name: "name",
    surname: "surname",
    age: 21,
} satisfies Record<FormFields, string | number>

const newAge = data.age * 2;
const nameUpperCase = data.name.toUpperCase();

// The satisfies operator can also be used to catch some errors. 
// For example, to check objects for keys matching a given type.

type FormFields = "name" | "surname" | "age";


const data = {
    name: "name",
    surname: "surname",
    age: 21,
    passport: {}
} satisfies Record<FormFields, string | number>