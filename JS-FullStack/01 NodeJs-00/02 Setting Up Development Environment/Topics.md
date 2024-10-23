### Setting Up Development Environment

To get started with Node.js development, you'll need to install Node.js and npm (Node Package Manager), understand how to use npm for managing packages, and become familiar with the `package.json` file which holds the metadata and dependencies of your project.

#### Installing Node.js and npm

1. **Download and Install:**
   - Go to the [official Node.js website](https://nodejs.org/).
   - Download the LTS (Long Term Support) version which is recommended for most users.
   - Run the installer and follow the installation steps.

2. **Verify Installation:**
   - Open your terminal (Command Prompt on Windows, Terminal on macOS/Linux).
   - Run the following commands to verify the installations:
     ```sh
     node -v
     npm -v
     ```
   - You should see the version numbers of Node.js and npm, indicating successful installation.

#### Using Node Package Manager (npm) for Package Management

npm is a tool that comes with Node.js to help manage JavaScript packages and dependencies. Here's how to use it:

1. **Initialize a New Project:**
   - Create a new directory for your project and navigate into it:
     ```sh
     mkdir my-node-project
     cd my-node-project
     ```
   - Initialize a new Node.js project:
     ```sh
     npm init
     ```
   - You will be prompted to enter details about your project. You can press `Enter` to accept the defaults or fill in the details as needed.

2. **Install Packages:**
   - To install a package, use the `npm install` command followed by the package name. For example, to install Express, a popular web framework for Node.js:
     ```sh
     npm install express
     ```
   - This will create a `node_modules` directory and add the package there. It will also update the `package.json` file to include this package as a dependency.

3. **Global vs Local Installation:**
   - **Local Installation:** Installs the package in the project directory. Example:
     ```sh
     npm install express
     ```
   - **Global Installation:** Installs the package globally on your system. Example:
     ```sh
     npm install -g nodemon
     ```
   - Global packages are often used for command-line tools.

4. **Uninstall Packages:**
   - To uninstall a package, use the `npm uninstall` command:
     ```sh
     npm uninstall express
     ```

#### Introduction to package.json

The `package.json` file is a crucial part of any Node.js project. It contains metadata about the project and lists dependencies and scripts.

1. **Creating package.json:**
   - As mentioned, `npm init` creates a `package.json` file with default values. You can also create it manually or with `npm init -y` to accept defaults.

2. **Key Sections of package.json:**
   - **name:** The name of your project.
   - **version:** The current version of your project.
   - **description:** A brief description of your project.
   - **main:** The entry point of your application (e.g., `index.js`).
   - **scripts:** Scripts to help with automation (e.g., start, test).
   - **dependencies:** Lists packages required to run your application.
   - **devDependencies:** Lists packages needed only for development and testing.

Example `package.json`:

```json
{
  "name": "my-node-project",
  "version": "1.0.0",
  "description": "A simple Node.js project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Your Name",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.12"
  }
}
```

3. **Scripts:**
   - Scripts defined in `package.json` can be run using `npm run <script-name>`. For example:
     ```sh
     npm run start
     ```

4. **Installing All Dependencies:**
   - When you clone a project or pull the latest changes, you can install all dependencies listed in `package.json` by running:
     ```sh
     npm install
     ```

### Summary

1. **Install Node.js and npm** from the official website and verify the installation.
2. **Use npm** to manage packages for your Node.js project. Initialize your project with `npm init`, install packages with `npm install`, and manage them as needed.
3. **Understand package.json**, which holds important metadata about your project and lists its dependencies and scripts.

By setting up your development environment correctly, you'll be ready to start building and managing Node.js applications efficiently.