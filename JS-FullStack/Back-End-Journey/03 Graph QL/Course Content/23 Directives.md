### **Directives** in GraphQL: `@skip`, `@include`, and Custom Directives

**Directives** in GraphQL are a way to **modify the behavior of queries** at runtime. They allow you to dynamically include or skip parts of a query based on conditions, enabling more flexible and efficient GraphQL operations. The most common directives provided by the GraphQL specification are `@skip` and `@include`, but you can also define **custom directives** to suit your application’s needs.

---

### **1. Built-in Directives: `@skip` and `@include`**

#### **`@skip` Directive**

The `@skip` directive allows you to **conditionally skip** a field or fragment in the query. It takes a boolean argument `if`, and if the condition is `true`, the field or fragment will be omitted from the query result.

**Use Case:** You may want to skip certain parts of a query if some condition is met (e.g., a user isn’t authenticated, or a certain value is null).

#### Syntax:

```graphql
query {
  user(id: 1) {
    id
    name
    email @skip(if: true)  # Skips the 'email' field if 'if' is true
  }
}
```

#### Example:

```graphql
query GetUser($skipEmail: Boolean!) {
  user(id: 1) {
    id
    name
    email @skip(if: $skipEmail)  # The email field will be skipped if $skipEmail is true
  }
}
```

If you pass `skipEmail = true`, the query will not include the `email` field in the result.

**Response when `skipEmail = true`:**

```json
{
  "data": {
    "user": {
      "id": "1",
      "name": "Alice"
    }
  }
}
```

#### **`@include` Directive**

The `@include` directive is the opposite of `@skip`. It lets you **conditionally include** a field or fragment based on a boolean condition. If the `if` condition evaluates to `true`, the field or fragment is included in the query result.

#### Syntax:

```graphql
query {
  user(id: 1) {
    id
    name
    email @include(if: true)  # Includes 'email' field only if 'if' is true
  }
}
```

#### Example:

```graphql
query GetUser($includeEmail: Boolean!) {
  user(id: 1) {
    id
    name
    email @include(if: $includeEmail)  # The email field will be included if $includeEmail is true
  }
}
```

If you pass `includeEmail = true`, the query will include the `email` field.

**Response when `includeEmail = true`:**

```json
{
  "data": {
    "user": {
      "id": "1",
      "name": "Alice",
      "email": "alice@example.com"
    }
  }
}
```

#### **Why Use `@skip` and `@include`?**

- **Dynamic Queries:** You can dynamically adjust what data is requested based on runtime conditions (e.g., user preferences, authentication status).
- **Optimize Data Fetching:** Reduces unnecessary data transfer by not requesting fields that are not needed, improving performance.
- **Conditional Data Fetching:** Allow the client to decide which fields to include or skip, reducing complexity on the server.

---

### **2. Custom Directives**

In addition to the built-in `@skip` and `@include` directives, GraphQL allows you to create **custom directives** to implement specific logic on the server side, enabling more powerful and flexible query behaviors. Custom directives can be used for various purposes, such as data formatting, authentication/authorization, logging, and validation.

#### **How to Create Custom Directives**

Custom directives are defined in the **GraphQL schema** and are associated with specific logic that the server can execute when that directive is encountered.

#### Example: Defining a Custom Directive

Let’s say we want to create a custom directive `@uppercase` that transforms string fields to uppercase. You define the directive in the schema and specify where it should be applied (e.g., on fields).

1. **Define the Custom Directive in Schema:**

```graphql
directive @uppercase on FIELD_DEFINITION
```

This defines a directive named `@uppercase` that can be applied to **field definitions** in the schema.

2. **Use the Custom Directive in a Query:**

```graphql
query {
  user(id: 1) {
    id
    name
    email @uppercase  # This applies the custom @uppercase directive to the 'email' field
  }
}
```

3. **Implement the Directive Logic in the Server:**

On the GraphQL server, you need to define the behavior of the directive. The logic for the `@uppercase` directive could be something like this:

```javascript
const { GraphQLServer } = require('graphql-yoga');
const { SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver } = require('graphql');

// Define the schema with the directive applied
const typeDefs = `
  directive @uppercase on FIELD_DEFINITION

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    user(id: ID!): User
  }
`;

// Implement the directive
class UppercaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    // Override the resolver for the field
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args);
      return typeof result === 'string' ? result.toUpperCase() : result;
    };
  }
}

// Define the resolvers
const resolvers = {
  Query: {
    user: (_, { id }) => {
      return {
        id,
        name: 'Alice',
        email: 'alice@example.com',
      };
    },
  },
};

// Create the server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    uppercase: UppercaseDirective,
  },
});

server.start(() => console.log('Server is running on http://localhost:4000'));
```

4. **Test the Query**

When you run the query:

```graphql
query {
  user(id: 1) {
    id
    name
    email @uppercase
  }
}
```

The server will apply the `@uppercase` directive to the `email` field, transforming it into uppercase.

**Response:**

```json
{
  "data": {
    "user": {
      "id": "1",
      "name": "Alice",
      "email": "ALICE@EXAMPLE.COM"
    }
  }
}
```

#### **Use Cases for Custom Directives:**

- **Authorization**: Use a custom directive to enforce authorization checks before resolving certain fields (e.g., `@auth(role: "ADMIN")`).
- **Logging and Analytics**: Add logging or tracking logic to specific queries or fields using custom directives.
- **Field Transformation**: Automatically format or modify data before returning it to the client (e.g., `@uppercase` or `@formatDate`).
- **Rate Limiting**: Implement rate-limiting logic using a custom directive to restrict how frequently certain fields can be queried.

---

### **3. Summary of Built-in Directives**

- **`@skip`**: Skips a field or fragment based on a boolean condition.
- **`@include`**: Includes a field or fragment based on a boolean condition.

#### **Common Use Cases for `@skip` and `@include`:**

- **Conditional Rendering**: Dynamically choose which fields to query based on client state or environment variables.
- **Optimizing Queries**: Avoid unnecessary fields in responses, reducing data size and improving performance.
- **User Preferences**: Fetch different fields for different users based on their preferences (e.g., authenticated vs. unauthenticated users).

---

### **4. Conclusion**

Directives are a powerful feature in GraphQL that provide flexibility in how data is queried and manipulated. Built-in directives like `@skip` and `@include` allow you to conditionally include or skip fields based on runtime conditions. Custom directives provide even greater flexibility, enabling you to implement custom behavior like data transformations, authentication checks, and more.

- **Use `@skip` and `@include`** for dynamic query construction, allowing clients to adjust their query behavior based on conditions.
- **Create custom directives** for advanced server-side logic and use cases like field formatting, authorization, or logging.

Directives can make your GraphQL queries more powerful, flexible, and efficient, ensuring that your server can adapt to various requirements without needing to define complex, repetitive logic in every query.