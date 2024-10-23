Sure, let's delve into TypeScript's basic types:

1. **Number**: Represents both integer and floating-point numbers. TypeScript supports decimal, hexadecimal, octal, and binary literals.

   ```typescript
   let num: number = 42;
   let hex: number = 0xf00d;
   let binary: number = 0b1010;
   let octal: number = 0o744;
   ```

2. **String**: Represents textual data. Strings can be enclosed in single quotes (''), double quotes ("") or backticks (``) for template literals.

   ```typescript
   let str: string = "Hello, TypeScript!";
   ```

3. **Boolean**: Represents logical values. Can only be `true` or `false`.

   ```typescript
   let isDone: boolean = false;
   ```

4. **Array**: Represents a collection of elements of the same type. Array types can be written in two ways: `type[]` or `Array<type>`.

   ```typescript
   let numbers: number[] = [1, 2, 3, 4, 5];
   let names: Array<string> = ["Alice", "Bob", "Charlie"];
   ```

5. **Tuple**: Represents an array with a fixed number of elements where each element may be of a different type. Tuple types allow you to specify the type of each element at a specific index.

   ```typescript
   let tuple: [string, number] = ["John", 25];
   ```

6. **Enum**: Represents a set of named constants. Enums can be numeric or string-based.

   ```typescript
   enum Color {
       Red,
       Green,
       Blue
   }
   let c: Color = Color.Green;
   ```

7. **Any**: Represents a dynamic type that allows you to opt out of type-checking. Use it when you're unsure about the type of a value or when interfacing with dynamic content like JSON data.

   ```typescript
   let notSure: any = 4;
   notSure = "maybe a string instead";
   ```

8. **Void**: Represents the absence of a type, typically used as the return type of functions that do not return a value.

   ```typescript
   function logMessage(): void {
       console.log("This is a log message.");
   }
   ```

9. **Null and Undefined**: Represents `null` and `undefined` values respectively. By default, `null` and `undefined` are subtypes of all other types.

   ```typescript
   let n: null = null;
   let u: undefined = undefined;
   ```

10. **Never**: Represents the type of values that never occur. It's typically the return type for functions that always throw exceptions or never return.

    ```typescript
    function throwError(message: string): never {
        throw new Error(message);
    }
    ```

These are the basic types in TypeScript, providing a foundation for building more complex data structures and enforcing type safety in your code.