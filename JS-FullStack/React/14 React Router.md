Client-side routing using React Router is a common approach to navigate between different parts of a React application. React Router allows you to create a single-page application (SPA) with multiple "pages" that users can navigate without full-page reloads. Here's how to implement client-side routing using React Router:

**1. Installation:**

Start by installing React Router with the following command:

```bash
npm install react-router-dom
```

**2. Basic Setup:**

In your application, import the necessary components from React Router and set up the basic structure for routing. Typically, you'll create a `Router` component to wrap your application:

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </Router>
  );
}

export default App;
```

In this example, we use `BrowserRouter` to create a router. The `Switch` component renders the first `Route` that matches the current location, ensuring that only one route is active at a time. Each `Route` component is associated with a path and a component to render when the path matches.

**3. Create Route Components:**

Create individual components for each "page" of your application. For example, you can have `Home.js`, `About.js`, and `Contact.js`. These components will be displayed when the corresponding routes are visited.

```jsx
// Home.js
import React from 'react';

function Home() {
  return <div>Home Page</div>;
}

export default Home;
```

**4. Navigation:**

To navigate between pages, you can use the `Link` component from React Router. For example, in your navigation bar:

```jsx
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
```

You can also navigate programmatically using the `useHistory` hook or `withRouter` HOC.

**5. Route Parameters:**

You can use route parameters to create dynamic routes. For example, to display user profiles with unique URLs:

```jsx
<Route path="/profile/:username" component={UserProfile} />
```

In the `UserProfile` component, you can access the `username` parameter using the `useParams` hook.

**6. Nested Routes:**

React Router allows you to nest routes within components. This is useful when you have sections of your application with their own routes:

```jsx
<Route path="/dashboard" component={Dashboard} />
```

Inside the `Dashboard` component, you can define additional routes that are relative to "/dashboard."

React Router is a powerful and flexible tool for implementing client-side routing in React applications. It allows you to create multi-page applications that feel like traditional websites, but without full page reloads. You can further customize your routing behavior with features like route guards and route transitions.