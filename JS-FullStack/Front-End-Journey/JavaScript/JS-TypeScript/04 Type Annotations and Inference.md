Type annotations and type inference are fundamental concepts in TypeScript that allow developers to specify types for variables, parameters, and function return values. Let's explore each concept in more detail:

### Type Annotations:

Type annotations explicitly specify the type of a variable, parameter, or function return value. They provide clarity to both developers and the TypeScript compiler about the intended types used in the code.

#### Variables:

```typescript
let age: number = 30;
let name: string = "Alice";
let isStudent: boolean = true;
```

#### Function Parameters and Return Types:

```typescript
function greet(name: string): string {
    return `Hello, ${name}!`;
}

function add(x: number, y: number): number {
    return x + y;
}
```

### Type Inference:

TypeScript's type inference feature allows the compiler to automatically deduce the types of variables, parameters, and function return values based on their usage and context. This reduces the need for explicit type annotations while still providing type safety.

#### Variables:

```typescript
let age = 30; // Type inference infers `number`
let name = "Alice"; // Type inference infers `string`
let isStudent = true; // Type inference infers `boolean`
```

#### Function Parameters and Return Types:

```typescript
function greet(name: string) {
    return `Hello, ${name}!`; // Type inference infers the return type as `string`
}

function add(x: number, y: number) {
    return x + y; // Type inference infers the return type as `number`
}
```

### When to Use Annotations vs. Inference:

- **Annotations**: Use type annotations when you want to explicitly specify types, especially in cases where type inference might not be accurate or when you want to provide additional documentation.
- **Inference**: Type inference is convenient and often sufficient for simple cases. Let TypeScript infer types unless you need to enforce specific types or improve code readability with annotations.

### Benefits:

- **Readability**: Type annotations and inference improve code readability by making it clear what types are expected and returned.
- **Type Safety**: Both annotations and inference help catch type-related errors at compile-time, reducing bugs and improving code reliability.
- **Documentation**: Annotations serve as documentation for developers and tools, making it easier to understand code and its intended usage.

By understanding how to use type annotations and type inference effectively, developers can leverage TypeScript's type system to write more robust and maintainable code.