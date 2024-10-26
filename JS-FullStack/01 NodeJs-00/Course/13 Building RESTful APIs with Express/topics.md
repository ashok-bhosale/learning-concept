Building RESTful APIs with Express is a powerful and flexible way to create robust backend services for web applications. Here's a guide covering the core aspects: handling HTTP methods, validation and error handling, and authentication and authorization.

### Setting Up Express

First, install Express and necessary packages:

```bash
npm install express body-parser cors
```

Create a basic Express server:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### Handling HTTP Methods

RESTful APIs commonly use the following HTTP methods:

- **GET**: Retrieve data
- **POST**: Create new data
- **PUT**: Update existing data
- **DELETE**: Remove data

Example:

```javascript
const users = [];

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET a specific user
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// POST a new user
app.post('/users', (req, res) => {
  const user = { id: Date.now(), ...req.body };
  users.push(user);
  res.status(201).json(user);
});

// PUT to update a user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    Object.assign(user, req.body);
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

// DELETE a user
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    users.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('User not found');
  }
});
```

### Validation and Error Handling

Use middleware to handle validation and errors. A popular validation library is `express-validator`.

```bash
npm install express-validator
```

Example with validation:

```javascript
const { body, validationResult } = require('express-validator');

// POST a new user with validation
app.post('/users', [
  body('name').isString().notEmpty(),
  body('email').isEmail()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = { id: Date.now(), ...req.body };
  users.push(user);
  res.status(201).json(user);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

### Authentication and Authorization

Authentication verifies user identity, while authorization checks permissions. Use `jsonwebtoken` for JWT-based authentication.

```bash
npm install jsonwebtoken bcryptjs
```

Example:

```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secretKey = 'your_secret_key';
const users = [
  // Example user
  { id: 1, username: 'user1', password: bcrypt.hashSync('password1', 8), role: 'user' }
];

// Middleware for authentication
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access Denied');
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).send('Invalid Token');
    req.user = decoded;
    next();
  });
};

// Middleware for authorization
const authorize = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).send('Forbidden');
  next();
};

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(400).send('Invalid Credentials');
  }
});

// Protected route example
app.get('/protected', authenticate, authorize('user'), (req, res) => {
  res.send('This is a protected route');
});
```

### Full Example

Combining everything:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3000;
const secretKey = 'your_secret_key';
const users = [
  { id: 1, username: 'user1', password: bcrypt.hashSync('password1', 8), role: 'user' }
];

// Authentication Middleware
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access Denied');
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).send('Invalid Token');
    req.user = decoded;
    next();
  });
};

// Authorization Middleware
const authorize = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).send('Forbidden');
  next();
};

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(400).send('Invalid Credentials');
  }
});

// CRUD routes with validation
app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.post('/users', [
  body('name').isString().notEmpty(),
  body('email').isEmail()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = { id: Date.now(), ...req.body };
  users.push(user);
  res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    Object.assign(user, req.body);
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index !== -1) {
    users.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('User not found');
  }
});

// Protected route example
app.get('/protected', authenticate, authorize('user'), (req, res) => {
  res.send('This is a protected route');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

This example covers the basic setup and demonstrates how to handle CRUD operations, validation, error handling, and security in an Express-based RESTful API.