Certainly! Let's explore how to add type annotations to functions and leverage generics for creating reusable and type-safe code in TypeScript:

### Type Annotations for Functions:

Type annotations for functions specify the types of parameters and return values. They provide clarity about the expected types used in the function.

```typescript
function add(x: number, y: number): number {
    return x + y;
}
```

### Optional and Default Parameters:

You can also specify optional parameters by appending a question mark (`?`) after the parameter name. Additionally, you can provide default parameter values.

```typescript
function greet(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
}

greet("Alice");             // Output: Hello, Alice!
greet("Bob", "Good morning");   // Output: Good morning, Bob!
```

### Function Types:

You can define function types using type annotations. This allows you to specify the signature of functions that are expected as parameters or return values.

```typescript
type MathOperation = (x: number, y: number) => number;

let sum: MathOperation = (x, y) => x + y;
```

### Generics:

Generics allow you to create functions and classes that work with a variety of types while maintaining type safety. They provide flexibility and reusability in your code.

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("Hello"); // Output type is `string`
```

### Using Generics with Functions:

You can use generics in function signatures to create functions that operate on any type.

```typescript
function reverse<T>(items: T[]): T[] {
    return items.reverse();
}

let numbers = [1, 2, 3, 4, 5];
let reversedNumbers = reverse(numbers); // Output: [5, 4, 3, 2, 1]

let strings = ["apple", "banana", "orange"];
let reversedStrings = reverse(strings); // Output: ["orange", "banana", "apple"]
```

### Constraints on Generics:

You can add constraints to generics to restrict the types that can be used. This ensures that only certain types, which satisfy the constraints, can be passed to the function.

```typescript
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): void {
    console.log(arg.length);
}

logLength("Hello");   // Output: 5
logLength([1, 2, 3]); // Output: 3
```

### Benefits:

- **Type Safety**: Type annotations and generics provide type safety by enforcing correct usage of types.
- **Flexibility**: Generics allow functions and classes to work with a variety of types, enhancing code reusability and flexibility.
- **Readability**: Type annotations improve code readability by making it clear what types are expected and returned by functions.

By understanding how to add type annotations to functions and utilize generics, developers can create more robust, reusable, and type-safe code in TypeScript.