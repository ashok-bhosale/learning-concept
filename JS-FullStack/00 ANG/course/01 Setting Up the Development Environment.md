To install Node.js, npm (Node Package Manager), and the Angular CLI (Command Line Interface), you can follow these steps:

**1. Install Node.js and npm:**

Node.js and npm are often bundled together in a single installation package. Here's how to install them:

- **Windows:**

   Visit the official Node.js website and download the "LTS" (Long Term Support) version, which is recommended for most users. It includes npm.

   Website: https://nodejs.org/

- **macOS:**

   You can install Node.js and npm on macOS using a package manager like Homebrew. If you don't have Homebrew, install it first.

   Open your terminal and run the following commands:

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

   Then, install Node.js and npm with Homebrew:

   ```bash
   brew install node
   ```

- **Linux (Debian/Ubuntu):**

   On Debian-based Linux distributions, you can use the package manager to install Node.js and npm. Open your terminal and run the following commands:

   ```bash
   sudo apt update
   sudo apt install nodejs
   sudo apt install npm
   ```

   After the installation, you can check if Node.js and npm were installed successfully by running the following commands in your terminal:

   ```bash
   node -v
   npm -v
   ```

**2. Install Angular CLI:**

Once you have Node.js and npm installed, you can use npm to install the Angular CLI globally. Open your terminal or command prompt and run the following command:

```bash
npm install -g @angular/cli**
```

This command installs the Angular CLI globally, making it available as a command-line tool.

**3. Verify the Installation:**

After installation, you can verify that Node.js, npm, and the Angular CLI were installed correctly by running the following commands:

- To check the Node.js version:
  ```bash
  node -v
  ```

- To check the npm version:
  ```bash
  npm -v
  ```

- To check the Angular CLI version:
  ```bash
  ng --version
  ```

You should see the versions displayed for each of these tools in the terminal.

Now, you have successfully installed Node.js, npm, and the Angular CLI on your system. You're ready to start developing Angular applications.