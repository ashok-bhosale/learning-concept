Default function parameters allow you to provide default values for parameters in a function, making it more flexible when calling the function. If a parameter is not provided, the default value is used. This feature was introduced in ECMAScript 6 (ES6). Here's an overview of how to use default function parameters:

### Basic Usage:

```javascript
// Function with default parameter
function greet(name = 'Guest') {
  console.log(`Hello, ${name}!`);
}

greet();           // Output: Hello, Guest!
greet('John');     // Output: Hello, John!
```

In the example above, the `name` parameter in the `greet` function has a default value of `'Guest'`. If no argument is provided for `name`, the default value is used.

### Default Parameters with Expressions:

```javascript
// Function with default parameter using expression
function power(base, exponent = 2) {
  console.log(Math.pow(base, exponent));
}

power(3);          // Output: 9 (3^2)
power(3, 3);       // Output: 27 (3^3)
```

In this example, the `exponent` parameter has a default value of `2`. If an `exponent` is not provided, the default value is used.

### Default Parameters and Undefined:

```javascript
// Function with default parameter and undefined
function multiply(a, b = 2) {
  console.log(a * b);
}

multiply(3, 4);    // Output: 12
multiply(3);       // Output: 6 (3 * 2)
multiply(3, undefined); // Output: 6 (3 * 2)
```

If a parameter is explicitly passed as `undefined`, the default value is still used. This allows you to distinguish between an undefined argument and the absence of an argument.

### Default Parameters with Previous Parameters:

```javascript
// Using previous parameters in default parameter
function fullName(firstName, lastName = 'Doe', salutation = 'Mr.') {
  console.log(`${salutation} ${firstName} ${lastName}`);
}

fullName('John');             // Output: Mr. John Doe
fullName('Jane', 'Doe', 'Ms.'); // Output: Ms. Jane Doe
```

In this example, the default parameter `lastName` depends on the value of the preceding parameter `firstName`. The default values can reference the values of previously declared parameters.

### Use Cases:

1. **Simplifying Function Calls:**
   ```javascript
   function fetchData(url, method = 'GET', timeout = 3000) {
     // Fetch data using the provided URL, method, and timeout
   }

   fetchData('https://api.example.com/data');
   ```

2. **Setting Configuration Options:**
   ```javascript
   function configureApp(options = {}) {
     const { debugMode = false, theme = 'light' } = options;
     // Configure the app based on provided options
   }

   configureApp({ debugMode: true, theme: 'dark' });
   ```

3. **Avoiding `undefined` Checks:**
   ```javascript
   function logMessage(message = 'No message provided') {
     console.log(message);
   }

   logMessage();           // Output: No message provided
   logMessage('Hello!');   // Output: Hello!
   ```

Default function parameters provide a convenient way to handle default values in function parameters, reducing the need for explicit checks for `undefined` and making function calls more concise. They are particularly useful when defining functions with a variety of optional parameters.