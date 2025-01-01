### **Global Namespace Pollution: Problem, Example, and Solution**

---

### **Problem: What is Global Namespace Pollution?**

In JavaScript, the global namespace (or global scope) is shared by all scripts. If multiple variables or functions are declared in the global scope:

1. **Naming Conflicts**: Different scripts or parts of code may accidentally overwrite each other’s variables or functions.
2. **Debugging Challenges**: Errors caused by unexpected overwrites are hard to debug.
3. **Performance Issues**: Too many global variables can slow down the lookup process.

---

### **Example of the Problem**

```javascript
// Script 1: Defines a global variable
var name = "Alice";

// Script 2: Accidentally overwrites the global variable
var name = "Bob";

// Both scripts rely on the `name` variable
console.log(name); // Outputs: "Bob" (Script 2 overwrites Script 1's variable)
```

#### **What Went Wrong?**

- Both scripts use the same global variable `name`, leading to unintended overwriting.

---

### **Solutions to Prevent Global Namespace Pollution**

---

#### **1. Use ES6 Modules**

Modules create their own scope, so variables and functions don’t pollute the global namespace.

```javascript
// File: script1.js
export const name = "Alice";

// File: script2.js
export const name = "Bob";

// File: app.js
import { name as script1Name } from './script1.js';
import { name as script2Name } from './script2.js';

console.log(script1Name); // Alice
console.log(script2Name); // Bob
```

**Why It Works**:

- Each module has its own scope, and variables must be explicitly imported to be accessed.

---

#### **2. Use an Immediately Invoked Function Expression (IIFE)**

An IIFE creates a local scope to avoid polluting the global namespace.

```javascript
// Script 1
(function () {
    const name = "Alice";
    console.log(`Script 1 name: ${name}`); // Alice
})();

// Script 2
(function () {
    const name = "Bob";
    console.log(`Script 2 name: ${name}`); // Bob
})();

console.log(typeof name); // undefined (not global)
```

**Why It Works**:

- Variables inside the IIFE are scoped to the function and don’t affect the global namespace.

---

#### **3. Use Object Namespaces**

Group variables and functions under a single global object.

```javascript
// Script 1
const MyApp = {}; // Single global object
MyApp.name1 = "Alice";

// Script 2
MyApp.name2 = "Bob";

console.log(MyApp.name1); // Alice
console.log(MyApp.name2); // Bob
```

**Why It Works**:

- Instead of creating multiple global variables, everything is encapsulated in one object.

---

#### **4. Use `let` and `const`**

Using `let` and `const` ensures variables are block-scoped, preventing accidental overwrites in the global scope.

```javascript
// Script 1
{
    let name = "Alice";
    console.log(`Script 1 name: ${name}`); // Alice
}

// Script 2
{
    let name = "Bob";
    console.log(`Script 2 name: ${name}`); // Bob
}

console.log(typeof name); // undefined (not global)
```

**Why It Works**:

- Variables declared with `let` or `const` are limited to the block they’re defined in.

---

### **Conclusion**

By avoiding direct use of the global namespace through **modules**, **IIFEs**, **object namespaces**, or **block scoping**, you can:

1. Avoid naming conflicts.
2. Improve code modularity.
3. Enhance maintainability and debugging efficiency.