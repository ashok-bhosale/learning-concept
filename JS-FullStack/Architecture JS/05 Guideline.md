To build an **industry-standard** and **scalable** full-stack application using **Node.js REST API**, **GraphQL**, and **Angular**, there are certain best practices, guidelines, and architectural patterns that should be followed. These guidelines focus on improving **maintainability**, **security**, **performance**, and **scalability**.

Let's break this down for each part of the stack:

---

### **Node.js REST API Best Practices**

1. **Project Structure & Modularity**:
   - Organize your Node.js application in a modular and clean way, following a **Layered Architecture** or **MVC (Model-View-Controller)** pattern:
     ```
     ├── src/
     │   ├── config/         # Configuration files (database, environment, etc.)
     │   ├── controllers/    # Logic for handling requests
     │   ├── routes/         # API routes
     │   ├── services/       # Business logic
     │   ├── models/         # Database models
     │   ├── middleware/     # Custom middlewares (authentication, validation)
     │   ├── utils/          # Utility functions (logger, error handler)
     │   ├── app.js          # Main app file where Express app is set up
     │   └── server.js       # Server start point
     └── .env                # Environment variables
     ```
   - **Controller** should handle HTTP request parsing, while **services** should manage business logic.
   - Keep your **models** in a separate folder for **data** representation and database interaction.

2. **Routing and RESTful Standards**:
   - Use **RESTful conventions** for route design (i.e., **GET** for fetching data, **POST** for creating resources, **PUT/PATCH** for updating, and **DELETE** for removing resources).
     Example:
     ```js
     app.get('/api/users', userController.getAllUsers); // GET all users
     app.post('/api/users', userController.createUser); // POST create a new user
     app.put('/api/users/:id', userController.updateUser); // PUT update user by ID
     app.delete('/api/users/:id', userController.deleteUser); // DELETE user by ID
     ```

3. **Validation and Error Handling**:
   - Use **Joi** or **celebrate** for input validation.
   - Ensure proper error handling with **try-catch blocks** and **custom error classes**. Consider using **middleware** for handling errors globally.
   ```js
   // Error middleware
   app.use((err, req, res, next) => {
     console.error(err.stack);
     res.status(err.statusCode || 500).send({ message: err.message });
   });
   ```

4. **Authentication & Authorization**:
   - Use **JWT (JSON Web Tokens)** for stateless authentication.
   - Store JWT tokens securely, preferably in HTTP-only cookies, or use **Authorization** headers with Bearer tokens.
   - Implement **Role-Based Access Control (RBAC)** or **Permission-Based Access** for protecting specific routes or resources.
   ```js
   const jwt = require('jsonwebtoken');
   const user = jwt.verify(token, process.env.JWT_SECRET);
   ```

5. **Logging and Monitoring**:
   - Use **winston** or **bunyan** for logging requests and errors.
   - Log HTTP request data, responses, and error stack traces.
   - Set up **application monitoring** with **Prometheus**, **Datadog**, or **NewRelic**.
   
6. **Security Practices**:
   - Always sanitize input to avoid **SQL Injection**, **XSS**, and other attacks.
   - Use **helmet.js** to set HTTP headers that secure your application.
   - **CORS (Cross-Origin Resource Sharing)** management: Define your CORS policy explicitly.
   ```js
   app.use(cors({
     origin: 'http://your-frontend-url',
     methods: 'GET, POST, PUT, DELETE',
     allowedHeaders: 'Content-Type, Authorization'
   }));
   ```
   - Implement **rate-limiting** to prevent DDoS attacks (e.g., **express-rate-limit**).

7. **Environment Configuration**:
   - Keep sensitive data such as database credentials, JWT secrets, etc., in `.env` files and use libraries like **dotenv** to load environment variables.
   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   JWT_SECRET=your_jwt_secret
   ```

8. **Database Interaction**:
   - Use **ORM/ODM** libraries like **Sequelize** (for SQL) or **Mongoose** (for MongoDB).
   - Use **pagination** and **search filters** to improve API performance, especially for large datasets.
     Example:
     ```js
     const users = await User.findAll({
       limit: 10,
       offset: 20,
       where: {
         name: { [Op.like]: `%${searchTerm}%` }
       }
     });
     ```

9. **Testing**:
   - Use **Jest** or **Mocha** for unit and integration testing.
   - Write tests for your controllers, services, and middleware.
   - Use **supertest** to test your API endpoints.
   ```js
   const request = require('supertest');
   const app = require('../app');
   describe('GET /api/users', () => {
     it('should return all users', async () => {
       const response = await request(app).get('/api/users');
       expect(response.status).toBe(200);
     });
   });
   ```

---

### **Node.js GraphQL API Best Practices**

1. **Schema Design**:
   - Start with designing a clear **GraphQL schema** that reflects your data model. Use **type definitions** (e.g., **Query**, **Mutation**, **Subscription**) to define what data can be queried or mutated.
   ```graphql
   type User {
     id: ID!
     name: String!
     email: String!
   }

   type Query {
     getUser(id: ID!): User
   }

   type Mutation {
     createUser(name: String!, email: String!): User
   }
   ```

2. **Resolvers**:
   - Resolvers should be **pure functions** that only return the data. Avoid putting business logic in resolvers. Use **services** for business logic.
   - Keep resolvers efficient by batching database calls using tools like **DataLoader** to prevent the N+1 query problem.
   ```js
   const { User } = require('../models');
   const resolvers = {
     Query: {
       getUser: (_, { id }) => User.findById(id),
     },
   };
   ```

3. **Authentication & Authorization**:
   - Use **JWT** for authentication in GraphQL. You can pass the token via the `Authorization` header.
   - Implement authentication and authorization middleware in resolvers. Ensure that protected queries or mutations can only be accessed by authorized users.
   ```js
   const { AuthenticationError } = require('apollo-server');
   const authenticate = (context) => {
     const token = context.req.headers['authorization'] || '';
     if (!token) throw new AuthenticationError('Not authenticated');
     return jwt.verify(token, process.env.JWT_SECRET);
   };
   ```

4. **Error Handling**:
   - Return proper error messages using **Apollo Server** error handling tools. Use custom error classes to handle specific application errors (e.g., **NotFoundError**, **ValidationError**).
   ```js
   const { UserNotFoundError } = require('../errors');
   const resolvers = {
     Query: {
       getUser: async (_, { id }) => {
         const user = await User.findById(id);
         if (!user) throw new UserNotFoundError();
         return user;
       },
     },
   };
   ```

5. **Optimizing Performance**:
   - Use **Apollo Server** with caching mechanisms (e.g., **Apollo Federation** and **DataLoader**) to optimize data fetching.
   - Implement query complexity analysis to prevent overly expensive queries from executing.
   - Apply pagination techniques to large datasets, using **cursor-based pagination** for better scalability.

6. **Subscriptions**:
   - Use **WebSockets** or **Apollo Server subscriptions** to handle real-time data updates in your GraphQL API.

---

### **Angular Best Practices**

1. **Project Structure**:
   - Organize your Angular project following the **Modular Architecture** pattern:
     ```
     ├── src/
     │   ├── app/
     │   │   ├── modules/
     │   │   ├── core/             # Singleton services, interceptors, guards
     │   │   ├── shared/           # Shared components, pipes, directives
     │   │   ├── features/         # Feature modules
     │   │   └── app.module.ts     # Root module
     └── .env                       # Environment-specific configurations
     ```

2. **State Management**:
   - Use **NgRx** for complex state management needs. For smaller apps, use Angular's built-in **RxJS** and **BehaviorSubject**/**Subject**.
   - Maintain a **unidirectional data flow** from components to services and back.

3. **Routing**:
   - Use **Lazy Loading** for large modules to improve initial load time.
   - Implement route guards for **authentication** and **authorization**.
   ```ts
   const routes: Routes = [
     { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
   ];
   ```

4.

 **HTTP Requests**:
   - Use **HttpClientModule** to make HTTP requests. For **REST** calls, define an **HttpInterceptor** to manage authentication tokens and handle errors globally.
   ```ts
   import { HttpClient } from '@angular/common/http';
   this.http.get('api/items').subscribe(response => { ... });
   ```

5. **Forms**:
   - Use **Reactive Forms** for complex forms and ensure proper **form validation**.
   - Use **FormGroup**, **FormControl**, and **Validators** for validation logic.

6. **Security**:
   - Sanitize input using **Angular’s built-in sanitization** for cross-site scripting (XSS) protection.
   - Use **CSP (Content Security Policy)** headers to restrict resources.
   - Use **JWT** or **OAuth** for managing user authentication securely.

7. **Testing**:
   - Write **unit tests** using **Jasmine** and **Karma**.
   - Use **Protractor** for **end-to-end testing** of the application.

---

### **Final Thoughts**

By adhering to these industry-standard best practices for each part of the stack (Node.js REST API, GraphQL, and Angular), you'll ensure that your application is **secure**, **scalable**, and **easy to maintain**.

- **Security** is always a priority—ensure proper validation, authentication, and authorization.
- **Code quality** should be maintained with a modular structure and proper error handling.
- **Performance** considerations (caching, pagination, lazy loading) will ensure your application is efficient and fast.
