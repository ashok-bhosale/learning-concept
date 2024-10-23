In JavaScript, operators are symbols that perform operations on variables and values. Here's an overview of operators for arithmetic, comparison, and logical operations:

### **1. Arithmetic Operators:**

Arithmetic operators perform mathematical operations on numeric values.

- **Addition `+`:**
  ```javascript
  let sum = 5 + 3; // Result: 8
  ```

- **Subtraction `-`:**
  ```javascript
  let difference = 10 - 4; // Result: 6
  ```

- **Multiplication `*`:**
  ```javascript
  let product = 2 * 6; // Result: 12
  ```

- **Division `/`:**
  ```javascript
  let quotient = 8 / 2; // Result: 4
  ```

- **Modulus `%` (Remainder):**
  ```javascript
  let remainder = 10 % 3; // Result: 1 (remainder of 10 divided by 3)
  ```

- **Increment `++` and Decrement `--`:**
  ```javascript
  let x = 5;
  x++; // Increment: x is now 6
  x--; // Decrement: x is now 5 again
  ```

### **2. Comparison Operators:**

Comparison operators compare two values and return a Boolean result (`true` or `false`).

- **Equal `==`:**
  ```javascript
  let isEqual = 5 == "5"; // Result: true (loose equality, type coercion)
  ```

- **Strict Equal `===`:**
  ```javascript
  let isStrictEqual = 5 === "5"; // Result: false (strict equality, checks both value and type)
  ```

- **Not Equal `!=` and Not Strict Equal `!==`:**
  ```javascript
  let isNotEqual = 5 != "5"; // Result: false
  let isNotStrictEqual = 5 !== "5"; // Result: true
  ```

- **Greater Than `>` and Less Than `<`:**
  ```javascript
  let isGreaterThan = 10 > 5; // Result: true
  let isLessThan = 3 < 7; // Result: true
  ```

- **Greater Than or Equal `>=` and Less Than or Equal `<=`:**
  ```javascript
  let isGreaterOrEqual = 8 >= 8; // Result: true
  let isLessOrEqual = 5 <= 3; // Result: false
  ```

### **3. Logical Operators:**

Logical operators perform logical operations and return a Boolean result.

- **Logical AND `&&`:**
  ```javascript
  let andResult = true && false; // Result: false
  ```

- **Logical OR `||`:**
  ```javascript
  let orResult = true || false; // Result: true
  ```

- **Logical NOT `!`:**
  ```javascript
  let notResult = !true; // Result: false
  ```

### **4. Expressions:**

An expression is a combination of values, variables, and operators that can be evaluated to produce a result.

```javascript
let result = (5 + 3) * 2; // Result: 16
```

Expressions can involve arithmetic, comparison, and logical operations. Understanding how these operators work is essential for creating meaningful expressions in JavaScript. Additionally, the order of operations (PEMDAS/BODMAS) applies, specifying the sequence in which operations are performed.