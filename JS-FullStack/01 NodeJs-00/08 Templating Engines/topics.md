### Templating Engines in Express.js

Templating engines allow you to create HTML templates with embedded JavaScript code, enabling you to generate dynamic content on the server-side. Express.js supports various templating engines like EJS, Handlebars, Pug, and others. This guide will focus on integrating and using EJS (Embedded JavaScript) and Handlebars for rendering dynamic views.

#### Integrating EJS

EJS is a simple templating language that lets you generate HTML markup with plain JavaScript.

1. **Installation:**

   First, install EJS:

   ```sh
   npm install ejs
   ```

2. **Setting Up EJS in Express:**

   Configure your Express application to use EJS as the templating engine:

   ```javascript
   const express = require('express');
   const app = express();

   // Set the view engine to ejs
   app.set('view engine', 'ejs');

   const port = 3000;
   app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
   });
   ```

3. **Creating EJS Views:**

   Create a directory named `views` in your project root and add an `index.ejs` file:

   **views/index.ejs:**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Home</title>
   </head>
   <body>
     <h1>Hello, <%= name %>!</h1>
   </body>
   </html>
   ```

4. **Rendering EJS Views:**

   In your Express app, use the `res.render` method to render the view:

   ```javascript
   app.get('/', (req, res) => {
     res.render('index', { name: 'World' });
   });
   ```

5. **Running the Application:**

   Start the server and navigate to `http://localhost:3000` to see the rendered HTML with dynamic content.

#### Integrating Handlebars

Handlebars is a popular templating engine known for its simplicity and logic-less templates.

1. **Installation:**

   First, install Handlebars and its Express integration:

   ```sh
   npm install express-handlebars
   ```

2. **Setting Up Handlebars in Express:**

   Configure your Express application to use Handlebars as the templating engine:

   ```javascript
   const express = require('express');
   const exphbs = require('express-handlebars');
   const app = express();

   // Set up Handlebars
   app.engine('handlebars', exphbs());
   app.set('view engine', 'handlebars');

   const port = 3000;
   app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
   });
   ```

3. **Creating Handlebars Views:**

   Create a directory named `views` in your project root and add a `home.handlebars` file:

   **views/home.handlebars:**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Home</title>
   </head>
   <body>
     <h1>Hello, {{name}}!</h1>
   </body>
   </html>
   ```

4. **Rendering Handlebars Views:**

   In your Express app, use the `res.render` method to render the view:

   ```javascript
   app.get('/', (req, res) => {
     res.render('home', { name: 'World' });
   });
   ```

5. **Running the Application:**

   Start the server and navigate to `http://localhost:3000` to see the rendered HTML with dynamic content.

### Summary

- **Integrating EJS:**
  - Install EJS with `npm install ejs`.
  - Set the view engine to EJS using `app.set('view engine', 'ejs')`.
  - Create EJS templates and render them using `res.render`.

- **Integrating Handlebars:**
  - Install Handlebars and its Express integration with `npm install express-handlebars`.
  - Set up Handlebars using `app.engine('handlebars', exphbs())` and `app.set('view engine', 'handlebars')`.
  - Create Handlebars templates and render them using `res.render`.

Using templating engines like EJS and Handlebars in Express.js allows you to create dynamic web pages easily, separating the HTML structure from the JavaScript logic and improving the maintainability of your code.