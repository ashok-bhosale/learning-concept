### **Integration Testing with GraphQL Queries/Mutations**

**Integration testing** focuses on verifying how different parts of your application work together as a whole, ensuring that the GraphQL API behaves as expected when connected to other system components such as databases, authentication services, or third-party APIs. Unlike unit tests, which isolate individual components, integration tests focus on the interaction between components.

In the context of GraphQL, integration testing typically involves:

- Sending **GraphQL queries** and **mutations**.
- Verifying that the system handles these queries/mutations correctly.
- Ensuring that data flows correctly between the GraphQL resolvers, business logic, and the database or other dependencies.

This guide will walk you through **integration testing** of GraphQL queries and mutations using tools like **Jest**, **Apollo Server**, and **Supertest** for HTTP integration testing.

---

### **1. Set Up the Testing Environment**

For integration testing, you’ll want to test the GraphQL API as a whole, often interacting with the actual database or mock services. Here’s how to get started.

#### **Install Dependencies**

```bash
# For Jest, Supertest, Apollo Server, and GraphQL
npm install --save-dev jest supertest apollo-server-express graphql
```

- **Jest**: A JavaScript testing framework.
- **Supertest**: A popular HTTP testing library for making requests to the API endpoints.
- **Apollo Server**: The server that runs your GraphQL API.
- **GraphQL**: The query language.

---

### **2. Example GraphQL Schema and Resolvers**

Let’s assume you have the following schema and resolvers for a simple **user** management system:

```graphql
# Schema: user.graphql
type Query {
  getUser(id: ID!): User
}

type Mutation {
  createUser(username: String!, email: String!): User
}

type User {
  id: ID!
  username: String!
  email: String!
}
```

And the resolvers to handle the queries and mutations:

```javascript
// resolvers.js
const { createUserInDB, getUserFromDB } = require('./database');

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      const user = await getUserFromDB(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },
  },
  Mutation: {
    createUser: async (_, { username, email }) => {
      const newUser = await createUserInDB({ username, email });
      return newUser;
    },
  },
};
```

- `getUserFromDB(id)` retrieves a user from the database by ID.
- `createUserInDB(user)` creates a new user in the database.

### **3. Set Up Apollo Server for Testing**

To test GraphQL in an integration environment, we’ll use **Apollo Server** with **Express**. This allows us to send GraphQL queries and mutations over HTTP.

```javascript
// server.js
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const { resolvers } = require('./resolvers');
const typeDefs = require('./schema'); // The GraphQL schema

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Here you can add authentication or other context items if needed
  },
});

server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
});
```

### **4. Write Integration Tests**

Now we’ll write **integration tests** for GraphQL queries and mutations using **Supertest** to make HTTP requests to the server.

#### **Basic Integration Test with Jest and Supertest**

1. **Set Up Jest and Supertest**: Supertest is used to send HTTP requests to the GraphQL endpoint.

2. **Test Cases**: We'll write tests for both a **query** (`getUser`) and a **mutation** (`createUser`).

Here’s the full setup for the integration tests:

```javascript
// user.test.js
const request = require('supertest');
const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const { resolvers } = require('./resolvers');
const { createUserInDB, getUserFromDB } = require('./database');
const typeDefs = require('./schema');

// Set up the server for integration tests
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

describe('GraphQL Integration Tests', () => {
  // Test for user creation (Mutation)
  it('should create a new user', async () => {
    const CREATE_USER_MUTATION = gql`
      mutation CreateUser($username: String!, $email: String!) {
        createUser(username: $username, email: $email) {
          id
          username
          email
        }
      }
    `;

    const variables = {
      username: 'testuser',
      email: 'testuser@example.com',
    };

    const response = await request(app)
      .post('/graphql') // The GraphQL endpoint
      .send({
        query: CREATE_USER_MUTATION,
        variables,
      })
      .expect(200);

    // Check that the response contains the expected data
    const { createUser } = response.body.data;
    expect(createUser.username).toBe('testuser');
    expect(createUser.email).toBe('testuser@example.com');
    expect(createUser.id).toBeTruthy();
  });

  // Test for fetching user (Query)
  it('should return a user when found by ID', async () => {
    // Mock database
    const mockUser = { id: '1', username: 'testuser', email: 'testuser@example.com' };
    getUserFromDB.mockResolvedValue(mockUser);

    const GET_USER_QUERY = gql`
      query GetUser($id: ID!) {
        getUser(id: $id) {
          id
          username
          email
        }
      }
    `;

    const variables = {
      id: '1',
    };

    const response = await request(app)
      .post('/graphql')
      .send({
        query: GET_USER_QUERY,
        variables,
      })
      .expect(200);

    // Assert the response data
    const { getUser } = response.body.data;
    expect(getUser.id).toBe('1');
    expect(getUser.username).toBe('testuser');
    expect(getUser.email).toBe('testuser@example.com');
  });

  // Test for non-existent user (Query)
  it('should return an error when the user is not found', async () => {
    // Mock database to return null
    getUserFromDB.mockResolvedValue(null);

    const GET_USER_QUERY = gql`
      query GetUser($id: ID!) {
        getUser(id: $id) {
          id
          username
          email
        }
      }
    `;

    const variables = {
      id: '999',
    };

    const response = await request(app)
      .post('/graphql')
      .send({
        query: GET_USER_QUERY,
        variables,
      })
      .expect(200);

    // Assert that an error was returned
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].message).toBe('User not found');
  });
});
```

#### **Key Points in This Test:**

1. **Mutation Test**: The first test is a mutation (`createUser`) where we create a new user. We send a `POST` request with the GraphQL mutation and variables. We then verify that the user is created with the expected username and email.

2. **Query Test**: The second test is a query (`getUser`). We query for a user by their ID, and we ensure that the correct user is returned. We also test for an error when the user doesn't exist in the database (mocking the `getUserFromDB` function to return `null`).

3. **Mocking Database Calls**: In the tests, we use **mocking** (via `jest.mock` or `sinon.stub`) to isolate the database functions and simulate their behavior. This ensures that the tests do not rely on an actual database.

---

### **5. Running the Tests**

To run the tests, you can use:

#### **With Jest:**
```bash
npm test
```

This will run all tests in files with `.test.js` or `.spec.js` extensions.

#### **With Mocha:**
```bash
npx mocha user.test.js
```

This will run the integration tests in the `user.test.js` file.

---

### **6. Best Practices for Integration Testing**

- **Isolate External Dependencies**: Use **mocking** for database interactions, external services, or other APIs to ensure tests are focused on the GraphQL API logic.
- **Realistic Data**: Use realistic data for your tests so that they accurately represent real-world use cases. Consider creating mock data that closely resembles your production data.
- **Clean Up After Tests**: Ensure that the database or any shared state is cleaned up after each test to avoid test pollution.
- **Test Edge Cases**: Don’t just test for the happy path. Ensure you cover edge cases such as missing parameters, database failures, or unexpected inputs.

---

### **Conclusion**

**Integration testing** ensures that the different components of your GraphQL API work together seamlessly, from resolvers to the database. With **Jest** or **Mocha**, and **Supertest**, you can effectively

 test your GraphQL queries and mutations in an integrated environment. This helps catch bugs early in the development process and ensures the robustness of your GraphQL API.