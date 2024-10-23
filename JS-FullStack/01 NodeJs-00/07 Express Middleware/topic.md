### Express Middleware

Middleware functions in Express.js are functions that execute during the lifecycle of a request to the server. They have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle. Middleware can perform various tasks, such as executing code, modifying the request and response objects, ending the request-response cycle, and calling the next middleware function.

#### Creating Custom Middleware

Custom middleware functions are user-defined functions that add specific functionality to the request-response cycle.

**Example: Custom Middleware for Logging Request Details**

1. **Create Custom Middleware:**

   ```javascript
   const express = require('express');
   const app = express();

   // Custom middleware function
   const requestLogger = (req, res, next) => {
     console.log(`${req.method} request for '${req.url}'`);
     next(); // Pass control to the next middleware function
   };

   // Use the custom middleware
   app.use(requestLogger);

   app.get('/', (req, res) => {
     res.send('Hello, Express with custom middleware!');
   });

   const port = 3000;
   app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
   });
   ```

2. **Run the Application:**

   ```sh
   node app.js
   ```

   Navigate to `http://localhost:3000` in your web browser. Check the terminal to see the logged request details.

#### Using Third-Party Middleware

Express.js supports the use of third-party middleware to extend its functionality. Some common third-party middleware modules are `body-parser` and `morgan`.

1. **body-parser:**

   `body-parser` is used to parse incoming request bodies in a middleware before your handlers, available under the `req.body` property.

   **Installation:**

   ```sh
   npm install body-parser
   ```

   **Usage:**

   ```javascript
   const bodyParser = require('body-parser');

   // Parse application/x-www-form-urlencoded
   app.use(bodyParser.urlencoded({ extended: false }));

   // Parse application/json
   app.use(bodyParser.json());

   app.post('/submit', (req, res) => {
     res.send(`Received data: ${JSON.stringify(req.body)}`);
   });
   ```

2. **morgan:**

   `morgan` is a HTTP request logger middleware for Node.js.

   **Installation:**

   ```sh
   npm install morgan
   ```

   **Usage:**

   ```javascript
   const morgan = require('morgan');

   // Use morgan middleware for logging HTTP requests
   app.use(morgan('tiny'));

   app.get('/', (req, res) => {
     res.send('Hello, Express with morgan logging!');
   });
   ```

#### Example Application with Custom and Third-Party Middleware

**app.js:**

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = 3000;

// Custom middleware function
const requestLogger = (req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next(); // Pass control to the next middleware function
};

// Use the custom middleware
app.use(requestLogger);

// Use third-party middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, Express with middleware!');
});

app.post('/submit', (req, res) => {
  res.send(`Received data: ${JSON.stringify(req.body)}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

**Run the Application:**

```sh
node app.js
```

Navigate to `http://localhost:3000` in your web browser to see the output. Use tools like Postman or cURL to send a POST request to `http://localhost:3000/submit` with some JSON data to test the `body-parser` middleware.

### Summary

- **Creating Custom Middleware:** Custom middleware functions can log requests, validate data, handle errors, and more.
- **Using Third-Party Middleware:** Third-party middleware like `body-parser` and `morgan` can be used to extend Express.js functionality.
  - **body-parser:** Parses incoming request bodies in various formats (URL-encoded, JSON).
  - **morgan:** Logs HTTP requests in a predefined format.

Middleware enhances the modularity and functionality of an Express.js application, making it easier to manage complex request-response cycles.