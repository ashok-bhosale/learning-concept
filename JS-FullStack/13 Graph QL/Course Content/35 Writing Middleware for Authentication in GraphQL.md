
### **Writing Middleware for Authentication in GraphQL**

In GraphQL, middleware is often used to manage tasks that should occur on every request, such as authentication, logging, and error handling. In the context of authentication, middleware can be used to check if a user is authenticated (i.e., if a valid JWT token is present), and if so, attach the authenticated user to the request context. This way, you can access the authenticated user’s information in any resolver.

Here’s how to write middleware to handle authentication in a GraphQL server.

### **Steps to Implement Authentication Middleware**

1. **Set Up the Server**
2. **Write the Middleware**
3. **Apply the Middleware to GraphQL Resolvers**
4. **Handle Unauthenticated Users**

---

### **Step 1: Set Up the Server**

Let’s assume you’re using **Apollo Server** with **JWT Authentication**. You’ll need to set up your GraphQL server first, including the necessary dependencies.

#### **Install Dependencies:**

```bash
npm install apollo-server graphql jsonwebtoken bcryptjs
```

---

### **Step 2: Write the Middleware**

The middleware function will check if the incoming request has a valid JWT token in the `Authorization` header. If the token is valid, it will decode the token and attach the user data to the request context.

Here’s how to write an authentication middleware:

```javascript
// utils/auth.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-secret-key';  // Ensure to use a secure secret

// Middleware function to check for JWT token in headers
function authenticate(req, res, next) {
  const token = req.headers.authorization || '';

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  try {
    // Remove 'Bearer ' prefix from token if it exists
    const tokenValue = token.replace('Bearer ', '');
    const decoded = jwt.verify(tokenValue, SECRET_KEY);

    // Attach decoded user to request object
    req.user = decoded;
    next(); // Proceed to next middleware/handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = { authenticate };
```

#### **Explanation of `authenticate` middleware**:
1. **Extract Token**: The middleware extracts the token from the `Authorization` header. The token is usually prefixed with `Bearer `, so we remove it to get the raw token value.
2. **Verify Token**: The token is then verified using `jsonwebtoken`'s `verify()` function with the `SECRET_KEY`. If the token is invalid or expired, it throws an error.
3. **Attach User Data**: If the token is valid, the user data is decoded from the token and attached to the `req` object (i.e., `req.user`). This makes the user information available in the GraphQL resolvers.

---

### **Step 3: Apply the Middleware to GraphQL**

Now, we need to apply this middleware in the context of an Apollo Server. We’ll use the `context` function to integrate the authentication middleware into our GraphQL request lifecycle. This allows us to use the `req.user` object in the resolvers.

#### **Set Up Apollo Server**

Here’s how to integrate the authentication middleware into an Apollo Server using the `context` function.

```javascript
// server.js
const { ApolloServer, gql } = require('apollo-server');
const { authenticate } = require('./utils/auth');
const jwt = require('jsonwebtoken');

// Sample in-memory data
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
    getUsers: [User]  # Admin-only access
  }

  type Mutation {
    login(username: String!, password: String!): String!  # Returns JWT token
    createUser(username: String!, password: String!, role: String!): User!  # Admin-only
  }
`;

const resolvers = {
  Query: {
    me: (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return user;  // Return the authenticated user
    },

    getUsers: (_, __, { user }) => {
      if (!user || user.role !== 'admin') {
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
      // Generate and return a JWT token
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, 'your-secret-key', { expiresIn: '1h' });
      return token;
    },

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

// Apollo Server setup with context using the authenticate middleware
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = req.user || null;  // Attach user from the request (set by authenticate middleware)
    return { user };
  },
});

// Start the Apollo Server
server.listen(4000).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
```

#### **Explanation of the Context Function**:
1. **`context` Function**: This function is called for every request. Inside it, we check if the `user` object exists on the `req` object (which would have been populated by the `authenticate` middleware).
2. **Passing `user` to Resolvers**: The `user` object is passed into the GraphQL context, which makes it accessible in all resolvers. If the user is authenticated, their information will be available in the resolvers for access control and querying.

---

### **Step 4: Handle Unauthenticated Users**

If a user tries to access a protected resource without being authenticated, the server should respond with an appropriate error message.

In the `me` query, if no user is attached to the request, we throw an error:

```javascript
// In resolvers:
me: (_, __, { user }) => {
  if (!user) throw new Error('Not authenticated');
  return user;
}
```

Similarly, in the `getUsers` and `createUser` mutations, we check if the user is authenticated and has the required role:

```javascript
getUsers: (_, __, { user }) => {
  if (!user || user.role !== 'admin') {
    throw new Error('Permission denied: Admins only');
  }
  return users;
},
```

This way, only authenticated users (with valid tokens) can access certain queries and mutations, and unauthorized requests are denied with an appropriate message.

---

### **Client-Side Example**

Here’s an example of how to send the JWT token with each GraphQL request from the client side. The `Authorization` header should be set to `Bearer <your-token>`.

#### **Apollo Client Setup**

```javascript
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

// Create the Apollo Client with JWT token in headers
const httpLink = createHttpLink({ uri: 'http://localhost:4000' });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');  // Get the JWT token from localStorage
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',  // Attach the token in the Authorization header
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Example of a query
const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

function App() {
  const { loading, data, error } = useQuery(GET_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Welcome, {data.me.username}</h1>
    </div>
  );
}

export default App;
```

---

### **Conclusion**

By following these steps, you’ve successfully implemented **authentication middleware** in a GraphQL server:

1. **JWT Token Extraction**: The middleware checks the `Authorization` header for a valid token.
2. **Token Validation**: The token is validated using the `jsonwebtoken` library, and the decoded user data is attached to the request context.
3. **Context Integration**: The authenticated user data is passed into GraphQL resolvers via the context function.
4. **Authorization Handling**: The resolvers check for authentication and authorization (such as roles) and throw errors if the user is not authenticated or authorized.

This approach allows you

 to protect your GraphQL queries and mutations, ensuring that only authenticated users can access sensitive data.