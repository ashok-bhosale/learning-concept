Debugging Node.js applications is crucial for identifying and fixing issues effectively. Node.js offers built-in debugging tools, and Visual Studio Code (VSCode) provides a powerful environment for debugging with a rich set of features. Here's a guide on how to use both built-in tools and VSCode for debugging Node.js applications.

### Using Built-in Debugging Tools

Node.js comes with a built-in debugger that you can use from the command line.

#### Starting the Debugger

To start the debugger, use the `inspect` flag when running your Node.js application:

```bash
node inspect app.js
```

#### Basic Commands

Once the debugger starts, you can use various commands to control the debugging session:

- `n` or `next`: Step to the next line of code.
- `c` or `continue`: Continue execution until the next breakpoint.
- `s` or `step`: Step into a function.
- `o` or `out`: Step out of the current function.
- `repl`: Enter the REPL mode to evaluate expressions.

#### Breakpoints

You can set breakpoints in your code using the `debugger` statement:

```javascript
function add(a, b) {
  debugger; // Breakpoint
  return a + b;
}

console.log(add(2, 3));
```

Run your application with `node inspect app.js`, and the execution will pause at the `debugger` statement, allowing you to inspect variables and step through the code.

#### Chrome DevTools

You can also use Chrome DevTools to debug Node.js applications. Start your application with the `--inspect` flag:

```bash
node --inspect app.js
```

Open `chrome://inspect` in Chrome, click on "Open dedicated DevTools for Node," and you will be able to debug your Node.js application using Chrome DevTools.

### Debugging with VSCode

VSCode provides an integrated and feature-rich debugging environment for Node.js applications.

#### Setting Up the Debugger

1. **Open your project in VSCode.**
2. **Create a `launch.json` file**:
   - Go to the Run and Debug view by clicking the play icon in the sidebar or pressing `Ctrl+Shift+D`.
   - Click on "create a launch.json file" and select "Node.js" as the environment.

This will create a `.vscode` folder with a `launch.json` file. Here is a basic configuration:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/src/app.js"
    }
  ]
}
```

#### Running the Debugger

- Set breakpoints by clicking in the gutter to the left of the line numbers.
- Start debugging by pressing `F5` or clicking the green play button in the Run and Debug view.

#### Advanced Configuration

You can customize your `launch.json` for different scenarios, such as debugging tests, attaching to a running process, or handling different environments.

Example configuration for attaching to a process:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to Process",
      "processId": "${command:PickProcess}",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

#### Debugging Features in VSCode

- **Watch Variables**: Add expressions to the Watch panel to monitor their values as you step through your code.
- **Call Stack**: View the call stack to understand the sequence of function calls that led to the current point in the execution.
- **Breakpoints**: Manage all your breakpoints, including conditional breakpoints, from the Breakpoints panel.
- **Debug Console**: Evaluate expressions and execute code in the context of the current breakpoint.

### Example

Let's see an example application and debug it using VSCode.

#### src/app.js

```javascript
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function calculate() {
  const x = add(2, 3);
  const y = subtract(5, 1);
  console.log(`Results: ${x}, ${y}`);
}

calculate();
```

#### .vscode/launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/src/app.js"
    }
  ]
}
```

1. **Set Breakpoints**: Open `src/app.js` and click in the gutter next to the line numbers to set breakpoints.
2. **Run the Debugger**: Press `F5` to start debugging. VSCode will stop at the breakpoints you set.
3. **Inspect Variables**: Use the Debug Console, Watch, and Call Stack to inspect variables and understand the program flow.

By leveraging Node.js's built-in debugging tools and the powerful features of VSCode, you can efficiently debug your applications and improve your development workflow.