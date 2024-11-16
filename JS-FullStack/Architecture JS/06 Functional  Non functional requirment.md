When developing **Node.js REST APIs** and **GraphQL APIs**, it's essential to cover both **functional** and **non-functional quality attributes**. These attributes ensure that your API is not only functional but also secure, performant, scalable, and maintainable.

Let's go through the **key features** every **Node.js REST** and **GraphQL** API should have, along with the corresponding **source code** to meet the functional and non-functional requirements.

### **1. Functional Quality Attributes**
Functional requirements are those that directly relate to the core behavior of your application, such as handling requests, fetching data, and providing meaningful responses.

#### 1.1 **Authentication and Authorization**
- **Functional Description**: Every API should have proper **authentication** (ensuring the user is who they say they are) and **authorization** (ensuring the user can perform the requested action).
- **Authentication** typically involves JWT (JSON Web Tokens), and **authorization** uses roles and permissions to control access.

**Example (JWT Authentication & Role-based Authorization in Node.js REST)**:
```js
// Middleware for authentication and authorization
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  
  if (!token) return res.status(401).send('Access Denied');
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send('Forbidden');
    }
    next();
  };
};

// Example REST API endpoint
app.get('/api/admin', authenticate, authorize(['admin']), (req, res) => {
  res.send('Welcome Admin');
});
```

- **JWT Authentication**: Verifies the user's identity.
- **Role-based Authorization**: Allows or denies access to specific routes based on the user’s role.

#### 1.2 **Input Validation**
- **Functional Description**: All incoming requests should have input validation to prevent invalid data from reaching the backend. Validation ensures data integrity and guards against attacks such as SQL injection or XSS.

**Example (Input Validation using Joi in Node.js REST)**:
```js
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const validateUserInput = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};

// Example POST endpoint
app.post('/api/users', validateUserInput, async (req, res) => {
  const { name, email, password } = req.body;
  // Proceed with creating a new user
});
```

#### 1.3 **Pagination and Filtering**
- **Functional Description**: For APIs that return large datasets, pagination is a must to prevent overloading the client and the server. Filtering allows clients to fetch only the data they need.

**Example (Pagination and Filtering in Node.js REST)**:
```js
app.get('/api/items', async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  
  const items = await Item.find({
    name: { $regex: search, $options: 'i' }
  })
  .skip((page - 1) * limit)
  .limit(parseInt(limit));
  
  res.json(items);
});
```

#### 1.4 **Error Handling**
- **Functional Description**: Proper error handling is crucial for user experience. Errors should be consistent, user-friendly, and logged appropriately.

**Example (Global Error Handling Middleware in Node.js REST)**:
```js
// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log the error stack
  res.status(500).send({ message: 'Something went wrong!' });
});
```

#### 1.5 **Caching for Performance**
- **Functional Description**: Caching improves the response time of frequently requested data and reduces the load on the server.

**Example (Caching in Node.js REST)**:
```js
const cache = require('memory-cache');

// Middleware to cache data
const cacheData = (key, data) => {
  cache.put(key, data, 60000); // Cache data for 1 minute
};

app.get('/api/items', async (req, res) => {
  const cachedData = cache.get('items');
  if (cachedData) {
    return res.json(cachedData);
  }

  const items = await Item.find();
  cacheData('items', items);
  res.json(items);
});
```

---

### **2. Non-Functional Quality Attributes**
Non-functional requirements focus on the **performance**, **scalability**, **security**, **maintainability**, and **reliability** of your application.

#### 2.1 **Scalability**
- **Non-Functional Description**: The system should be able to scale efficiently as traffic increases. In a Node.js app, this can be achieved by using **load balancing**, **clustering**, and **microservices**.

**Example (Using Node.js Cluster for Multi-core CPUs)**:
```js
const cluster = require('cluster');
const os = require('os');
const express = require('express');

const app = express();
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.listen(3000, () => {
    console.log('API is running on port 3000');
  });
}
```

#### 2.2 **Performance Optimization**
- **Non-Functional Description**: Performance optimization techniques such as **query optimization**, **response compression**, and **database indexing** are essential to improve the overall performance of your API.

**Example (Gzip Compression in Node.js REST)**:
```js
const compression = require('compression');
app.use(compression());  // Enable Gzip compression for all responses
```

#### 2.3 **Security**
- **Non-Functional Description**: Security is paramount. Always sanitize inputs, use **HTTPS** (TLS), and protect against **common attacks** like XSS, CSRF, and SQL Injection.

**Example (Using Helmet.js for Basic Security Headers)**:
```js
const helmet = require('helmet');
app.use(helmet());  // Automatically sets secure HTTP headers

// Prevent XSS by escaping input
const xss = require('xss');
app.post('/api/create', (req, res) => {
  const sanitizedInput = xss(req.body.input);
  // Process sanitized input
});
```

#### 2.4 **Reliability and Fault Tolerance**
- **Non-Functional Description**: Implement **redundancy**, **circuit breakers**, and **retry logic** to make your API more reliable and resilient to failures.

**Example (Retry Logic with Axios in Node.js REST)**:
```js
const axios = require('axios');
const retry = require('async-retry');

const fetchData = async () => {
  return await retry(async () => {
    const response = await axios.get('http://example.com/api/data');
    return response.data;
  }, {
    retries: 3,  // Retry up to 3 times
    factor: 2,   // Exponential backoff
  });
};
```

#### 2.5 **Logging and Monitoring**
- **Non-Functional Description**: Use logging libraries to record application activity and integrate monitoring tools to detect issues early.

**Example (Using Winston for Logging)**:
```js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' }),
  ],
});

app.use((req, res, next) => {
  logger.info(`Request Method: ${req.method}, URL: ${req.url}`);
  next();
});
```

#### 2.6 **API Documentation**
- **Non-Functional Description**: Well-documented APIs are essential for developers to understand how to interact with your service. Tools like **Swagger** or **GraphQL Docs** can automate this.

**Example (Swagger Documentation for Node.js REST API)**:
```js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // Path to API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
```

#### 2.7 **Continuous Integration and Deployment (CI/CD)**
- **Non-Functional Description**: Use **CI/CD

 pipelines** for automated testing, building, and deploying your application to production.

**Example (GitHub Actions for CI/CD)**:
```yaml
name: Node.js CI

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
```

---

### **Summary**

For building **Node.js REST and GraphQL APIs**, here are the core features you must have to meet **functional** and **non-functional quality attributes**:

- **Authentication & Authorization** (e.g., JWT, role-based access)
- **Input Validation** (using tools like Joi or express-validator)
- **Pagination & Filtering** for large datasets
- **Error Handling** for consistent, user-friendly error messages
- **Caching** to reduce load on the backend
- **Scalability** (using clustering, load balancing)
- **Performance Optimizations** (compression, query optimization)
- **Security** (Helmet.js, rate limiting, sanitization)
- **Reliability** (retry logic, circuit breakers)
- **Logging & Monitoring** (using tools like Winston, Datadog)
- **API Documentation** (Swagger for REST, Apollo Server for GraphQL)
- **CI/CD** for automated testing and deployment

By adhering to these guidelines, you ensure that your API is functional, secure, scalable, performant, and maintainable.