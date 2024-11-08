
### **Mocking Data for Testing GraphQL**

Mocking data is an essential part of testing, particularly when you want to isolate your tests from external dependencies like databases, APIs, or file systems. In the context of **GraphQL resolvers**, mocking allows you to simulate responses from these dependencies, ensuring your tests focus on the business logic of your GraphQL queries and mutations without needing actual connections to a database.

In this guide, we'll cover **how to mock data** for **GraphQL queries and mutations** during testing, using popular testing tools like **Jest** and **Sinon**. We'll also discuss strategies for mocking **database calls**, **external APIs**, and **third-party services**.

---

### **1. Mocking Data for GraphQL Resolvers**

#### **Mocking Functions (Jest)**

Jest provides built-in utilities to mock functions and modules. This is especially useful when testing GraphQL resolvers that interact with a database or external API. You can mock specific functions or entire modules.

##### **Basic Example**: Mocking a Database Function

Let’s assume you have the following GraphQL query and resolver that fetches a user by their ID:

```graphql
# Schema (schema.graphql)
type Query {
  getUser(id: ID!): User
}

type User {
  id: ID!
  username: String!
  email: String!
}
```

```javascript
// resolvers.js
const { getUserFromDB } = require('./database');

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
};
```

The `getUserFromDB` function simulates a database call to fetch the user by ID. During testing, you can mock `getUserFromDB` to return specific data.

#### **Mocking with Jest**

To mock the `getUserFromDB` function, you can use Jest's `jest.mock()` and `jest.fn()`.

1. **Install Jest** (if not installed):

```bash
npm install --save-dev jest
```

2. **Create a Test File** (e.g., `user.test.js`):

```javascript
const { ApolloServer, gql } = require('apollo-server-express');
const { resolvers } = require('./resolvers');
const { getUserFromDB } = require('./database');
const express = require('express');
const request = require('supertest');

// Mock the database function
jest.mock('./database'); // This tells Jest to mock the entire module

// Define the GraphQL schema
const typeDefs = gql`
  type Query {
    getUser(id: ID!): User
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }
`;

describe('GraphQL Resolvers', () => {
  let server;

  beforeAll(() => {
    // Create a mock server
    const app = express();
    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    apolloServer.applyMiddleware({ app });
    server = app.listen(4000);
  });

  afterAll(() => {
    server.close();
  });

  it('should return user data when user is found', async () => {
    // Mock the database call
    const mockUser = { id: '1', username: 'testuser', email: 'test@example.com' };
    getUserFromDB.mockResolvedValue(mockUser); // Mocking resolved value

    const response = await request(server)
      .post('/graphql')
      .send({
        query: `query { getUser(id: "1") { id username email } }`,
      })
      .expect(200);

    // Assert that the response matches the mock data
    expect(response.body.data.getUser).toEqual(mockUser);
  });

  it('should throw an error if the user is not found', async () => {
    // Mock the database call to return null (user not found)
    getUserFromDB.mockResolvedValue(null);

    const response = await request(server)
      .post('/graphql')
      .send({
        query: `query { getUser(id: "999") { id username email } }`,
      })
      .expect(200);

    // Assert that an error is thrown
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].message).toBe('User not found');
  });
});
```

#### **Key Concepts in the Above Example**:

1. **jest.mock()**: This function tells Jest to mock the `getUserFromDB` function in the `database.js` module, so it doesn't make real database calls during tests.
   
2. **getUserFromDB.mockResolvedValue()**: This method simulates the resolved value of a promise returned by `getUserFromDB`. In the first test case, we return a mock user, and in the second test case, we return `null` to simulate a "user not found" scenario.

3. **Supertest**: We use **Supertest** to send HTTP requests to the GraphQL endpoint and test the response.

---

### **2. Mocking Multiple Functions or Modules**

If your resolver interacts with multiple functions (e.g., reading from multiple databases or interacting with external APIs), you can mock multiple functions.

#### **Mocking Multiple Functions Example**:

Suppose you have a resolver that interacts with two functions:

```javascript
// resolvers.js
const { getUserFromDB, sendWelcomeEmail } = require('./services');

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      const user = await getUserFromDB(id);
      if (!user) {
        throw new Error('User not found');
      }
      await sendWelcomeEmail(user.email);
      return user;
    },
  },
};
```

To mock both `getUserFromDB` and `sendWelcomeEmail`, you can do the following:

```javascript
// user.test.js
jest.mock('./services'); // Mock the entire module

const { getUserFromDB, sendWelcomeEmail } = require('./services');

it('should send a welcome email after getting a user', async () => {
  const mockUser = { id: '1', username: 'testuser', email: 'test@example.com' };
  getUserFromDB.mockResolvedValue(mockUser);
  sendWelcomeEmail.mockResolvedValue(true); // Mock email sending

  const response = await request(server)
    .post('/graphql')
    .send({
      query: `query { getUser(id: "1") { id username email } }`,
    })
    .expect(200);

  // Assert that the user data is returned and email was sent
  expect(response.body.data.getUser).toEqual(mockUser);
  expect(sendWelcomeEmail).toHaveBeenCalledWith('test@example.com');
});
```

Here, we're mocking **both** `getUserFromDB` and `sendWelcomeEmail` to ensure the test runs independently of actual database operations and email services.

---

### **3. Mocking External APIs or Services**

If your resolver relies on external APIs (like fetching data from a third-party service), you can mock HTTP requests using libraries such as **`nock`** or **`jest.fn()`**.

#### **Example with `nock`**:

Let’s say you have a resolver that fetches data from an external API:

```javascript
// resolvers.js
const axios = require('axios');

const resolvers = {
  Query: {
    getWeather: async (_, { city }) => {
      const response = await axios.get(`https://api.weather.com/v1/city/${city}`);
      return response.data;
    },
  },
};
```

To mock the `axios.get` request, you can use **nock**:

```bash
npm install --save-dev nock
```

```javascript
// weather.test.js
const nock = require('nock');
const { ApolloServer, gql } = require('apollo-server-express');
const { resolvers } = require('./resolvers');
const express = require('express');
const request = require('supertest');

const typeDefs = gql`
  type Query {
    getWeather(city: String!): Weather
  }

  type Weather {
    temperature: Int
    description: String
  }
`;

describe('GraphQL Resolvers with External API', () => {
  let server;

  beforeAll(() => {
    const app = express();
    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    apolloServer.applyMiddleware({ app });
    server = app.listen(4000);
  });

  afterAll(() => {
    server.close();
  });

  it('should return weather data from the external API', async () => {
    // Mock external API response
    nock('https://api.weather.com')
      .get('/v1/city/London')
      .reply(200, { temperature: 18, description: 'Sunny' });

    const response = await request(server)
      .post('/graphql')
      .send({
        query: `query { getWeather(city: "London") { temperature description } }`,
      })
      .expect(200);

    // Assert the response
    expect(response.body.data.getWeather.temperature).toBe(18);
    expect(response.body.data.getWeather.description).toBe('Sunny');
  });
});
```

In this example, **nock** intercepts the HTTP request to the external weather API and provides a mocked response. This prevents actual HTTP requests from being made during tests.

---

### **4. Best Practices for Mocking Data in GraphQL Testing**

- **Mock Only What You Need**: Mock only

 the external dependencies or functions that your test needs to isolate. For example, don't mock the entire database unless necessary.
- **Ensure Realism**: Make your mock data as realistic as possible to accurately simulate production behavior.
- **Test Both Success and Failure Scenarios**: Test both the happy path (when everything works) and failure cases (e.g., when the database call fails or an external API returns an error).
- **Reset Mocks Between Tests**: Reset mocks between tests using `jest.resetAllMocks()` or similar methods to ensure clean test environments.

---

### **Conclusion**

Mocking data is a key technique for testing GraphQL resolvers, ensuring that tests are focused on business logic without interacting with real databases, APIs, or third-party services. With tools like **Jest**, **Sinon**, and **Nock**, you can effectively mock function calls and external API responses to simulate real-world scenarios.