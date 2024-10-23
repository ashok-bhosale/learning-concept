Defining routes in Express.js allows you to handle incoming HTTP requests and define how your application responds to those requests. You can specify routes for different URLs and HTTP methods, such as GET, POST, PUT, DELETE, etc. Here's how you can create routes and handle different HTTP methods in Express.js:

### Defining Routes in Express.js

1. **Basic Route Handling:**
   - Define routes using the Express application (`app`) object. For example:
     ```javascript
     const express = require('express');
     const app = express();

     // Define a route for the root URL
     app.get('/', (req, res) => {
       res.send('Hello, World!');
     });

     // Define a route for '/about' URL
     app.get('/about', (req, res) => {
       res.send('About Us');
     });

     // Define a route for '/contact' URL
     app.get('/contact', (req, res) => {
       res.send('Contact Us');
     });

     // Start the server
     const PORT = process.env.PORT || 3000;
     app.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
     });
     ```

2. **Route Parameters:**
   - You can define dynamic routes with parameters using colon notation (`:paramName`). For example:
     ```javascript
     // Define a route with a parameter
     app.get('/users/:id', (req, res) => {
       const userId = req.params.id;
       res.send(`User ID: ${userId}`);
     });
     ```

### Handling Different HTTP Methods

Express.js allows you to handle different HTTP methods (GET, POST, PUT, DELETE, etc.) for the same URL route. Here's how you can handle various HTTP methods:

1. **GET Method:**
   ```javascript
   app.get('/books', (req, res) => {
     res.send('Get all books');
   });
   ```

2. **POST Method:**
   ```javascript
   app.post('/books', (req, res) => {
     res.send('Add a new book');
   });
   ```

3. **PUT Method:**
   ```javascript
   app.put('/books/:id', (req, res) => {
     const bookId = req.params.id;
     res.send(`Update book with ID: ${bookId}`);
   });
   ```

4. **DELETE Method:**
   ```javascript
   app.delete('/books/:id', (req, res) => {
     const bookId = req.params.id;
     res.send(`Delete book with ID: ${bookId}`);
   });
   ```

### Route Middleware

Route middleware functions can be used to perform tasks like authentication, logging, data validation, etc., before passing control to the route handler. Here's an example of using middleware:

```javascript
// Middleware function
function logRequest(req, res, next) {
  console.log(`Received ${req.method} request for ${req.url}`);
  next(); // Call the next middleware function
}

// Apply middleware to all routes
app.use(logRequest);

// Define route with middleware
app.get('/dashboard', (req, res) => {
  res.send('Dashboard');
});
```

In this example, the `logRequest` middleware function logs information about each incoming request before passing control to the route handler.

### Conclusion

By defining routes and handling different HTTP methods in Express.js, you can create powerful and flexible web applications and APIs. Route parameters, middleware, and various HTTP methods allow you to handle a wide range of use cases and build robust applications tailored to your specific requirements.