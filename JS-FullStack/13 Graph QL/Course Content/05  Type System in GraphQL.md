### **Type System in GraphQL**

GraphQL has a strongly-typed system, meaning every API in GraphQL is defined with a schema that specifies the types of data clients can request. The type system consists of predefined scalar types and custom types that can be created by developers.

---

### **1. Scalars in GraphQL**

Scalars are the **basic data types** in GraphQL. They represent the leaf nodes of a query, meaning they cannot have subfields. GraphQL has five built-in scalar types:

#### **a. Int**
- Represents **signed 32-bit integers**.
- Example: `1`, `100`, `-50`.
  
  ```graphql
  type Query {
    age: Int
  }
  ```

#### **b. Float**
- Represents **signed double-precision floating-point values**.
- Example: `3.14`, `0.99`, `-1.5`.

  ```graphql
  type Query {
    price: Float
  }
  ```

#### **c. String**
- Represents a **sequence of characters** (UTF-8).
- Example: `"Hello, World!"`, `"GraphQL is great"`.

  ```graphql
  type Query {
    name: String
  }
  ```

#### **d. Boolean**
- Represents **true or false** values.
- Example: `true`, `false`.

  ```graphql
  type Query {
    isActive: Boolean
  }
  ```

#### **e. ID**
- Represents a **unique identifier**. It’s often used to fetch an object by its ID.
- Example: `"123"`, `"abcd-efgh-5678"`.

  ```graphql
  type Query {
    userId: ID
  }
  ```

---

### **2. Custom Scalars in GraphQL**

GraphQL allows the creation of **custom scalar types** for handling data that doesn’t fit into the built-in types. Custom scalars are often used for more complex data types like `Date`, `Time`, or `Email`. These custom scalars require manual implementation for **parsing**, **validation**, and **serialization**.

#### **a. Date Scalar**
- Represents a **date** (often formatted as `YYYY-MM-DD`).
- Useful when dealing with timestamps, birth dates, etc.

  Example implementation of `Date` scalar:

  ```javascript
  const { GraphQLScalarType } = require('graphql');
  const { Kind } = require('graphql/language');

  const DateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Custom scalar for Date',
    parseValue(value) {
      return new Date(value);  // Convert input value to Date object
    },
    serialize(value) {
      return value.toISOString().split('T')[0];  // Return Date as a string (YYYY-MM-DD)
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);  // Convert AST string value to Date object
      }
      return null;
    },
  });
  ```

  Usage in schema:

  ```graphql
  scalar Date

  type Query {
    today: Date
  }
  ```

#### **b. Time Scalar**
- Represents a **time** value (often formatted as `HH:mm:ss`).
- Useful for scheduling, timestamps, and other time-related fields.

  Example implementation of `Time` scalar:

  ```javascript
  const TimeScalar = new GraphQLScalarType({
    name: 'Time',
    description: 'Custom scalar for Time',
    parseValue(value) {
      return value;  // Input format assumed to be correct (HH:mm:ss)
    },
    serialize(value) {
      return value;  // Return time as a string
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return ast.value;  // Accept valid time string
      }
      return null;
    },
  });
  ```

  Usage in schema:

  ```graphql
  scalar Time

  type Query {
    currentTime: Time
  }
  ```

---

### **Summary of Scalars**

| **Scalar Type** | **Description**               | **Example**                  |
|-----------------|-------------------------------|------------------------------|
| `Int`           | 32-bit signed integer          | `1`, `100`, `-50`            |
| `Float`         | Double-precision floating point| `3.14`, `0.99`, `-1.5`       |
| `String`        | UTF-8 string                   | `"Hello"`, `"GraphQL"`        |
| `Boolean`       | True or false value            | `true`, `false`              |
| `ID`            | Unique identifier              | `"123"`, `"abcd-efgh"`        |
| `Date` (custom) | Date formatted as `YYYY-MM-DD` | `"2024-10-14"`               |
| `Time` (custom) | Time formatted as `HH:mm:ss`   | `"15:30:00"`                 |

---

### **Custom Scalars in GraphQL Ecosystem**
Many libraries and frameworks, such as **Apollo Server**, provide **out-of-the-box custom scalars** for `Date`, `Time`, `DateTime`, `JSON`, and more, which can simplify the process of working with these data types.

For example, with **Apollo Server**, you can use the `graphql-scalars` library to include common custom scalars without manually implementing them:

```bash
npm install graphql-scalars
```

Then import and use the provided custom scalars:

```javascript
const { DateTimeResolver } = require('graphql-scalars');
```

Using this setup allows you to create APIs with complex, real-world data types while ensuring validation and type safety through GraphQL’s powerful type system.