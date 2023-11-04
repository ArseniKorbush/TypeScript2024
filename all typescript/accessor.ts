// Auto-accessor has several capabilities:
// Allows subclasses to override get/set without a superclass field.

// When a decorator is applied to such a property, it gains access to the get/set methods
// And can complete them without changing the class structure.

function Logger<This, Value>(
    { get, set }: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext
  ): ClassAccessorDecoratorResult<This, Value> | void {
    const { kind, name } = context;
    const fieldName = String(name);
    if (kind === "accessor") {
      return {
        get(this): Value {
          console.log(`Logger: get ${fieldName}`);
          return get.call(this);
        },
  
  
        set(this, val: Value) {
          console.log(`Logger: set ${fieldName} to ${val}`);
          return set.call(this, val);
        },
      };
    }
  }
  
  
  class Human {
    @Logger
    accessor name: string
  
  
    constructor(name: string) {
      this.name = name
    }
  
  
    greet() {
      console.log(`Hello, i am ${this.name}`)
    }
  }
  
  
class B {
    accessor name: string
  
    constructor(name: string) {
      this.name = name
    }
  }

  const human = new Human('Ivan') // Logger: set name to Ivan
  human.greet() // Logger: get name

// Without accessor 

class A {
    #name: string = ''
  
    get name() {
      return this.#name
    }
  
    set name(value: string) {
      this.#name = value
    }
  
    constructor(name: string) {
      this.name = name
    }
  }
  
  