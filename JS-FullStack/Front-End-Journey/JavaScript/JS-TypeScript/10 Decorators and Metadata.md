Decorators are a powerful feature in TypeScript that allow you to add metadata and extend the behavior of classes, methods, and properties. They provide a way to annotate and modify classes and class members at design time.

### Class Decorators:

Class decorators are applied to class declarations and can be used to modify the behavior of the class constructor or to add metadata to the class.

```typescript
function Logger(target: Function) {
    console.log("Logging...");
}

@Logger
class MyClass {
    // Class implementation
}
```

### Method Decorators:

Method decorators are applied to methods within a class and can be used to modify the behavior of the method or to add metadata to the method.

```typescript
function Log(target: any, key: string, descriptor: PropertyDescriptor) {
    console.log(`Logging method: ${key}`);
}

class MyClass {
    @Log
    myMethod() {
        // Method implementation
    }
}
```

### Property Decorators:

Property decorators are applied to properties within a class and can be used to modify the behavior of the property or to add metadata to the property.

```typescript
function ReadOnly(target: any, key: string) {
    Object.defineProperty(target, key, { writable: false });
}

class MyClass {
    @ReadOnly
    readonly myProperty: string = "readonly";
}
```

### Parameter Decorators:

Parameter decorators are applied to parameters within a method or constructor and can be used to modify the behavior of the parameter or to add metadata to the parameter.

```typescript
function LogParameter(target: any, key: string, index: number) {
    console.log(`Logging parameter ${index} of method ${key}`);
}

class MyClass {
    myMethod(@LogParameter param1: string, @LogParameter param2: number) {
        // Method implementation
    }
}
```

### Decorator Factories:

Decorator factories are functions that return decorator functions. They allow you to parameterize decorators and customize their behavior.

```typescript
function Log(message: string) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        console.log(`${message}: ${key}`);
    };
}

class MyClass {
    @Log("Log message")
    myMethod() {
        // Method implementation
    }
}
```

### Built-in Decorators:

TypeScript provides built-in decorators such as `@deprecated`, `@experimental`, and `@sealed` for adding common metadata to classes, methods, and properties.

```typescript
class MyClass {
    @deprecated
    oldMethod() {
        // Deprecated method implementation
    }
}
```

### Decorator Composition:

You can apply multiple decorators to a single class, method, or property, and they are applied in reverse order of their appearance in the code.

```typescript
@Decorator1
@Decorator2
class MyClass {
    @Decorator3
    myMethod() {
        // Method implementation
    }
}
```

Decorators provide a flexible and expressive way to extend class behavior, add metadata, and implement cross-cutting concerns in TypeScript applications. They are widely used in frameworks like Angular and NestJS for implementing features like dependency injection, routing, and authentication.