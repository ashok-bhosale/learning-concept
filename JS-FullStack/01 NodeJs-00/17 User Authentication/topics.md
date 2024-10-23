### User Authentication in Node.js with Passport.js

User authentication is crucial for securing web applications. In this guide, we will implement user registration and login functionalities and use Passport.js for authentication in a Node.js application.

### Setting Up the Project

First, create a new Node.js project and install the necessary dependencies:

```bash
mkdir auth-app
cd auth-app
npm init -y
npm install express body-parser mongoose passport passport-local express-session bcryptjs
```

### Setting Up MongoDB with Mongoose

We'll use MongoDB for storing user data. Make sure you have MongoDB installed and running on your machine.

Create a `User` model:

```javascript
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Pre-save hook to hash the password before saving the user
UserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
```

### Setting Up Passport.js

Passport.js is a popular authentication middleware for Node.js. We'll use the `passport-local` strategy for local authentication.

#### Configuring Passport.js

Create a `passport-config.js` file:

```javascript
// passport-config.js
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('./models/User');

module.exports = function (passport) {
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
```

### Setting Up Express Server

Create an Express server and configure it to use Passport.js for authentication:

```javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/User');
const passportConfig = require('./passport-config');

const app = express();
passportConfig(passport);

mongoose.connect('mongodb://localhost/auth-app', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    res.redirect('/register');
  }
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
```

### Creating Views

Create views for registration, login, and the home page.

#### views/index.ejs

```html
<!DOCTYPE html>
<html>
<head>
  <title>Home</title>
</head>
<body>
  <% if (user) { %>
    <h1>Hello, <%= user.username %>!</h1>
    <a href="/logout">Logout</a>
  <% } else { %>
    <h1>Hello, Guest!</h1>
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  <% } %>
</body>
</html>
```

#### views/register.ejs

```html
<!DOCTYPE html>
<html>
<head>
  <title>Register</title>
</head>
<body>
  <h1>Register</h1>
  <form action="/register" method="post">
    <div>
      <label>Username:</label>
      <input type="text" name="username" required>
    </div>
    <div>
      <label>Password:</label>
      <input type="password" name="password" required>
    </div>
    <button type="submit">Register</button>
  </form>
  <a href="/login">Login</a>
</body>
</html>
```

#### views/login.ejs

```html
<!DOCTYPE html>
<html>
<head>
  <title>Login</title>
</head>
<body>
  <h1>Login</h1>
  <form action="/login" method="post">
    <div>
      <label>Username:</label>
      <input type="text" name="username" required>
    </div>
    <div>
      <label>Password:</label>
      <input type="password" name="password" required>
    </div>
    <button type="submit">Login</button>
  </form>
  <a href="/register">Register</a>
</body>
</html>
```

### Running the Application

To run the application:

1. Start your MongoDB server.
2. Run the Node.js server:

```bash
node server.js
```

3. Open your browser and navigate to `http://localhost:3000`.

You should be able to register a new user, log in, and see personalized content on the home page.

### Conclusion

In this guide, we implemented user registration and login functionality using Passport.js for authentication. We set up a MongoDB database with Mongoose, configured Passport.js, and created views for user interaction. This setup forms the foundation for more advanced authentication features and user management in your applications.