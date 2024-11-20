Creating a Node.js REST API microservice with all key **non-functional features** involves implementing features like security, scalability, reliability, observability, and performance optimizations. Below is a high-level guide to building such a microservice.

---

### **Step 1: Initialize the Project**
1. Create a new Node.js project:
   ```bash
   mkdir rest-api-microservice
   cd rest-api-microservice
   npm init -y
   ```
2. Install required dependencies:
   ```bash
   npm install express cors dotenv helmet morgan winston joi rate-limiter-flexible compression swagger-ui-express
   npm install --save-dev nodemon
   ```

   - **Key Packages**:
     - **Express**: Core framework for building APIs.
     - **Cors**: Enable cross-origin requests.
     - **Dotenv**: Load environment variables.
     - **Helmet**: Enhance API security by setting HTTP headers.
     - **Morgan**: Log HTTP requests.
     - **Winston**: For structured logging.
     - **Joi**: Schema validation.
     - **Rate Limiter**: For rate limiting requests.
     - **Compression**: Gzip compression for responses.
     - **Swagger**: API documentation.

---

### **Step 2: Project Structure**
Organize your microservice for scalability and maintainability:

```
rest-api-microservice/
├── src/
│   ├── config/
│   │   └── dotenv.js
│   ├── controllers/
│   │   └── userController.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   ├── requestLogger.js
│   │   └── rateLimiter.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── logger.js
│   ├── app.js
│   └── server.js
├── .env
├── package.json
├── package-lock.json
└── README.md
```

---

### **Step 3: Implement the Microservice**

#### **3.1 Environment Configuration**
Create a `.env` file for environment variables:
```env
PORT=3000
RATE_LIMIT_WINDOW=60
RATE_LIMIT_MAX=100
NODE_ENV=development
```

Create `src/config/dotenv.js`:
```javascript
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  port: process.env.PORT || 3000,
  rateLimit: {
    windowMs: process.env.RATE_LIMIT_WINDOW * 1000 || 60000,
    max: process.env.RATE_LIMIT_MAX || 100,
  },
  environment: process.env.NODE_ENV || 'development',
};
```

---

#### **3.2 Logging with Winston**
Create `src/utils/logger.js`:
```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

module.exports = logger;
```

---

#### **3.3 Middleware**
**Request Logger: `src/middlewares/requestLogger.js`**
```javascript
const morgan = require('morgan');
const logger = require('../utils/logger');

module.exports = morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
});
```

**Error Handler: `src/middlewares/errorHandler.js`**
```javascript
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};
```

**Rate Limiter: `src/middlewares/rateLimiter.js`**
```javascript
const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
  points: process.env.RATE_LIMIT_MAX || 100,
  duration: process.env.RATE_LIMIT_WINDOW || 60,
});

module.exports = (req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => next())
    .catch(() => res.status(429).json({ message: 'Too Many Requests' }));
};
```

---

#### **3.4 Controller**
**User Controller: `src/controllers/userController.js`**
```javascript
exports.getUsers = (req, res) => {
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ]);
};
```

---

#### **3.5 Routes**
**User Routes: `src/routes/userRoutes.js`**
```javascript
const express = require('express');
const { getUsers } = require('../controllers/userController');
const router = express.Router();

router.get('/', getUsers);

module.exports = router;
```

---

#### **3.6 Main App**
**App Initialization: `src/app.js`**
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const requestLogger = require('./middlewares/requestLogger');
const errorHandler = require('./middlewares/errorHandler');
const rateLimiter = require('./middlewares/rateLimiter');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(requestLogger);
app.use(rateLimiter);

// Routes
app.use('/api/users', userRoutes);

// Error Handler
app.use(errorHandler);

module.exports = app;
```

---

#### **3.7 Start the Server**
**Server Entry Point: `src/server.js`**
```javascript
const app = require('./app');
const config = require('./config/dotenv');
const logger = require('./utils/logger');

app.listen(config.port, () => {
  logger.info(`Server is running on http://localhost:${config.port}`);
});
```

---

### **Step 4: Add API Documentation**
Use Swagger for API documentation:
1. Install Swagger dependencies:
   ```bash
   npm install swagger-jsdoc swagger-ui-express
   ```

2. Add Swagger setup in `src/app.js`:
   ```javascript
   const swaggerJsDoc = require('swagger-jsdoc');
   const swaggerUi = require('swagger-ui-express');

   const swaggerOptions = {
     definition: {
       openapi: '3.0.0',
       info: {
         title: 'REST API Microservice',
         version: '1.0.0',
         description: 'A sample microservice',
       },
     },
     apis: ['./src/routes/*.js'],
   };

   const swaggerDocs = swaggerJsDoc(swaggerOptions);
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
   ```

---

### **Step 5: Start and Test the Microservice**
1. Start the server:
   ```bash
   npm run start
   ```
2. Open `http://localhost:3000/api-docs` for Swagger API documentation.
3. Test the API endpoints using Postman or curl:
   ```bash
   curl http://localhost:3000/api/users
   ```

---

### Non-Functional Features Implemented:
1. **Security**: Helmet for headers, CORS for cross-origin, and rate limiting.
2. **Performance**: Compression for responses.
3. **Scalability**: Modular structure, middleware-based design.
4. **Logging**: Winston for structured logs.
5. **Documentation**: Swagger integration.
6. **Reliability**: Error handling with centralized middleware.
7. **Validation**: Joi can be added for request validation. 

This setup ensures a production-ready Node.js REST API microservice with essential non-functional requirements!