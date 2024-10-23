
### Node.js Fundamentals

Node.js is a powerful JavaScript runtime built on Chrome's V8 engine, designed for building scalable network applications. This guide covers the basics of writing and running Node.js scripts, understanding the runtime environment, and using core modules like `fs`, `http`, and `path`.

#### Writing and Running Basic Node.js Scripts

To get started with Node.js, you need to write a basic script and run it using the Node.js runtime.

1. **Writing a Basic Script:**

Create a file named `app.js` and add the following code:

```javascript
// app.js
console.log('Hello, Node.js!');
```

2. **Running the Script:**

Open your terminal and navigate to the directory containing `app.js`. Run the script using the `node` command:

```sh
node app.js
```

You should see the output:

```
Hello, Node.js!
```

#### Understanding the Node.js Runtime Environment

Node.js provides a runtime environment for executing JavaScript code outside the browser. Here are some key aspects:

1. **Single-Threaded Event Loop:**
   - Node.js uses a single-threaded event loop to handle asynchronous operations. This allows it to handle multiple requests concurrently without blocking the execution.

2. **Non-Blocking I/O:**
   - Node.js performs I/O operations asynchronously, which means it can handle other tasks while waiting for I/O operations to complete.

3. **Global Objects:**
   - Node.js provides several global objects like `global`, `process`, `console`, and `__dirname`, which can be used anywhere in your code.

Example:

```javascript
// Accessing global objects
console.log(__dirname); // Outputs the directory name of the current module
console.log(__filename); // Outputs the file name of the current module
```

#### Core Modules

Node.js comes with several built-in modules that provide various functionalities. Some commonly used core modules are `fs`, `http`, and `path`.

1. **fs (File System) Module:**

The `fs` module allows you to interact with the file system, such as reading and writing files.

**Example: Reading a File:**

```javascript
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

**Example: Writing to a File:**

```javascript
const fs = require('fs');

const content = 'Hello, Node.js!';
fs.writeFile('example.txt', content, 'utf8', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File has been saved!');
});
```

2. **http Module:**

The `http` module allows you to create an HTTP server to handle client requests and responses.

**Example: Creating a Basic HTTP Server:**

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
```

3. **path Module:**

The `path` module provides utilities for working with file and directory paths.

**Example: Working with Paths:**

```javascript
const path = require('path');

const filePath = '/user/local/bin/nohup.out';
console.log(path.basename(filePath)); // Outputs: nohup.out
console.log(path.dirname(filePath)); // Outputs: /user/local/bin
console.log(path.extname(filePath)); // Outputs: .out

const joinedPath = path.join('/user', 'local', 'bin', 'file.txt');
console.log(joinedPath); // Outputs: /user/local/bin/file.txt
```

### Summary

- **Writing and Running Basic Scripts:**
  - Create a `.js` file and run it using the `node` command in the terminal.

- **Node.js Runtime Environment:**
  - Node.js uses a single-threaded event loop and non-blocking I/O to handle multiple requests concurrently.
  - Provides global objects like `global`, `process`, `console`, `__dirname`, and `__filename`.

- **Core Modules:**
  - **fs Module:** For file system operations such as reading and writing files.
  - **http Module:** For creating HTTP servers to handle client requests.
  - **path Module:** For working with file and directory paths.

Understanding these fundamentals will help you build and manage Node.js applications effectively.