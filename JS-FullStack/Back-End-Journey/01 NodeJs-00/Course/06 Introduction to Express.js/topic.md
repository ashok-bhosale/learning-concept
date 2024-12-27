
### Introduction to Express.js

Express.js is a fast, unopinionated, minimalist web framework for Node.js. It provides a robust set of features to develop web and mobile applications. This guide will cover setting up an Express.js application, handling routes, and using middleware.

#### Setting up an Express.js Application

1. **Install Node.js and npm:**
   - Ensure Node.js and npm are installed on your system. You can download them from [Node.js official website](https://nodejs.org/).

2. **Initialize a New Node.js Project:**
   - Create a new directory for your project and navigate into it:
     ```sh
     mkdir my-express-app
     cd my-express-app
     ```
   - Initialize a new Node.js project:
     ```sh
     npm init -y
     ```

3. **Install Express:**
   - Install Express using npm:
     ```sh
     npm install express
     ```

4. **Create the Application File:**
   - Create a file named `app.js` and set up a basic Express application:
     ```javascript
     const express = require('express');
     const app = express();
     const port = 3000;

     app.get('/', (req, res) => {
       res.send('Hello, Express!');
     });

     app.listen(port, () => {
       console.log(`Server is running on http://localhost:${port}`);
     });
     ```

5. **Run the Application:**
   - Start the server by running the following command in your terminal:
     ```sh
     node app.js
     ```
   - Open a web browser and navigate to `http://localhost:3000`. You should see "Hello, Express!" displayed.

#### Handling Routes

Routes define the endpoints (URIs) that the server responds to and specify how the application responds to a client request for a particular endpoint.

**Basic Routing:**

```javascript
app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});
```

**Route Parameters:**

```javascript
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});
```

**Query Parameters:**

```javascript
app.get('/search', (req, res) => {
  const query = req.query.q;
  res.send(`Search Query: ${query}`);
});
```

#### Using Middleware

Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application's request-response cycle. They can execute code, modify the request and response objects, end the request-response cycle, and call the next middleware function.

**Application-Level Middleware:**

```javascript
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

app.get('/', (req, res) => {
  res.send('Home Page with Middleware');
});
```

**Router-Level Middleware:**

```javascript
const router = express.Router();

router.use((req, res, next) => {
  console.log('Request Type:', req.method);
  next();
});

router.get('/', (req, res) => {
  res.send('Router Home Page');
});

app.use('/router', router);
```

**Error-Handling Middleware:**

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

**Built-In Middleware:**
- **express.static:** To serve static files.
- **express.json:** To parse incoming requests with JSON payloads.

```javascript
app.use(express.static('public'));
app.use(express.json());
```

**Third-Party Middleware:**
- You can use third-party middleware by installing packages via npm.

**Example: Using morgan for logging**

```sh
npm install morgan
```

```javascript
const morgan = require('morgan');
app.use(morgan('tiny'));
```

### Summary

- **Setting up an Express.js Application:**
  - Initialize a Node.js project and install Express.
  - Create an `app.js` file to set up the server.
  - Define routes to handle different HTTP requests.

- **Handling Routes:**
  - Use `app.get`, `app.post`, `app.put`, `app.delete` for defining routes.
  - Utilize route parameters and query parameters to capture dynamic values.

- **Using Middleware:**
  - Middleware functions can execute code, modify requests/responses, and end the request-response cycle.
  - Implement application-level, router-level, and error-handling middleware.
  - Use built-in and third-party middleware for additional functionality.

Express.js simplifies the process of building web applications with Node.js by providing a robust set of features for routing and middleware management.