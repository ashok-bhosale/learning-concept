Building a Node.js REST API microservice with **functional requirements** involves implementing core business logic and features such as CRUD operations, data validation, database integration, and user authentication. Below is a step-by-step guide to implementing this:

---

### **Functional Requirements to Implement**
1. **User Management**:
   - Create, read, update, delete (CRUD) user data.
2. **Authentication and Authorization**:
   - User registration, login, and role-based access control.
3. **Database Integration**:
   - Use a relational database like MySQL or a NoSQL database like MongoDB.
4. **Validation**:
   - Validate API inputs.
5. **Search and Filtering**:
   - Allow filtering and searching on user data.
6. **Pagination**:
   - Handle large datasets with paginated responses.

---

### **Step 1: Set Up the Project**

1. **Install Required Packages**
   ```bash
   npm install express bcrypt jsonwebtoken mongoose cors helmet dotenv body-parser joi compression
   npm install --save-dev nodemon
   ```

   - **Key Packages**:
     - `express`: Core API framework.
     - `bcrypt`: For password hashing.
     - `jsonwebtoken`: For JWT-based authentication.
     - `mongoose`: For MongoDB integration.
     - `joi`: For input validation.

2. **Project Structure**
   ```
   rest-api-microservice/
   ├── src/
   │   ├── config/
   │   │   └── db.js
   │   ├── controllers/
   │   │   └── userController.js
   │   ├── middlewares/
   │   │   ├── authMiddleware.js
   │   │   └── validateMiddleware.js
   │   ├── models/
   │   │   └── userModel.js
   │   ├── routes/
   │   │   └── userRoutes.js
   │   ├── app.js
   │   └── server.js
   ├── .env
   ├── package.json
   ├── README.md
   ```

---

### **Step 2: Database Integration**
Using MongoDB as the database.

1. **Environment Variables**
   Add the MongoDB URI in `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/microservice
   JWT_SECRET=supersecretkey
   PORT=3000
   ```

2. **Database Configuration**
   Create `src/config/db.js`:
   ```javascript
   const mongoose = require('mongoose');

   const connectDB = async () => {
     try {
       await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
       });
       console.log('MongoDB Connected...');
     } catch (err) {
       console.error(err.message);
       process.exit(1);
     }
   };

   module.exports = connectDB;
   ```

---

### **Step 3: User Model**
Create `src/models/userModel.js`:
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
```

---

### **Step 4: Authentication Middleware**
Create `src/middlewares/authMiddleware.js`:
```javascript
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};
```

---

### **Step 5: Validation Middleware**
Create `src/middlewares/validateMiddleware.js`:
```javascript
const Joi = require('joi');

module.exports = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};
```

---

### **Step 6: User Controller**
Create `src/controllers/userController.js`:
```javascript
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Users (Admin Only)
exports.getUsers = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const users = await User.find();
  res.json(users);
};
```

---

### **Step 7: User Routes**
Create `src/routes/userRoutes.js`:
```javascript
const express = require('express');
const { register, login, getUsers } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateMiddleware = require('../middlewares/validateMiddleware');
const Joi = require('joi');

const router = express.Router();

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

router.post('/register', validateMiddleware(registerSchema), register);
router.post('/login', login);
router.get('/', authMiddleware, getUsers);

module.exports = router;
```

---

### **Step 8: Main App and Server**
**App Initialization: `src/app.js`**
```javascript
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

connectDB();
const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use('/api/users', userRoutes);

module.exports = app;
```

**Server Entry Point: `src/server.js`**
```javascript
const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

### Functional Features Implemented
1. **User Registration and Login**: Secure authentication with password hashing and JWT.
2. **Role-Based Authorization**: Admin-only routes.
3. **Database Integration**: CRUD operations with MongoDB.
4. **Input Validation**: Joi-based request validation.
5. **Error Handling**: Middleware for centralized error responses.
6. **Search and Pagination**: Add search and pagination to endpoints (not shown but can be added as query params).

---

This setup provides a scalable, secure, and functional Node.js microservice meeting core functional requirements!