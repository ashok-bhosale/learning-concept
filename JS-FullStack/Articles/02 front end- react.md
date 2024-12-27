Let's create a simple **frontend application** using **React** that will communicate with the **User Service**, **Product Service**, and **Order Service** via the **REST APIs** we built previously. We'll use **Axios** to make HTTP requests to these services, and **React** to manage the UI components.

We'll implement the following functionality:

- **User Login** (with JWT authentication).
- **Product Listing** (fetch products from the Product Service).
- **Create Order** (create an order through the Order Service).

Here’s a basic implementation of the frontend:

### Step 1: Install Necessary Dependencies

First, you need to set up a React app and install the dependencies:

```bash
npx create-react-app e-commerce-frontend
cd e-commerce-frontend
npm install axios react-router-dom
```

### Step 2: Create Axios Instance for API Calls

We will configure Axios to handle HTTP requests, including setting the **Authorization header** for JWT-based authentication.

#### `src/api.js`

```javascript
import axios from 'axios';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // Base URL of your User service
});

// Set Authorization token globally if it's available
const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers['Authorization'];
  }
};

export { axiosInstance, setAuthToken };
```

### Step 3: Create User Authentication (Login)

We will implement a login form that allows the user to enter their **email** and **password**, and once authenticated, the JWT token will be stored in **localStorage**.

#### `src/components/Login.js`

```javascript
import React, { useState } from 'react';
import { axiosInstance, setAuthToken } from '../api';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token); // Store JWT in local storage
      setAuthToken(token); // Set the JWT in Axios headers
      history.push('/products'); // Redirect to product listing page
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
```

### Step 4: Fetch Product Data

The **ProductService** provides a `GET /products` endpoint, which we will call to list the products available for order.

#### `src/components/ProductList.js`

```javascript
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../api';
import { useHistory } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  // Fetch products when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products');
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching products');
      }
    };
    fetchProducts();
  }, []);

  const handleCreateOrder = async (productId) => {
    const quantity = prompt('Enter quantity for the product:');
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      alert('Invalid quantity!');
      return;
    }

    try {
      const response = await axiosInstance.post('/orders', {
        productId,
        quantity,
        totalPrice: 100 * quantity, // Simplified total price calculation
      });
      alert('Order created successfully!');
    } catch (err) {
      setError('Error creating order');
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <p>{product.name} - ${product.price}</p>
            <button onClick={() => handleCreateOrder(product.id)}>Create Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
```

### Step 5: Create Order Form

We have already integrated the **Create Order** functionality into the product listing, where users can choose the quantity and create an order directly.

### Step 6: Setup Routes and App Structure

Now, let's set up React Router to navigate between the login page and the product listing page. We'll use **localStorage** to check if the user is logged in (based on the JWT token).

#### `src/App.js`

```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import ProductList from './components/ProductList';

const App = () => {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Router>
      <div>
        <h1>E-Commerce Platform</h1>
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/products"
            render={() => (isAuthenticated ? <ProductList /> : <Login />)}
          />
          <Route path="/" exact component={Login} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
```

### Step 7: Start the Application

Run your React app:

```bash
npm start
```

Now you should be able to:

1. **Login** with a valid user and receive a JWT token.
2. **View the list of products** from the **Product Service**.
3. **Create an order** by selecting a product and entering the quantity.

---

### Key Points:

1. **User Authentication**: The login page sends a POST request to the User Service's `/login` endpoint. Upon successful login, the JWT token is stored in `localStorage` and attached to subsequent requests using Axios' `setAuthToken` function.
   
2. **Product Listing**: The Product Service's `/products` endpoint is called to fetch the product list and display it to the user.

3. **Create Order**: When a user clicks on "Create Order," it sends a POST request to the Order Service's `/orders` endpoint with the `productId`, `quantity`, and `totalPrice`.

4. **Routing**: React Router is used to manage navigation between the login page and the product listing page.

5. **Error Handling**: Basic error handling is implemented, with error messages displayed if the API requests fail.

---

### Next Steps:

To extend this frontend:

- Add **user registration** in the `User Service` to create new users.
- Handle **order history** by creating a `GET /orders` endpoint and displaying it in a separate page.
- Implement **Role-based Access Control (RBAC)**, where users with certain roles (e.g., "admin") can manage products or orders.
- Add **client-side validation** for user inputs (e.g., ensure valid product quantity).
- Integrate with a **real-time notification system** (e.g., websockets or push notifications) to alert users when an order is processed.

This setup provides a basic structure to interact with the backend services, and it's easy to expand as you add more features to the platform.