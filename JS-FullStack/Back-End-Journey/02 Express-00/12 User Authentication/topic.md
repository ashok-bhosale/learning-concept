Implementing user authentication involves creating functionality for user registration, login, and using middleware to authenticate requests. Let's walk through each step:

**1. User Registration:**

User registration typically involves collecting user information such as username, email, and password, and storing it securely in a database. Here's an example of how you can implement user registration using Express.js and MongoDB:

```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(express.json());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const db = client.db('myDatabase');
    const usersCollection = db.collection('users');
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      email,
      password: hashedPassword
    };
    await usersCollection.insertOne(newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

In this example, we're hashing the password using `bcrypt` before storing it in the database for security.

**2. User Login:**

User login involves verifying the user's credentials (username/email and password) against the stored data in the database. Here's how you can implement user login:

```javascript
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = client.db('myDatabase');
    const usersCollection = db.collection('users');
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
```

In this login endpoint, we're comparing the hashed password stored in the database with the password provided during login using `bcrypt.compare`.

**3. Middleware for Authentication:**

You can create middleware to authenticate requests by verifying the presence of a valid authentication token in the request headers. Here's how you can implement middleware for authentication:

```javascript
function authenticate(req, res, next) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res.status(401).json({ message: 'Authorization token required' });
  }
  // Here you can implement logic to verify the token (e.g., JWT verification)
  // For simplicity, let's assume a valid token is a string 'secret_token'
  if (authToken !== 'secret_token') {
    return res.status(401).json({ message: 'Invalid authorization token' });
  }
  next();
}

app.get('/protected-resource', authenticate, (req, res) => {
  res.json({ message: 'You have accessed the protected resource' });
});
```

In this example, the `authenticate` middleware checks if the request contains a valid authorization token. If not, it returns a 401 Unauthorized response. Otherwise, it calls `next()` to pass control to the next middleware or route handler.

By implementing user registration, login, and authentication middleware, you can add secure user authentication to your Express.js application.