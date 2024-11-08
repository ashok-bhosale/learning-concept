### **Implementing Role-Based Access Control (RBAC) in GraphQL with JWT Authentication**

Role-Based Access Control (RBAC) allows you to manage access to different parts of your application based on user roles. In a GraphQL application, you can implement RBAC by embedding the user's roles in the JWT token and verifying them in your GraphQL resolvers to control access to specific queries and mutations.

In this guide, we’ll:
- Add roles to the JWT token.
- Implement a middleware that checks the user's role for each request.
- Secure GraphQL queries and mutations based on user roles.

### **Steps to Implement Role-Based Access Control (RBAC) in GraphQL**

1. **Install Dependencies**
2. **Define Roles and Add to JWT Token**
3. **Create Middleware to Check Roles**
4. **Secure GraphQL Endpoints Based on Roles**
5. **Client-Side Role Management**

---

### **Step 1: Install Dependencies**

If you haven't already, install the required dependencies:

```bash
npm install apollo-server graphql jsonwebtoken bcryptjs
```

- **`apollo-server`**: To create the GraphQL server.
- **`graphql`**: For GraphQL schema and queries.
- **`jsonwebtoken`**: To sign and verify JWT tokens.
- **`bcryptjs`**: To hash passwords (optional).

---

### **Step 2: Define Roles and Add to JWT Token**

In our JWT token, we’ll store user roles along with their basic info (like `id` and `username`). For simplicity, we’ll define some basic roles like **admin** and **user**.

#### **2.1. Modify JWT Utility Functions**

First, let's modify the `generateToken` function to include the user's role.

```javascript
// utils/jwt.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-secret-key';  // Change this to a strong secret key

// Generate a JWT Token
function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,  // Add user role to the payload
  };
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

- We’ve added the `role` field to the JWT payload, which will allow us to store and retrieve the user’s role.

---

### **Step 3: Create Middleware to Check Roles**

Now we’ll create a middleware to verify the user's role and control access to specific GraphQL resolvers.

#### **3.1. Modify Apollo Server Context to Include Role Check**

We will modify the context function of Apollo Server to extract the role from the JWT token and verify access rights.

```javascript
// server.js
const { ApolloServer, gql } = require('apollo-server');
const { generateToken, verifyToken } = require('./utils/jwt');

// Sample in-memory data with users and roles
let users = [
  { id: '1', username: 'john', password: 'password123', role: 'user' },
  { id: '2', username: 'admin', password: 'admin123', role: 'admin' },
];

// GraphQL Schema
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    role: String!
  }

  type Query {
    me: User
    getUsers: [User]  # Admins can access this
  }

  type Mutation {
    login(username: String!, password: String!): String!  # Return JWT token
  }
`;

// Resolvers
const resolvers = {
  Query: {
    me: (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return user;
    },
    getUsers: (_, __, { user }) => {
      if (user.role !== 'admin') {
        throw new Error('Permission denied: Admins only');
      }
      return users;
    },
  },
  Mutation: {
    login: (_, { username, password }) => {
      const user = users.find((u) => u.username === username);
      if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
      }
      // Generate JWT token with role
      return generateToken(user);
    },
  },
};

// Apollo Server context function with role-based access
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Check the Authorization header for the JWT token
    const token = req.headers.authorization || '';
    if (token) {
      try {
        const decoded = verifyToken(token); // Decode the JWT token
        const user = users.find((u) => u.id === decoded.id);
        return { user };  // Attach user info (including role) to context
      } catch (err) {
        console.log('Token verification failed:', err);
        throw new Error('Authentication failed');
      }
    }
    return {};  // If no token is present, the user is not authenticated
  },
});

// Start the Apollo Server
server.listen(4000).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
```

#### **Explanation of Changes:**
- **`getUsers` Query**: 
  - This query is restricted to users with the role of `admin`. If a non-admin user tries to access this query, it throws a `Permission denied` error.
- **Context**:
  - We decode the JWT token in the `context` function. This allows us to make the `user` object (including the `role`) available throughout the resolvers. 
  - In `getUsers`, we check if the `user.role` is `admin`. If not, we deny access by throwing an error.

---

### **Step 4: Secure GraphQL Endpoints Based on Roles**

With roles now included in the token and available in the context, we can easily control access to specific resolvers.

#### **4.1. Role-Based Access for Queries and Mutations**

You can control access to any GraphQL resolver based on roles. Here's an example of how to implement more granular access control.

- **Admin-only access** to sensitive data:
  
```javascript
// Admin-only query for accessing all users
const resolvers = {
  Query: {
    getUsers: (_, __, { user }) => {
      if (user.role !== 'admin') {
        throw new Error('Permission denied: Admins only');
      }
      return users;
    },
  },
};
```

- **User-specific access** for other queries:

```javascript
// Only authenticated user can access their own profile
const resolvers = {
  Query: {
    me: (_, __, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      return user;
    },
  },
};
```

- **Role-based permissions** for mutations:

```javascript
// Mutation that can be used only by users with the role "admin"
const resolvers = {
  Mutation: {
    createUser: (_, { username, password, role }, { user }) => {
      if (user.role !== 'admin') {
        throw new Error('Permission denied: Admins only');
      }
      const newUser = { id: String(users.length + 1), username, password, role };
      users.push(newUser);
      return newUser;
    },
  },
};
```

---

### **Step 5: Client-Side Role Management**

On the client side, you'll need to handle authentication and role management. Here's how to use Apollo Client to authenticate and fetch user-specific or role-specific data.

#### **5.1. Apollo Client Setup with JWT Authorization**

Set up Apollo Client to automatically send the JWT token in the `Authorization` header for each request.

```javascript
// client.js
import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery, useMutation } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

// Create Apollo Client with JWT authorization
const httpLink = createHttpLink({ uri: 'http://localhost:4000' });

// Middleware to set Authorization header with JWT token
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

// GraphQL Query to fetch authenticated user (user-specific data)
const GET_ME = gql`
  query {
    me {
      id
      username
      role
    }
  }
`;

// Admin-only Query to fetch all users
const GET_USERS = gql`
  query {
    getUsers {
      id
      username
      role
    }
  }
`;

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  // Query to get authenticated user
  const { data: meData } = useQuery(GET_ME);

  // Query to get all users (Admin only)
  const { data: usersData, error: usersError } = useQuery(GET_USERS);

  // Login mutation
  const [login

] = useMutation(LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login);
      setToken(data.login);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  if (meData) {
    console.log('Authenticated user:', meData.me);
  }

  if (usersError) {
    console.log('Error fetching users:', usersError);
  }

  return (
    <ApolloProvider client={client}>
      <div>
        <h1>GraphQL JWT Authentication with RBAC</h1>
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
            <button type="submit">Login</button>
          </form>
        ) : (
          <div>
            <h2>Welcome, {meData.me.username}</h2>
            <p>Role: {meData.me.role}</p>
            {meData.me.role === 'admin' && (
              <div>
                <h3>All Users</h3>
                <ul>
                  {usersData.getUsers.map((user) => (
                    <li key={user.id}>{user.username} ({user.role})</li>
                  ))}
                </ul>
              </div>
            )}
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

- **`GET_ME` Query**: This query is used to fetch the currently authenticated user's details, including their role.
- **`GET_USERS` Query**: This query can only be executed if the authenticated user is an **admin**. It fetches all users, and the UI checks if the logged-in user is an admin before rendering the list of users.
- **Login Flow**: When a user logs in, the `login` mutation is called. If successful, the JWT token is stored in `localStorage`, and the client automatically sends the token in the `Authorization` header for future requests.

---

### **Conclusion**

You’ve successfully implemented **Role-Based Access Control (RBAC)** in a GraphQL application using **JWT authentication**. This allows you to:
1. Assign roles to users when generating JWT tokens.
2. Use middleware (context function) to decode the token and verify the user’s role.
3. Secure GraphQL resolvers based on user roles, ensuring that only authorized users can access specific resources.

By integrating RBAC with JWT authentication, you have a flexible and scalable way to manage access control in your application.