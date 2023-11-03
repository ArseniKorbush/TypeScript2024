type AutocompleteDefaultOption = {
    data: unknown,
    value: string
  }
  
  type AutocompleteCustomOption = {
    inputValue: string,
    data: unknown
  }
  
  type AutocompleteOption = AutocompleteCustomOption | AutocompleteDefaultOption
  
  const getOption = (option: AutocompleteOption) => {
    if("inputValue" in option) {
      option // type AutocompleteCustomOption
    }
  }
  
// Suppose there is an object that comes from the server SENYA

type ServerResponse = unknown

const response: ServerResponse = {
  name: "name",
  surname: "surname",
}

if(response && typeof response === 'object' && 'name' in response) {
  const name = response.name
}

// When working with it, we check for the presence of the property that interests us, 
// And if this property exists, then we execute the instructions contained in the if block.
// In older versions of TypeScript, the response is cast to type object, and shows this error.

Property 'name' does not exist on type 'object'


if(response && typeof response === 'object' && 'name' in response) {
    const name = (response as any).name
  }

//  But it is not recommended to do this, as this may negatively affect the security of the project.

// When testing for the presence of a property via the in operator, TypeScript narrows the right operand to:

object & Record<"название свойства", unknown>

if(response && typeof response === 'object' && 'name' in response) {
    const name = response.name // name: unknown
  }

// Thanks to this feature, we can use this construct without converting the response object.