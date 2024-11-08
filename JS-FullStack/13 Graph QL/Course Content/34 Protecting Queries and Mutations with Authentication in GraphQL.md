### **Protecting Queries and Mutations with Authentication in GraphQL**

To secure a GraphQL API, we need to ensure that only authenticated users can access certain queries and mutations. This is typically done using **JWT (JSON Web Tokens)**, where the token is included in the `Authorization` header of requests. The server verifies the token and grants access to protected resources based on the user's identity.

### **Steps to Protect Queries and Mutations**

1. **Set Up JWT Authentication**
2. **Protect Queries and Mutations**
3. **Return Authenticated User Data**
4. **Handle Unauthorized Access**

Let’s walk through each step in detail.

---

### **Step 1: Set Up JWT Authentication**

Before we can protect queries and mutations, we need to set up JWT authentication to authenticate users.

#### **1.1. Install Required Packages**

Ensure you have the following dependencies installed:

```bash
npm install apollo-server graphql jsonwebtoken bcryptjs
```

- **`jsonwebtoken`**: For generating and verifying JWT tokens.
- **`bcryptjs`**: For hashing and comparing passwords (if you are storing passwords).

#### **1.2. Create JWT Utility Functions**

Let’s create utility functions for generating and verifying JWT tokens.

```javascript
// utils/jwt.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-secret-key';  // This should be a secret you keep secure and private

// Generate JWT token with user data
function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role, // If you have roles, include them here
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });  // Token expires in 1 hour
}

// Verify the JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}

module.exports = { generateToken, verifyToken };
```

This utility provides:
- **`generateToken`**: Takes a `user` object and generates a JWT token.
- **`verifyToken`**: Verifies the token by decoding it with the secret key.

---

### **Step 2: Protect Queries and Mutations**

Now that the JWT token utility is in place, we can protect the GraphQL queries and mutations.

#### **2.1. Set Up Apollo Server**

Let’s set up Apollo Server and define the GraphQL schema. We’ll create a simple authentication mechanism that protects certain queries and mutations using the JWT token.

```javascript
// server.js
const { ApolloServer, gql } = require('apollo-server');
const { generateToken, verifyToken } = require('./utils/jwt');

// Sample in-memory data
let users = [
  { id: '1', username: 'john', password: 'password123', role: 'user' },
  { id: '2', username: 'admin', password: 'admin123', role: 'admin' },
];

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    role: String!
  }

  type Query {
    me: User  # Only accessible by authenticated users
    getUsers: [User]  # Admin-only access
  }

  type Mutation {
    login(username: String!, password: String!): String!  # Return JWT token
    createUser(username: String!, password: String!, role: String!): User!  # Admin-only mutation
  }
`;

const resolvers = {
  Query: {
    // Fetch the currently authenticated user
    me: (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return user;
    },

    // Fetch all users (admin-only)
    getUsers: (_, __, { user }) => {
      if (!user || user.role !== 'admin') {
        throw new Error('Permission denied: Admins only');
      }
      return users;
    },
  },

  Mutation: {
    // Login mutation that generates a JWT token
    login: (_, { username, password }) => {
      const user = users.find((u) => u.username === username);
      if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
      }
      return generateToken(user);  // Return JWT token
    },

    // Admin-only mutation to create new users
    createUser: (_, { username, password, role }, { user }) => {
      if (!user || user.role !== 'admin') {
        throw new Error('Permission denied: Admins only');
      }
      const newUser = { id: String(users.length + 1), username, password, role };
      users.push(newUser);
      return newUser;
    },
  },
};

// Apollo Server context function
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Get the token from the Authorization header
    const token = req.headers.authorization || '';
    let user = null;
    if (token) {
      try {
        // Verify the token and attach user to the context
        const decoded = verifyToken(token);
        user = users.find((u) => u.id === decoded.id);
      } catch (err) {
        console.error('Authentication failed:', err);
      }
    }
    return { user };  // Attach user data to context
  },
});

// Start the Apollo Server
server.listen(4000).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
```

#### **Explanation:**
- **`me` Query**: This query retrieves the currently authenticated user. It checks if the `user` exists in the context, which is populated by the JWT token.
- **`getUsers` Query**: This query is protected and can only be accessed by an authenticated user with the `admin` role. If the user is not an admin, access is denied.
- **`createUser` Mutation**: This mutation is only accessible by users with the `admin` role. If the user does not have admin privileges, access is denied.
- **Authentication and Context**: In the `context` function, we extract the `Authorization` header (which should contain the JWT token) and verify it. If the token is valid, the user data is attached to the context, and that data can be accessed by any resolver.

---

### **Step 3: Return Authenticated User Data**

By adding authentication checks to queries and mutations, you ensure that only authorized users can access or modify certain resources. For example, in the `me` query, we return the user data only if the user is authenticated.

```javascript
Query: {
  me: (_, __, { user }) => {
    if (!user) throw new Error('Not authenticated');
    return user;  // Return the authenticated user
  },
}
```

This ensures that the user’s information is returned only if they have successfully authenticated and their token is valid.

---

### **Step 4: Handle Unauthorized Access**

When a user is not authenticated or doesn’t have the proper permissions, the server should return an appropriate error.

#### **4.1. Unauthorized Access Example**

For example, if an unauthenticated user tries to access the `me` query or if a non-admin user tries to access the `getUsers` query, we throw an error like this:

```javascript
// In resolvers:
if (!user) throw new Error('Not authenticated');  // If user data is not found in context
if (user.role !== 'admin') throw new Error('Permission denied: Admins only');
```

This will result in an error being returned to the client, informing them that they are not authorized to perform the action.

---

### **Client-Side Authentication**

On the client side, you need to send the JWT token in the `Authorization` header with every request to authenticate the user.

#### **5.1. Set Up Apollo Client**

To pass the JWT token with every request, we can use Apollo Client's `setContext` function to add the token to the `Authorization` header.

```javascript
// client.js
import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery, useMutation } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

// Apollo Client setup with JWT token in Authorization header
const httpLink = createHttpLink({ uri: 'http://localhost:4000' });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Queries and Mutations
const GET_ME = gql`
  query {
    me {
      id
      username
      role
    }
  }
`;

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { data, loading, error } = useQuery(GET_ME);
  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login);  // Store token in localStorage
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    login

({ variables: { username, password } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ApolloProvider client={client}>
      <div>
        {!data ? (
          <form onSubmit={handleLogin}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Login</button>
          </form>
        ) : (
          <div>
            <h1>Welcome, {data.me.username}</h1>
            <p>Role: {data.me.role}</p>
            <button onClick={() => localStorage.removeItem('token')}>Logout</button>
          </div>
        )}
      </div>
    </ApolloProvider>
  );
}

export default App;
```

### **Conclusion**

By following these steps, you have:
- Implemented JWT-based authentication.
- Protected GraphQL queries and mutations with authentication checks.
- Ensured that only authenticated users can access protected resources.
- Included role-based access control for more granular security.

This approach ensures that your GraphQL API is both secure and flexible, allowing different levels of access depending on the user’s authentication and role.