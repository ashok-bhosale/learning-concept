
### **Implementing JWT Authentication in GraphQL**

JSON Web Tokens (JWT) are commonly used to implement user authentication in modern web applications. In a GraphQL application, JWT can be used to authenticate requests by including the token in HTTP headers, allowing the server to verify the user’s identity and grant or deny access to specific resources.

Here’s how you can implement JWT authentication in a **GraphQL** server, using **Apollo Server**.

### **Steps to Implement JWT Authentication in GraphQL**

1. **Install Dependencies**
2. **Create JWT Authentication Functions**
3. **Setup Apollo Server**
4. **Middleware to Authenticate Requests**
5. **Secure GraphQL Endpoints**
6. **Client-Side Authentication**

Let’s go step-by-step through these components.

---

### **Step 1: Install Dependencies**

You'll need to install the following dependencies:

- **`apollo-server`**: For GraphQL server.
- **`graphql`**: Core GraphQL library.
- **`jsonwebtoken`**: For creating and verifying JWT tokens.
- **`bcryptjs`**: For hashing passwords (optional, if you want to store and verify user passwords).

Run the following command to install the dependencies:

```bash
npm install apollo-server graphql jsonwebtoken bcryptjs
```

---

### **Step 2: Create JWT Authentication Functions**

JWT tokens typically consist of three parts: **Header**, **Payload**, and **Signature**. The server generates the token after authenticating the user and sends it to the client. The client will then include the token in the `Authorization` header for subsequent requests.

#### **2.1. JWT Utility Functions**

Here’s how you can create utility functions for generating and verifying JWT tokens.

```javascript
// utils/jwt.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-secret-key';  // Change this to a strong secret key

// Generate a JWT Token
function generateToken(user) {
  const payload = { id: user.id, username: user.username };  // Add any user data you want to include in the token
  const options = { expiresIn: '1h' };  // Token expiration time
  return jwt.sign(payload, SECRET_KEY, options);
}

// Verify JWT Token
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}

module.exports = { generateToken, verifyToken };
```

- **`generateToken`**: This function generates a JWT token by signing a payload with the secret key.
- **`verifyToken`**: This function verifies the token by decoding it with the secret key. If the token is invalid or expired, it throws an error.

---

### **Step 3: Set Up Apollo Server**

Set up an Apollo Server that will include authentication checks in each request. We’ll also define a simple user model and authentication mutation.

#### **3.1. Example Server Setup**

Here’s how to set up Apollo Server with authentication logic.

```javascript
// server.js
const { ApolloServer, gql } = require('apollo-server');
const { generateToken, verifyToken } = require('./utils/jwt');

// Sample in-memory data
let users = [
  { id: '1', username: 'john', password: 'password123' },  // Plain-text passwords should be hashed in real applications!
];

// Define GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    login(username: String!, password: String!): String!  // Return JWT token
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    me: (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return user;
    },
  },
  Mutation: {
    login: (_, { username, password }) => {
      const user = users.find((u) => u.username === username);
      if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
      }
      // Generate and return a JWT token
      return generateToken(user);
    },
  },
};

// Create Apollo Server instance with context for authentication
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Check if the request has an Authorization header with the token
    const token = req.headers.authorization || '';
    if (token) {
      try {
        // Verify token and attach user to context
        const decoded = verifyToken(token);
        const user = users.find((u) => u.id === decoded.id);
        return { user };
      } catch (err) {
        console.log('Token verification failed:', err);
        throw new Error('Authentication failed');
      }
    }
    return {};  // No user if token is not provided
  },
});

// Start the server
server.listen(4000).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
```

#### **Explanation of the Server Code:**

- **GraphQL Schema**: 
  - `User`: Represents a user.
  - `Query`: A `me` query to get the authenticated user's data.
  - `Mutation`: A `login` mutation that takes a username and password, verifies the credentials, and returns a JWT token.
  
- **Resolvers**:
  - `login`: This mutation verifies the user's credentials (you can use bcrypt to hash passwords in real applications) and returns a JWT token.
  - `me`: This query returns the current authenticated user. It checks if the `user` exists in the context (which is populated by the JWT token).
  
- **Context Function**: This function checks if the incoming request has a valid JWT token. If the token is valid, it decodes it and attaches the user information to the `context`. The context is then available in all resolvers to access the current user.

- **JWT Authentication**: The token is passed in the `Authorization` header (e.g., `Bearer <token>`). In the context function, the token is verified and the user information is made available in the request context.

---

### **Step 4: Secure GraphQL Endpoints**

Now that the server is set up, you can easily protect your GraphQL endpoints by verifying the user’s JWT in the context function. In the `me` query, for example, we check if the `user` is present in the context. If not, we throw an authentication error.

You can secure other queries and mutations in a similar way by checking for `user` in the context.

---

### **Step 5: Client-Side Authentication**

Now, let’s look at how to authenticate on the client side and make authenticated requests.

#### **5.1. Setting Up Apollo Client**

First, install Apollo Client and GraphQL:

```bash
npm install @apollo/client graphql
```

#### **5.2. Apollo Client Setup with JWT**

Now, set up Apollo Client to include the JWT token in the `Authorization` header for each request.

```javascript
// client.js
import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery, useMutation } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

// Create Apollo Client with JWT authorization
const httpLink = createHttpLink({ uri: 'http://localhost:4000' });

// Middleware to set Authorization header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// GraphQL Query to fetch the authenticated user
const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

// Login Mutation to authenticate and store the token
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  // Query to fetch authenticated user
  const { loading, error, data } = useQuery(GET_ME);

  // Mutation to login and store the token
  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login);  // Store token in localStorage
      setToken(data.login);
    },
  });

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ApolloProvider client={client}>
      <div>
        <h1>GraphQL JWT Authentication</h1>
        {!token ? (
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type

="submit">Login</button>
          </form>
        ) : (
          <div>
            <h2>Welcome, {data.me.username}</h2>
            <button onClick={() => localStorage.removeItem('token')}>Logout</button>
          </div>
        )}
      </div>
    </ApolloProvider>
  );
}

export default App;
```

#### **Explanation of Client-Side Code:**

- **`ApolloClient` Setup**: 
  - We configure Apollo Client to include the JWT token in the `Authorization` header of each request by using `apollo-link-context`.
  
- **`LOGIN` Mutation**: 
  - When the user logs in, the client sends the username and password to the `login` mutation. If the credentials are valid, the server returns a JWT token, which is stored in `localStorage` and used for future requests.
  
- **`GET_ME` Query**: 
  - This query fetches the authenticated user's data. If the user is not authenticated (i.e., no valid token), the server will return an error.

---

### **Conclusion**

You now have a fully functioning **JWT authentication** system with GraphQL. The steps we covered include:

1. **Backend setup** using Apollo Server with JWT-based authentication.
2. **Creating JWT utilities** to generate and verify tokens.
3. **Securing GraphQL queries and mutations** with authentication checks in the context.
4. **Client-side setup** to store and send the JWT token with each request.

This approach ensures that only authenticated users can access certain GraphQL resources and that user sessions can be managed using JWT tokens.