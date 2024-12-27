### **Object Types, Queries, and Mutations in GraphQL**

GraphQL is designed around a flexible type system, which includes **object types**, **queries**, and **mutations** to enable flexible data fetching and updating. Let's explore these core concepts.

---

### **1. Object Types in GraphQL**

In GraphQL, **Object Types** define the shape of objects you can query or mutate. They are analogous to models or entities in other frameworks.

#### **Defining Object Types**
- An object type is defined using the `type` keyword.
- It contains fields that can have scalar types (e.g., `String`, `Int`, `Boolean`) or other object types.

For example, an object type for a `User`:

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
}
```

- `id: ID!` means `id` is a non-nullable unique identifier.
- `name: String!` means `name` is a non-nullable string.
- `age: Int` is an optional integer field.

---

### **2. Queries in GraphQL**

**Queries** are used to **fetch data** from the GraphQL server. Queries are the read-only operations in GraphQL, similar to `GET` requests in REST APIs.

#### **Defining a Query Type**
The `Query` type is a special type in GraphQL that allows you to define the available read operations for your API.

Example of a query to fetch users:

```graphql
type Query {
  users: [User]
  user(id: ID!): User
}
```

- `users: [User]` defines a query that returns a list of `User` objects.
- `user(id: ID!)` defines a query that fetches a single user by their `id`.

#### **Resolvers for Queries**
Resolvers are functions that fetch data for a query. For example, a resolver for the `user` query might look like this in JavaScript:

```javascript
const resolvers = {
  Query: {
    users: () => {
      return [
        { id: '1', name: 'John Doe', email: 'john@example.com', age: 30 },
        { id: '2', name: 'Jane Doe', email: 'jane@example.com', age: 25 },
      ];
    },
    user: (parent, args) => {
      const { id } = args;
      return { id: '1', name: 'John Doe', email: 'john@example.com', age: 30 };
    },
  },
};
```

#### **Query Example**

When querying all users, you might send a GraphQL query like this:

```graphql
{
  users {
    id
    name
    email
  }
}
```

The server would respond with:

```json
{
  "data": {
    "users": [
      {
        "id": "1",
        "name": "John Doe",
        "email": "john@example.com"
      },
      {
        "id": "2",
        "name": "Jane Doe",
        "email": "jane@example.com"
      }
    ]
  }
}
```

---

### **3. Mutations in GraphQL**

**Mutations** are used to **modify data** on the server, similar to `POST`, `PUT`, or `DELETE` in REST. While queries are for reading data, mutations are for creating, updating, or deleting data.

#### **Defining a Mutation Type**
The `Mutation` type is similar to the `Query` type but is specifically for modifying data. Each field in the `Mutation` type corresponds to an action the client can take to alter data on the server.

Example of a mutation to create a new user:

```graphql
type Mutation {
  createUser(name: String!, email: String!, age: Int): User
}
```

- `createUser(name: String!, email: String!, age: Int)` defines a mutation that creates a new `User` object. It takes three arguments: `name`, `email`, and `age`.

#### **Resolvers for Mutations**
Just like queries, mutations require resolvers to implement the actual data manipulation logic.

For example, a resolver for the `createUser` mutation might look like this:

```javascript
const resolvers = {
  Mutation: {
    createUser: (parent, args) => {
      const newUser = {
        id: Date.now().toString(),
        name: args.name,
        email: args.email,
        age: args.age,
      };
      // Save the user to the database (simulated here as an in-memory object)
      return newUser;
    },
  },
};
```

#### **Mutation Example**

To create a new user, the client would send a mutation like this:

```graphql
mutation {
  createUser(name: "Alice", email: "alice@example.com", age: 28) {
    id
    name
    email
  }
}
```

The server would respond with the newly created user:

```json
{
  "data": {
    "createUser": {
      "id": "1634020795829",
      "name": "Alice",
      "email": "alice@example.com"
    }
  }
}
```

---

### **4. Putting it All Together**

Here’s a complete example of an object type, a query, and a mutation in GraphQL:

#### **GraphQL Schema Example**

```graphql
# Define a User type
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
}

# Define queries to fetch users
type Query {
  users: [User]
  user(id: ID!): User
}

# Define mutations to create users
type Mutation {
  createUser(name: String!, email: String!, age: Int): User
}
```

#### **Resolvers Example**

```javascript
const resolvers = {
  Query: {
    users: () => {
      return [
        { id: '1', name: 'John Doe', email: 'john@example.com', age: 30 },
        { id: '2', name: 'Jane Doe', email: 'jane@example.com', age: 25 },
      ];
    },
    user: (parent, args) => {
      return { id: '1', name: 'John Doe', email: 'john@example.com', age: 30 };
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const newUser = {
        id: Date.now().toString(),
        name: args.name,
        email: args.email,
        age: args.age,
      };
      return newUser;
    },
  },
};
```

---

### **Conclusion**

- **Object Types** in GraphQL describe the data structure.
- **Queries** are for reading data.
- **Mutations** are for modifying data (create, update, delete).

GraphQL’s flexibility and type system allow you to build expressive and precise APIs that define exactly what data clients can request and modify.