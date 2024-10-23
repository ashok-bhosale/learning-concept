In JavaScript, classes can have static methods as well as getters and setters. Here’s a detailed explanation and examples for both:

### Static Methods

Static methods are methods that are called on the class itself, not on instances of the class. They are often used for utility functions, such as creating or cloning objects, or other functions that pertain to the class as a whole.

#### Example:

```javascript
class Utility {
  // Static method
  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }
}

// Calling static methods
console.log(Utility.add(5, 3));       // Output: 8
console.log(Utility.subtract(5, 3));  // Output: 2
```

### Getters and Setters

Getters and setters are special methods that provide a way to access and update the properties of an object. They allow for more control over how properties are accessed and modified, adding a layer of abstraction to your class properties.

#### Example:

```javascript
class Person {
  constructor(name, age) {
    this._name = name;
    this._age = age;
  }

  // Getter for name
  get name() {
    return this._name;
  }

  // Setter for name
  set name(newName) {
    if (typeof newName === 'string' && newName.length > 0) {
      this._name = newName;
    } else {
      console.error('Invalid name');
    }
  }

  // Getter for age
  get age() {
    return this._age;
  }

  // Setter for age
  set age(newAge) {
    if (typeof newAge === 'number' && newAge > 0) {
      this._age = newAge;
    } else {
      console.error('Invalid age');
    }
  }
}

// Using getters and setters
const person = new Person('John', 30);

console.log(person.name); // Output: John
console.log(person.age);  // Output: 30

person.name = 'Jane';
person.age = 25;

console.log(person.name); // Output: Jane
console.log(person.age);  // Output: 25

person.name = ''; // Invalid name
person.age = -5;  // Invalid age
```

### Combining Static Methods with Getters and Setters

You can combine static methods with getters and setters within a single class to create a powerful and flexible API.

#### Example:

```javascript
class MathUtility {
  constructor() {
    throw new Error('This class cannot be instantiated');
  }

  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static divide(a, b) {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }

  // Getters for constants
  static get PI() {
    return 3.141592653589793;
  }

  static get E() {
    return 2.718281828459045;
  }
}

// Using static methods and getters
console.log(MathUtility.add(10, 5));     // Output: 15
console.log(MathUtility.PI);             // Output: 3.141592653589793
console.log(MathUtility.E);              // Output: 2.718281828459045
```

### Summary

- **Static Methods:** Defined with the `static` keyword, called on the class itself.
- **Getters:** Access properties in a controlled way, defined using the `get` keyword.
- **Setters:** Update properties in a controlled way, defined using the `set` keyword.

By using these features, you can create more maintainable and flexible JavaScript classes.