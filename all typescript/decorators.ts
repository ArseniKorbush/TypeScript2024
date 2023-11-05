class Person {
    age: number = 0
  
    changeAge() {
      console.log("Logger: Func start")
      console.log("changing age...")
      console.log("Logger: Func end")
    }
  }
  
  const person = new Person();
  person.changeAge()

// Without decorators

// Decorator functions
// These are ordinary functions that allow you to add additional behavior to a class, method, or property.

// We see that we need to add logging to the method to track its operation.
// In this case, decorators come to our aid.

function Logger<This, Args extends number[], Return>(
    target: (this: This, ...args: Args) => Return, 
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
  return function(this: This, ...args: Args) {
    console.log("Logger: Func start")
    const result = target.call(this, ...args)
    console.log("Logger: Func end")

    return result
  }
}

// apply decorator to our class

class User {
    age: number = 0
  
    @Logger
    changeAge() {
      console.log("changing age...")
    }
  }
  
  const user = new User();
  person.changeAge()

// Decorator functions can be chained together. For example, imagine that we need to add validation 
// For the changeAge method. It is not good practice to do the validation directly inside a method,
// Because if we need to add the same validation to another method, we will be violating the DRY principle.
// The correct solution in this case would be to use a decorator.

// Let's wrap the decorator in a higher-order function to pass a parameter, in our case, the minimum value from outside.

function Min<This, Args extends number[], Return>(minValue: number) {
    return function(
      target: (this: This, ...args: Args) => Return, 
      context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
    ) {
      return function(this: This, ...args: Args) {
        if(args[0] < minValue) {
          throw new Error(`Возраст меньше ${minValue}`)
        }
  
        return target.call(this, ...args)
      }
    }
  }

// Go use this decorator

class Utilizer {
    age: number = 0
  
    @Logger
    @Min(18)
    changeAge(value: number) {
      this.age = value
    }
  }
  
  const utilizer = new Utilizer();
  person.changeAge(10)  // Error: Age under 18

// Decorators can be used not only for class methods; you can also “decorate” class properties,
// Getters and setters, auto-accessor, as well as the classes themselves.