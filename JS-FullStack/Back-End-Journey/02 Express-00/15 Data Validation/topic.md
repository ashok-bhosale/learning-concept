Validating user input is essential to ensure the integrity and security of your application's data. The `express-validator` library provides a powerful and flexible way to validate user input in Express.js applications. Let's see how to use `express-validator` for data validation:

**1. Installation:**

First, install `express-validator` using npm:

```
npm install express-validator
```

**2. Usage:**

You can use `express-validator` middleware to validate user input in your route handlers. Here's a basic example:

```javascript
const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route handler with input validation
app.post(
  '/user',
  [
    // Validate name field
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    // Validate email field
    body('email').isEmail().withMessage('Invalid email address')
  ],
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If input is valid, process the request
    const { name, email } = req.body;
    // Example: Save user data to the database
    res.status(201).json({ message: 'User created successfully', user: { name, email } });
  }
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

In this example:
- We use `body()` to define validation rules for each input field.
- The `isLength()` validator checks if the name is at least 3 characters long, and the `isEmail()` validator checks if the email is a valid email address.
- If there are validation errors, we return a 400 Bad Request response with the list of errors.
- If the input is valid, we process the request as needed.

**3. Custom Validation:**

You can also define custom validation functions for complex validation logic. For example:

```javascript
body('age').custom(value => {
  if (value < 18) {
    throw new Error('Age must be at least 18');
  }
  return true;
});
```

**4. Sanitization:**

`express-validator` also provides sanitization functions to clean user input before validation. For example, you can trim whitespace from input strings:

```javascript
body('username').trim().escape();
```

By using `express-validator` for data validation, you can ensure that your Express.js application handles user input securely and reliably, reducing the risk of security vulnerabilities and data corruption.