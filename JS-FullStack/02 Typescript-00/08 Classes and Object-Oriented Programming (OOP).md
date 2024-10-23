In TypeScript, classes and interfaces play a crucial role in object-oriented programming (OOP). Let's explore how to create classes and interfaces in TypeScript:

### Classes:

Classes in TypeScript are similar to classes in other object-oriented languages like Java or C#. They allow you to encapsulate data and behavior into objects.

```typescript
class Person {
    firstName: string;
    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    greet() {
        console.log(`Hello, ${this.firstName} ${this.lastName}!`);
    }
}

let person = new Person("Alice", "Smith");
person.greet(); // Output: Hello, Alice Smith!
```

### Inheritance:

You can create subclasses that inherit properties and methods from a base class using the `extends` keyword.

```typescript
class Student extends Person {
    studentId: number;

    constructor(firstName: string, lastName: string, studentId: number) {
        super(firstName, lastName);
        this.studentId = studentId;
    }

    study() {
        console.log(`${this.firstName} is studying.`);
    }
}

let student = new Student("Bob", "Jones", 12345);
student.greet(); // Output: Hello, Bob Jones!
student.study(); // Output: Bob is studying.
```

### Access Modifiers:

TypeScript supports access modifiers like `public`, `private`, and `protected` to control the visibility of class members.

```typescript
class Car {
    private model: string;
    protected year: number;

    constructor(model: string, year: number) {
        this.model = model;
        this.year = year;
    }

    getCarInfo() {
        return `Model: ${this.model}, Year: ${this.year}`;
    }
}

class ElectricCar extends Car {
    private batteryLife: number;

    constructor(model: string, year: number, batteryLife: number) {
        super(model, year);
        this.batteryLife = batteryLife;
    }

    getCarInfoWithBattery() {
        return `${this.getCarInfo()}, Battery Life: ${this.batteryLife} kWh`;
    }
}
```

### Interfaces:

Interfaces define contracts for objects, specifying the structure that objects must adhere to. They are particularly useful for defining shapes of data and contracts for classes.

```typescript
interface Shape {
    area(): number;
}

class Circle implements Shape {
    constructor(private radius: number) {}

    area() {
        return Math.PI * this.radius ** 2;
    }
}

let circle = new Circle(5);
console.log(circle.area()); // Output: 78.54
```

### Implementing Multiple Interfaces:

A class can implement multiple interfaces, allowing it to adhere to multiple contracts.

```typescript
interface Printable {
    print(): void;
}

interface Loggable {
    log(): void;
}

class Logger implements Printable, Loggable {
    print() {
        console.log("Printing...");
    }

    log() {
        console.log("Logging...");
    }
}
```

By leveraging classes and interfaces, developers can create modular, maintainable, and scalable code in TypeScript, following the principles of object-oriented programming.