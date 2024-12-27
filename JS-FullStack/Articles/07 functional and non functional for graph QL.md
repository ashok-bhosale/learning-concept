Creating a **GraphQL API** using **Node.js** involves not only defining the core functionality (like queries and mutations) but also ensuring the **non-functional features** are implemented to maintain security, scalability, reliability, and performance. Here is a detailed guide, including source code examples, for creating a **Node.js GraphQL API** with all necessary **functional** and **non-functional** features.

### **Functional Features for GraphQL API**

---

### **1. GraphQL Setup**

#### **Install Necessary Dependencies**
```bash
npm install express graphql express-graphql jsonwebtoken dotenv
```

#### **Basic GraphQL Setup**:
```js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const app = express();

// Define GraphQL Schema
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve() {
        return 'Hello, world!';
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createMessage: {
      type: GraphQLString,
      args: { message: { type: GraphQLString } },
      resolve(parent, args) {
        return `Message received: ${args.message}`;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

// Set up GraphQL HTTP server
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,  // Enables GraphiQL, an in-browser GraphQL IDE
}));

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000/graphql');
});
```

### **2. Authentication and Authorization**

#### **JWT Authentication**

Authentication ensures only authorized users can query or mutate the GraphQL API. We will use **JWT** to authenticate users.

```bash
npm install jsonwebtoken express-jwt
```

#### **JWT Authentication Middleware for GraphQL**:
```js
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const secretKey = 'your_secret_key';

// Middleware for JWT Authentication
const authenticate = expressJwt({
  secret: secretKey,
  algorithms: ['HS256'],
  credentialsRequired: false, // Allow access without JWT for public endpoints
});

app.use(authenticate); // Protect all GraphQL endpoints

// Example Mutation: Login endpoint to generate JWT token
app.post('/login', (req, res) => {
  const { username, password } = req.body; // You should verify username and password here
  
  if (username === 'user' && password === 'password') {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});
```

---

### **3. Input Validation**

#### **Using Joi for Validation**

To validate the incoming inputs (args for GraphQL queries or mutations), we can use **Joi** for schema validation.

```bash
npm install joi
```

#### **Joi Validation in GraphQL Resolvers**:
```js
const Joi = require('joi');

const createMessageSchema = Joi.object({
  message: Joi.string().min(3).max(100).required(),
});

// Mutation Resolver with Joi validation
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createMessage: {
      type: GraphQLString,
      args: { message: { type: GraphQLString } },
      resolve(parent, args) {
        const { error } = createMessageSchema.validate(args);
        if (error) {
          throw new Error(error.details[0].message); // Custom error message
        }
        return `Message received: ${args.message}`;
      },
    },
  },
});
```

---

### **4. Error Handling**

Custom error handling is critical to providing meaningful and consistent error messages for clients.

#### **Global Error Handling in GraphQL**:
```js
const { GraphQLError } = require('graphql');

// Use custom error handling in GraphQL resolver
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createMessage: {
      type: GraphQLString,
      args: { message: { type: GraphQLString } },
      resolve(parent, args) {
        try {
          if (!args.message) {
            throw new GraphQLError('Message cannot be empty');
          }
          return `Message received: ${args.message}`;
        } catch (error) {
          throw new GraphQLError(error.message);
        }
      },
    },
  },
});
```

---

### **Non-Functional Features for GraphQL API**

---

### **1. Security**

#### **Helmet.js for HTTP Headers Security**

Helmet helps secure your API by setting various HTTP headers to mitigate common web vulnerabilities.

```bash
npm install helmet
```

#### **Use Helmet.js in Express**:
```js
const helmet = require('helmet');

app.use(helmet());  // Enables various security headers like XSS Protection, Content Security Policy
```

---

### **2. Caching (Using Redis)**

GraphQL queries can be cached to improve performance and reduce database load for frequently requested data.

#### **Setting Up Redis for Caching**:
```bash
npm install redis
```

#### **Caching GraphQL Queries**:
```js
const redis = require('redis');
const client = redis.createClient();

const cacheData = (key, data) => {
  client.setex(key, 3600, JSON.stringify(data)); // Cache data for 1 hour
};

// Example Resolver with Redis Caching
const Query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve(parent, args) {
        const cacheKey = 'hello_message';
        
        // Check if cached data exists
        client.get(cacheKey, (err, cachedData) => {
          if (cachedData) {
            return JSON.parse(cachedData); // Return cached data
          } else {
            const message = 'Hello, world!';
            cacheData(cacheKey, message);
            return message; // Cache and return the data
          }
        });
      },
    },
  },
});
```

---

### **3. Rate Limiting (Using express-rate-limit)**

Prevent abuse of your API by limiting the number of requests a client can make in a given time frame.

```bash
npm install express-rate-limit
```

#### **Rate Limiting Setup**:
```js
const rateLimit = require('express-rate-limit');

// Rate limiting middleware to limit requests to 100 per hour
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // Limit to 100 requests per IP per hour
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/graphql', limiter);  // Apply rate limiter to GraphQL endpoint
```

---

### **4. Logging and Monitoring**

#### **Winston for Logging**:
```bash
npm install winston
```

#### **Setting up Winston**:
```js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/server.log' })
  ],
});

// Log GraphQL requests
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.originalUrl}`);
  next();
});
```

---

### **5. Performance Optimization**

#### **Gzip Compression (Using compression)**

GraphQL responses can be compressed to reduce bandwidth usage.

```bash
npm install compression
```

#### **Enable Gzip Compression**:
```js
const compression = require('compression');
app.use(compression());  // Compress all GraphQL responses
```

---

### **6. Scalability**

Node.js is single-threaded, so to scale the GraphQL API, you can use **cluster** to distribute the load across multiple CPU cores.

#### **Using Node.js Cluster**:
```js
const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;
const express = require('express');
const app = express();

if (cluster.isMaster) {
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  app.listen(4000, () => {
    console.log(`Server running on port 4000 (Worker ${process.pid})`);
  });
}
```

---

### **7. Documentation**

Documentation is essential for making the API easy to understand and use.

#### **Using Apollo Server for Schema Documentation**

Apollo Server automatically generates a GraphQL schema and documentation that can be visualized using **GraphiQL** or **Apollo Studio**.

```bash
npm install apollo-server-express
```

#### **Apollo Server with Express**:
```js
const { ApolloServer, gql } = require('apollo-server-express');

// Define GraphQL Schema
const typeDefs = gql`
  type Query {
   

 hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app }); // Apply Apollo Server middleware to Express app

app.listen(4000, () => {
  console.log(`Server running on http://localhost:4000/graphql`);
});
```

---

### **Conclusion**

In this guide, we’ve covered both **functional** and **non-functional** features for building a robust and secure **GraphQL API** with **Node.js**:

- **Functional features** include authentication, validation, error handling, and GraphQL queries and mutations.
- **Non-functional features** focus on security (JWT, Helmet), caching (Redis), rate limiting, logging, monitoring, scalability (clustering), performance optimization (compression, caching), and documentation.

These are the key pillars of building a **production-grade GraphQL API** that is **secure**, **scalable**, **performant**, and **maintainable**. This structure can be adapted to fit the needs of various applications while ensuring they meet industry standards.