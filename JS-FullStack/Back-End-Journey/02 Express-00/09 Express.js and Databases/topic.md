Integrating Express.js with databases like MongoDB or MySQL is a common requirement for building web applications. Express.js provides a flexible framework for handling HTTP requests and responses, while databases store and manage the application's data. Here's a general overview of how you can integrate Express.js with these databases and perform CRUD (Create, Read, Update, Delete) operations:

**1. Setting up Express.js:**
   - Install Express.js using npm: `npm install express`
   - Create an Express application:

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

**2. Connecting to MongoDB:**
   - Install the MongoDB driver for Node.js: `npm install mongodb`
   - Connect to MongoDB in your Express application:

```javascript
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // MongoDB connection URI
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
```

**3. Performing CRUD operations with MongoDB:**
   - Create: Insert a document into a collection
   - Read: Retrieve documents from a collection
   - Update: Update documents in a collection
   - Delete: Delete documents from a collection

```javascript
// Example CRUD operations with MongoDB
const db = client.db('myDatabase'); // Replace 'myDatabase' with your database name

// Create
async function createUser(user) {
  const result = await db.collection('users').insertOne(user);
  console.log('User created:', result.insertedId);
}

// Read
async function getUsers() {
  const users = await db.collection('users').find().toArray();
  console.log('Users:', users);
}

// Update
async function updateUser(id, updates) {
  const result = await db.collection('users').updateOne({ _id: id }, { $set: updates });
  console.log('User updated:', result.modifiedCount);
}

// Delete
async function deleteUser(id) {
  const result = await db.collection('users').deleteOne({ _id: id });
  console.log('User deleted:', result.deletedCount);
}
```

**4. Connecting to MySQL:**
   - Install the MySQL module: `npm install mysql`
   - Connect to MySQL in your Express application:

```javascript
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'myDatabase'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});
```

**5. Performing CRUD operations with MySQL:**
   - CRUD operations in MySQL are similar to MongoDB but involve SQL queries.

```javascript
// Example CRUD operations with MySQL
// Assuming you have a 'users' table with columns 'id', 'name', 'email'

// Create
const newUser = { name: 'John', email: 'john@example.com' };
connection.query('INSERT INTO users SET ?', newUser, (error, results) => {
  if (error) throw error;
  console.log('User created:', results.insertId);
});

// Read
connection.query('SELECT * FROM users', (error, results) => {
  if (error) throw error;
  console.log('Users:', results);
});

// Update
const userId = 1;
const updates = { name: 'Updated Name' };
connection.query('UPDATE users SET ? WHERE id = ?', [updates, userId], (error, results) => {
  if (error) throw error;
  console.log('User updated:', results.affectedRows);
});

// Delete
connection.query('DELETE FROM users WHERE id = ?', [userId], (error, results) => {
  if (error) throw error;
  console.log('User deleted:', results.affectedRows);
});
```

Remember to handle errors appropriately and secure your application against common vulnerabilities such as SQL injection when performing database operations. Additionally, consider using an ORM (Object-Relational Mapping) library like Sequelize for MySQL to simplify database interactions and improve code readability.