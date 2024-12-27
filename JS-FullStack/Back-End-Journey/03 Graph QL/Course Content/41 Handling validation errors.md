
### **Handling Validation Errors in GraphQL Mutations**

In GraphQL APIs, **validation** is crucial for ensuring that the incoming data is correct, well-formed, and meets the requirements of your business logic. Whether you're creating, updating, or deleting records, proper validation will help prevent malformed data from entering the system, improve security, and provide useful error messages for users.

Here’s how to handle **validation errors** in GraphQL mutations effectively.

---

### **1. GraphQL Error Handling Basics**

GraphQL defines the error handling behavior in a way that makes it easy for clients to understand what went wrong. When an error occurs, GraphQL returns the error information in a structured response. A typical error response might look like this:

```json
{
  "data": null,
  "errors": [
    {
      "message": "User name is required",
      "locations": [{ "line": 2, "column": 5 }],
      "path": ["createUser"]
    }
  ]
}
```

In the case of **validation errors**, you can return a specific error message and optionally provide error codes, which can help clients understand the type of validation failure.

### **2. Basic Example of a Mutation with Validation**

Let's assume we have a GraphQL mutation to **create a user**. The user must provide a **valid email** and a **non-empty username**.

#### **Schema Definition**

```graphql
type User {
  id: ID!
  username: String!
  email: String!
}

input CreateUserInput {
  username: String!
  email: String!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
}
```

#### **GraphQL Resolver with Validation**

In the resolver for `createUser`, we can validate the input data before performing any database operations.

```javascript
const { User } = require('./models');  // Sequelize model

const resolvers = {
  Mutation: {
    createUser: async (_, { input }) => {
      const { username, email } = input;

      // Validation
      if (!username || username.trim() === '') {
        throw new Error('Username is required');
      }

      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Invalid email address');
      }

      // Check if email already exists in the database
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('Email is already taken');
      }

      // If validation passes, create the user
      const user = await User.create({ username, email });
      return user;
    },
  },
};
```

### **Explanation**:

1. **Validation Logic**:
   - Check if the `username` is provided and not empty.
   - Check if the `email` is valid using a regular expression.
   - Ensure the email doesn't already exist in the database.

2. **Error Handling**:
   - If any validation fails, throw an error with a specific message. This will be returned in the `errors` array in the GraphQL response.
   - If the validation passes, the user is created and returned.

### **3. Enhanced Error Handling with Custom Error Codes**

While the basic error handling works well, it’s often useful to have **custom error codes** to provide more context about the type of validation failure (e.g., field validation errors, business logic errors, etc.). You can create a custom error class that extends the base `Error` class and includes additional fields like error codes.

#### **Custom Error Class Example**

```javascript
class ValidationError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'ValidationError';
    this.code = code || 'VALIDATION_ERROR';  // Default error code
  }
}
```

Now, modify the resolver to use this custom error class.

#### **GraphQL Resolver with Custom Error Class**

```javascript
const { User } = require('./models');  // Sequelize model
const { ValidationError } = require('./errors');  // Import the custom error

const resolvers = {
  Mutation: {
    createUser: async (_, { input }) => {
      const { username, email } = input;

      // Validation
      if (!username || username.trim() === '') {
        throw new ValidationError('Username is required', 'USERNAME_REQUIRED');
      }

      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        throw new ValidationError('Invalid email address', 'INVALID_EMAIL');
      }

      // Check if email already exists in the database
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new ValidationError('Email is already taken', 'EMAIL_TAKEN');
      }

      // If validation passes, create the user
      const user = await User.create({ username, email });
      return user;
    },
  },
};
```

#### **GraphQL Error Response with Custom Error Codes**

Now, if a validation error occurs, you’ll get a more detailed error response that includes the error code:

```json
{
  "data": null,
  "errors": [
    {
      "message": "Email is already taken",
      "locations": [{ "line": 2, "column": 5 }],
      "path": ["createUser"],
      "extensions": {
        "code": "EMAIL_TAKEN"
      }
    }
  ]
}
```

### **4. Using Validation Libraries for Better UX**

Rather than writing manual validation checks, you can use libraries like **Joi** or **Yup** to handle validation in a more structured and declarative way.

#### **Using Joi for Input Validation**

**Joi** is a popular validation library for JavaScript that can be used to validate input data in a declarative way.

First, install `joi`:

```bash
npm install joi
```

Then use it in your resolver:

```javascript
const Joi = require('joi');
const { User } = require('./models');

// Define Joi validation schema for the input
const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'Username cannot be empty',
    'string.min': 'Username must be at least 3 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email address',
    'string.empty': 'Email cannot be empty',
  }),
});

const resolvers = {
  Mutation: {
    createUser: async (_, { input }) => {
      // Validate input using Joi
      const { error } = createUserSchema.validate(input);
      if (error) {
        // Throw a custom error with validation message and code
        throw new ValidationError(error.details[0].message, 'VALIDATION_FAILED');
      }

      // Check if email already exists
      const existingUser = await User.findOne({ where: { email: input.email } });
      if (existingUser) {
        throw new ValidationError('Email is already taken', 'EMAIL_TAKEN');
      }

      // Create the user if validation passes
      const user = await User.create(input);
      return user;
    },
  },
};
```

### **Explanation**:

- **Joi** is used to define a schema and validate the incoming `input` data. It provides built-in error messages for common validation failures.
- If validation fails, the error message is extracted and thrown as a `ValidationError`.

### **5. Field-Level Validation**

Sometimes, you might want to handle validation for each field individually rather than validating the entire input at once. You can do this by adding validation checks within individual field resolvers.

#### **Example with Field-Level Validation**

```javascript
const resolvers = {
  Mutation: {
    createUser: async (_, { input }) => {
      // Field-level validation
      const { username, email } = input;

      // Validate username
      if (username && username.length < 3) {
        throw new ValidationError('Username must be at least 3 characters long', 'USERNAME_TOO_SHORT');
      }

      // Validate email
      if (email && !/\S+@\S+\.\S+/.test(email)) {
        throw new ValidationError('Invalid email address', 'INVALID_EMAIL');
      }

      // Proceed with the rest of the mutation
      // Example of checking if email already exists in the database
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new ValidationError('Email is already taken', 'EMAIL_TAKEN');
      }

      const user = await User.create({ username, email });
      return user;
    },
  },
};
```

### **6. Summary of Key Techniques for Handling Validation Errors**

- **Throwing Errors**: In GraphQL, you can throw custom errors using `new Error('message')`. To provide more context, extend the base `Error` class with custom error codes.
  
- **Custom Error Codes**: By throwing custom errors with unique codes, you help consumers of your API understand the specific error type (e.g., `USERNAME_REQUIRED`, `INVALID_EMAIL`).

- **Validation Libraries**: Libraries like **Joi** and **Yup** help define and enforce validation schemas for better maintainability.

- **Field-Level Validation**: You can perform validation checks for individual fields within a resolver instead of validating the entire input at once.

- **Error Formatting**: Customize the error response by including helpful fields such as `message`, `extensions.code`, and `path` to make errors more meaningful.

By following these practices, you can ensure robust validation in your GraphQL mutations and provide a better experience for the API consumers.