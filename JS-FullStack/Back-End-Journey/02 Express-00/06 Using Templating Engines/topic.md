Integrating templating engines such as EJS (Embedded JavaScript) or Pug (formerly known as Jade) with Express.js allows you to generate dynamic HTML content and render views dynamically based on data from your application. Here's how you can integrate and use templating engines in your Express.js application:

### Integrating Templating Engines

1. **Install Templating Engine:**
   - Install the desired templating engine (EJS or Pug) using npm:
     ```bash
     npm install ejs
     ```
     or
     ```bash
     npm install pug
     ```

2. **Set Templating Engine in Express:**
   - Configure Express.js to use the installed templating engine. For example, for EJS:
     ```javascript
     const express = require('express');
     const app = express();

     // Set EJS as the view engine
     app.set('view engine', 'ejs');
     ```
     or for Pug:
     ```javascript
     const express = require('express');
     const app = express();

     // Set Pug as the view engine
     app.set('view engine', 'pug');
     ```

### Rendering Dynamic Views

1. **Create View Templates:**
   - Create view templates using the chosen templating engine. These templates can include HTML markup with embedded JavaScript code (for EJS) or use the concise syntax of Pug.

2. **Render Views in Route Handlers:**
   - Render views in route handlers using `res.render()` and passing the name of the view file (without the file extension) and optional data to be passed to the view.
     ```javascript
     app.get('/', (req, res) => {
       // Render the 'index' view template
       res.render('index', { title: 'Home Page', message: 'Welcome to our website' });
     });
     ```

### Example using EJS Templating Engine

1. **Create EJS View Template (index.ejs):**
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title><%= title %></title>
   </head>
   <body>
     <h1><%= title %></h1>
     <p><%= message %></p>
   </body>
   </html>
   ```

2. **Render View in Express Route Handler:**
   ```javascript
   app.get('/', (req, res) => {
     res.render('index', { title: 'Home Page', message: 'Welcome to our website' });
   });
   ```

### Example using Pug Templating Engine

1. **Create Pug View Template (index.pug):**
   ```pug
   doctype html
   html(lang="en")
     head
       meta(charset="UTF-8")
       meta(name="viewport", content="width=device-width, initial-scale=1.0")
       title= title
     body
       h1= title
       p= message
   ```

2. **Render View in Express Route Handler:**
   ```javascript
   app.get('/', (req, res) => {
     res.render('index', { title: 'Home Page', message: 'Welcome to our website' });
   });
   ```

### Conclusion

Integrating and using templating engines like EJS or Pug with Express.js allows you to generate dynamic HTML content and render views dynamically based on data from your application. By following these steps, you can create expressive and dynamic views for your Express.js application, enhancing the user experience and making your application more interactive.