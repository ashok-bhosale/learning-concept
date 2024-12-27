Let's build a **real-world example** of a **scalable microservices architecture** using **Node.js (Express)**, **GraphQL**, **REST**, **JWT authentication**, and an **event-driven** approach with **RabbitMQ** for asynchronous messaging. This sample microservice system will demonstrate:

- **REST and GraphQL APIs**.
- **JWT-based authentication** and **role-based access control (RBAC)**.
- **Service-to-service communication** using REST and GraphQL.
- **Event-driven architecture** with RabbitMQ.
- **Database-per-service pattern**.
- **Logging**, **monitoring**, and **scalability** considerations.

### Scenario: **E-Commerce Application**

Let's say we are building a simplified **E-commerce Platform** with the following services:

1. **User Service**: Handles user authentication, profiles, and role management.
2. **Product Service**: Manages product catalog and inventory.
3. **Order Service**: Manages customer orders and payment processing.
4. **Notification Service**: Sends notifications to users (email, SMS) upon order placement.

### Tools & Technologies Used

- **Node.js + Express** for REST APIs.
- **Apollo Server** for GraphQL API.
- **JWT Authentication** for stateless user authentication.
- **MongoDB** for the User Service, **PostgreSQL** for the Product Service, and **RabbitMQ** for event-driven communication.
- **Docker** for containerization.
- **Prometheus** for monitoring and **Grafana** for dashboards.
- **JWT** for authentication.
- **Apollo Federation** for GraphQL microservices federation.

---

### **Microservices Breakdown**

1. **User Service** (Handles authentication and user data):
    - Exposes a REST API for user login and a GraphQL API for retrieving user profiles.
    - Uses MongoDB to store user data.

2. **Product Service** (Manages product catalog and inventory):
    - Exposes both a REST API for CRUD operations and a GraphQL API to query product data.
    - Uses PostgreSQL for product data storage.

3. **Order Service** (Manages customer orders and payment processing):
    - Exposes a REST API for creating and managing orders.
    - Uses PostgreSQL for order management.
    - Publishes an event to **RabbitMQ** when an order is placed to notify the **Notification Service**.

4. **Notification Service** (Handles notifications like email or SMS):
    - Subscribes to events published by the **Order Service** (using **RabbitMQ**) to send notifications.
    - Sends emails or SMS upon successful order placement.

---

### **Sample Code for Each Service**

#### **1. User Service (Authentication)**

**user-service.js (Express & JWT Authentication)**:

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const SECRET_KEY = 'your_jwt_secret';

// User Schema (MongoDB)
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String, // e.g., 'admin', 'user'
});
const User = mongoose.model('User', userSchema);

// Middleware for JWT validation
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Login Route (REST API)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY);
  res.json({ token });
});

// User Profile Query (GraphQL)
app.use('/graphql', authenticateJWT, async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json({ data: user });
});

mongoose.connect('mongodb://localhost:27017/userservice', { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(3001, () => console.log('User Service running on port 3001'));
```

#### **2. Product Service (REST + GraphQL)**

**product-service.js (Express REST + Apollo GraphQL)**:

```javascript
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();

// Database setup (PostgreSQL)
const sequelize = new Sequelize('postgres://user:password@localhost:5432/productdb');
const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT },
  quantity: { type: DataTypes.INTEGER },
});

// GraphQL schema
const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    quantity: Int!
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  type Mutation {
    createProduct(name: String!, price: Float!, quantity: Int!): Product
  }
`;

const resolvers = {
  Query: {
    products: () => Product.findAll(),
    product: (_, { id }) => Product.findByPk(id),
  },
  Mutation: {
    createProduct: (_, { name, price, quantity }) => {
      return Product.create({ name, price, quantity });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

// REST API for Product CRUD
app.get('/products', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

app.listen(3002, () => console.log('Product Service running on port 3002'));
```

#### **3. Order Service (REST API + Event-driven)**

**order-service.js (Express & RabbitMQ for Event Communication)**:

```javascript
const express = require('express');
const axios = require('axios');
const amqp = require('amqplib/callback_api');
const app = express();

// Order Schema (PostgreSQL)
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://user:password@localhost:5432/orderdb');
const Order = sequelize.define('Order', {
  productId: { type: DataTypes.INTEGER },
  quantity: { type: DataTypes.INTEGER },
  totalPrice: { type: DataTypes.FLOAT },
});

const RABBITMQ_URL = 'amqp://localhost';

// RabbitMQ Connection and Channel Setup
function publishOrderEvent(order) {
  amqp.connect(RABBITMQ_URL, (err, connection) => {
    connection.createChannel((err, channel) => {
      const queue = 'order_events';
      const message = JSON.stringify(order);
      channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
      console.log('Order event sent:', message);
    });
  });
}

// Order creation route (REST API)
app.post('/orders', async (req, res) => {
  const { productId, quantity, totalPrice } = req.body;
  const order = await Order.create({ productId, quantity, totalPrice });

  // Publish event to RabbitMQ
  publishOrderEvent(order);

  res.status(201).json(order);
});

app.listen(3003, () => console.log('Order Service running on port 3003'));
```

#### **4. Notification Service (RabbitMQ Subscriber)**

**notification-service.js (Subscriber)**:

```javascript
const amqp = require('amqplib/callback_api');

const RABBITMQ_URL = 'amqp://localhost';

amqp.connect(RABBITMQ_URL, (err, connection) => {
  connection.createChannel((err, channel) => {
    const queue = 'order_events';
    channel.assertQueue(queue, { durable: true });
    console.log('Waiting for messages in %s', queue);
    channel.consume(queue, (msg) => {
      const order = JSON.parse(msg.content.toString());
      console.log('Received order event:', order);

      // Send notification (email, SMS)
      sendNotification(order);
    }, { noAck: true });
  });
});

function sendNotification(order) {
  // Here, you can integrate with an email or SMS service
  console.log(`Sending notification for Order ID: ${order.id}`);
}

```

---

### **5. Service Deployment and Communication**

- **Service Discovery**: If you're deploying in a containerized environment (like **Docker** or **Kubernetes**), use **Consul** or **Kubernetes service discovery** for service registration and discovery.
  
- **API Gateway**: You can use **Express Gateway**, **Kong**, or **NGINX** to act as a reverse proxy and provide a unified endpoint for accessing different services (e.g., `/user-service`, `/product-service`, etc.).

- **Event Communication**: RabbitMQ will be the message broker, enabling the **Order Service** to send events (e.g., order placed) and the **Notification Service** to process them asynchronously.

---

### **6. Deployment (Docker)**

Use **Docker** to containerize the services:

**Dockerfile Example for User Service**:

```dockerfile
FROM node:14

WORK

DIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "user-service.js"]
```

**docker-compose.yml** (For multi-service setup):

```yaml
version: '3'
services:
  user-service:
    build: ./user-service
    ports:
      - "3001:3001"
    networks:
      - app-network

  product-service:
    build: ./product-service
    ports:
      - "3002:3002"
    networks:
      - app-network

  order-service:
    build: ./order-service
    ports:
      - "3003:3003"
    networks:
      - app-network

  notification-service:
    build: ./notification-service
    networks:
      - app-network

  rabbitmq:
    image: "rabbitmq:management"
    ports:
      - "15672:15672"
      - "5672:5672"

networks:
  app-network:
    driver: bridge
```

---

### **7. Key Points**

- **Authentication & Authorization**: Use JWTs to authenticate users, ensure that roles and permissions are enforced through the API gateway or service layers.
- **Service-to-Service Communication**: Use REST for synchronous communication (e.g., `GET /products`), and use RabbitMQ for asynchronous communication between services (e.g., order events).
- **Scalability**: Services are independently deployable and can scale horizontally by adding more instances.
- **Monitoring & Logging**: Centralize logs using **ELK** stack or **Prometheus** and **Grafana**.
- **Event-driven**: RabbitMQ handles communication between services, ensuring decoupling and fault tolerance.

---

This microservices architecture for an **E-commerce** system provides a robust, scalable, and low-latency solution, fulfilling all the requirements mentioned in the previous discussion.