### Without Prototype

In JavaScript, if you create multiple objects with the same properties or methods without using prototypes, each object has its own copy of those methods, which increases memory usage.

```javascript
function Person(name) {
    this.name = name;

    // Method defined directly in the constructor
    this.sayHello = function() {
        console.log(`Hello, my name is ${this.name}`);
    };
}

const person1 = new Person("Alice");
const person2 = new Person("Bob");

person1.sayHello(); // Hello, my name is Alice
person2.sayHello(); // Hello, my name is Bob

console.log(person1.sayHello === person2.sayHello); // false (different copies)
```

### With Prototype

When you use prototypes, the method is shared between all instances. This saves memory because the method is defined once and referenced by all instances.

```javascript
function Person(name) {
    this.name = name;
}

// Method added to the prototype (shared by all instances)
Person.prototype.sayHello = function() {
    console.log(`Hello, my name is ${this.name}`);
};

const person1 = new Person("Alice");
const person2 = new Person("Bob");

person1.sayHello(); // Hello, my name is Alice
person2.sayHello(); // Hello, my name is Bob

console.log(person1.sayHello === person2.sayHello); // true (shared method)
```

### Key Difference

- **Without Prototype**: Each object has its own copy of the method.
- **With Prototype**: The method is shared between all objects, saving memory.