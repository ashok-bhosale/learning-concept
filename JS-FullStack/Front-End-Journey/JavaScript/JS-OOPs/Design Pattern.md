Design patterns are reusable solutions to common problems in software design. They are templates for how to solve a problem that can be used in many different situations. Here are a few common design patterns implemented in JavaScript:

### 1. Singleton Pattern

The Singleton pattern ensures a class has only one instance and provides a global point of access to it.

```javascript
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      this.data = "Singleton Data";
      Singleton.instance = this;
    }

    return Singleton.instance;
  }

  getData() {
    return this.data;
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();

console.log(instance1 === instance2); // Output: true
console.log(instance1.getData()); // Output: Singleton Data
```

### 2. Factory Pattern

The Factory pattern defines an interface for creating an object, but lets subclasses alter the type of objects that will be created.

```javascript
class Dog {
  speak() {
    console.log("Woof! Woof!");
  }
}

class Cat {
  speak() {
    console.log("Meow! Meow!");
  }
}

class AnimalFactory {
  createAnimal(type) {
    switch (type) {
      case 'dog':
        return new Dog();
      case 'cat':
        return new Cat();
      default:
        return null;
    }
  }
}

const factory = new AnimalFactory();

const dog = factory.createAnimal('dog');
dog.speak(); // Output: Woof! Woof!

const cat = factory.createAnimal('cat');
cat.speak(); // Output: Meow! Meow!
```

### 3. Observer Pattern

The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyObservers() {
    this.observers.forEach(observer => observer.update());
  }
}

class Observer {
  update() {
    console.log("Observer has been notified!");
  }
}

const subject = new Subject();

const observer1 = new Observer();
const observer2 = new Observer();

subject.addObserver(observer1);
subject.addObserver(observer2);

subject.notifyObservers();
// Output:
// Observer has been notified!
// Observer has been notified!
```

### 4. Decorator Pattern

The Decorator pattern allows behavior to be added to individual objects, dynamically, without affecting the behavior of other objects from the same class.

```javascript
class SimpleCoffee {
  cost() {
    return 5;
  }
}

class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 2;
  }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 1;
  }
}

let myCoffee = new SimpleCoffee();
console.log(myCoffee.cost()); // Output: 5

myCoffee = new MilkDecorator(myCoffee);
console.log(myCoffee.cost()); // Output: 7

myCoffee = new SugarDecorator(myCoffee);
console.log(myCoffee.cost()); // Output: 8
```

### 5. Module Pattern

The Module pattern allows you to create public and private encapsulation within your code, providing a way to wrap a set of variables and functions together in a single scope.

```javascript
const Module = (() => {
  let privateVar = 'I am private';

  const privateMethod = () => {
    console.log(privateVar);
  };

  return {
    publicMethod: () => {
      privateMethod();
    }
  };
})();

Module.publicMethod(); // Output: I am private
// Module.privateMethod(); // Uncaught TypeError: Module.privateMethod is not a function
```

### Summary

- **Singleton Pattern:** Ensures a class has only one instance.
- **Factory Pattern:** Creates objects without specifying the exact class.
- **Observer Pattern:** Notifies dependents of state changes.
- **Decorator Pattern:** Adds behavior to objects dynamically.
- **Module Pattern:** Encapsulates and organizes code into separate units.

These patterns help in creating more structured, maintainable, and scalable JavaScript applications.