### **Defining Input Types and Arguments in GraphQL**

In GraphQL, **input types** and **arguments** are essential for providing input data to queries and mutations. They allow clients to send parameters and specify what data they want to modify or retrieve.

---

### **1. Arguments in GraphQL**

**Arguments** are used in both queries and mutations to pass parameters and filter or modify the data returned by the server.

- Arguments are defined directly within the field definition and can be scalars, enums, or input types.
- Both queries and mutations can accept arguments.

#### **Example: Query with Arguments**
Here’s how to define a query with arguments to fetch a specific user by ID:

```graphql
type Query {
  user(id: ID!): User
}
```

In this example, the `user` query takes an `id` argument of type `ID`, which is non-nullable (`!`). This means the client must provide an `id` when calling the query.

**Query Example:**
```graphql
{
  user(id: "123") {
    name
    email
  }
}
```

---

### **2. Input Types in GraphQL**

**Input types** are custom types used to encapsulate arguments for mutations or queries. They are similar to object types, but they are used specifically for **inputs** and cannot have fields that resolve other types (like queries).

Input types are typically used in mutations where multiple parameters need to be passed in a structured way.

#### **Defining an Input Type**
Input types are defined using the `input` keyword and can contain scalar types or other input types.

Example input type for creating a new user:

```graphql
input CreateUserInput {
  name: String!
  email: String!
  age: Int
}
```

This input type defines a `CreateUserInput` object with `name`, `email`, and `age` fields.

#### **Using Input Types in Mutations**
You can use input types to group mutation arguments.

```graphql
type Mutation {
  createUser(input: CreateUserInput!): User
}
```

Here, the `createUser` mutation takes a single argument `input` of type `CreateUserInput!`, meaning it requires a structured input object.

#### **Mutation Example:**
A mutation to create a user using the input type would look like this:

```graphql
mutation {
  createUser(input: {
    name: "Alice",
    email: "alice@example.com",
    age: 28
  }) {
    id
    name
    email
  }
}
```

This mutation sends an `input` object with the required fields to create a new user.

---

### **3. Nested Input Types**

Input types can be **nested**, meaning one input type can have fields that are other input types. This is useful for handling complex inputs.

#### Example: Nested Input Types for Address

```graphql
input AddressInput {
  street: String!
  city: String!
  postalCode: String!
}

input CreateUserInput {
  name: String!
  email: String!
  age: Int
  address: AddressInput!
}
```

In this example, the `CreateUserInput` includes an `address` field, which is an object of type `AddressInput`. This allows the mutation to accept more complex input structures.

**Usage Example:**
```graphql
mutation {
  createUser(input: {
    name: "Bob",
    email: "bob@example.com",
    age: 35,
    address: {
      street: "123 Main St",
      city: "Springfield",
      postalCode: "12345"
    }
  }) {
    id
    name
    email
  }
}
```

---

### **4. Example of Complete Mutation and Query**

Here’s an example schema that includes arguments, input types, and how they are used in queries and mutations:

```graphql
# Define a User type
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
  address: Address
}

# Define an Address type
type Address {
  street: String!
  city: String!
  postalCode: String!
}

# Define the Query type with arguments
type Query {
  user(id: ID!): User
}

# Define the Mutation type using input types
type Mutation {
  createUser(input: CreateUserInput!): User
}

# Define input types for creating a user
input CreateUserInput {
  name: String!
  email: String!
  age: Int
  address: AddressInput!
}

input AddressInput {
  street: String!
  city: String!
  postalCode: String!
}
```

---

### **5. Input Types vs. Object Types**

- **Input Types** are used to **input data** into queries and mutations.
- **Object Types** are used to **fetch data** from queries and mutations.
- Input types **cannot have resolvers** and cannot reference other object types.

---

### **Key Differences:**

| **Object Types**                       | **Input Types**                      |
|----------------------------------------|--------------------------------------|
| Used to define data structures returned from queries/mutations. | Used to define structured inputs for queries/mutations. |
| Can reference other object types and scalars. | Can only contain scalar fields or other input types. |
| Resolvers define how to fetch the data. | No resolvers, purely for input data. |

---

### **Conclusion**

- **Arguments** allow clients to pass parameters in queries or mutations, usually as scalars.
- **Input Types** encapsulate complex inputs for mutations and make it easier to pass structured data, ensuring flexibility and scalability.
- Nested input types enable handling more complex operations such as creating related data, like users with addresses.

These concepts help structure a GraphQL API to handle complex queries and mutations in a clean, maintainable way.