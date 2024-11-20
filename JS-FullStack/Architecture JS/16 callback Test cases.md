Callback functions are an essential concept in JavaScript, used to handle asynchronous operations or pass functions as arguments to other functions. Below are various examples of **callback functions** that demonstrate their versatility and functionality in different contexts:

---

### **1. Basic Callback Example**
```javascript
function greet(name, callback) {
  console.log(`Hello, ${name}`);
  callback();
}

function sayGoodbye() {
  console.log('Goodbye!');
}

greet('Alice', sayGoodbye);
```
**Output**:
```
Hello, Alice
Goodbye!
```
Here, `sayGoodbye` is passed as a callback to `greet` and executed after the greeting message.

---

### **2. Asynchronous Callback (setTimeout)**
```javascript
console.log('Start');

setTimeout(() => {
  console.log('This runs after 2 seconds');
}, 2000);

console.log('End');
```
**Output**:
```
Start
End
This runs after 2 seconds
```
Here, the anonymous function is a callback that runs after a delay of 2 seconds.

---

### **3. Array Methods with Callbacks**
#### **3.1 forEach**
```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((number) => {
  console.log(number * 2);
});
```
**Output**:
```
2
4
6
8
10
```
The callback function is applied to each element in the array.

#### **3.2 map**
```javascript
const squaredNumbers = numbers.map((number) => number * number);
console.log(squaredNumbers);
```
**Output**:
```
[1, 4, 9, 16, 25]
```
The `map` method uses a callback to generate a new array by transforming each element.

---

### **4. Event Handling**
```javascript
document.getElementById('btn').addEventListener('click', () => {
  console.log('Button clicked!');
});
```
Here, the callback function runs whenever the button is clicked.

---

### **5. Custom Asynchronous Function**
```javascript
function fetchData(callback) {
  setTimeout(() => {
    console.log('Data fetched');
    callback();
  }, 1000);
}

function processData() {
  console.log('Processing data...');
}

fetchData(processData);
```
**Output**:
```
Data fetched
Processing data...
```
The callback `processData` is executed after the data is fetched.

---

### **6. Nested Callbacks (Callback Hell)**
```javascript
function step1(callback) {
  console.log('Step 1 complete');
  callback();
}

function step2(callback) {
  console.log('Step 2 complete');
  callback();
}

function step3() {
  console.log('Step 3 complete');
}

step1(() => {
  step2(() => {
    step3();
  });
});
```
**Output**:
```
Step 1 complete
Step 2 complete
Step 3 complete
```
Nested callbacks can become messy, leading to **callback hell**.

---

### **7. Error-First Callback**
```javascript
function divide(a, b, callback) {
  if (b === 0) {
    callback('Error: Division by zero', null);
  } else {
    callback(null, a / b);
  }
}

divide(10, 2, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Result:', result);
  }
});
```
**Output**:
```
Result: 5
```
Here, the callback handles both errors and results.

---

### **8. Chaining Callbacks**
```javascript
function task1(callback) {
  console.log('Task 1');
  callback();
}

function task2(callback) {
  console.log('Task 2');
  callback();
}

function task3() {
  console.log('Task 3');
}

task1(() => {
  task2(() => {
    task3();
  });
});
```
**Output**:
```
Task 1
Task 2
Task 3
```

---

### **9. Callbacks with Promises**
Callbacks can be replaced or integrated with **promises** for better readability.

#### **Callback-Style**
```javascript
function asyncTask(callback) {
  setTimeout(() => {
    console.log('Async Task Done');
    callback();
  }, 1000);
}

asyncTask(() => {
  console.log('Callback Executed');
});
```

#### **Promise-Based**
```javascript
function asyncTask() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Async Task Done');
      resolve();
    }, 1000);
  });
}

asyncTask().then(() => console.log('Promise Resolved'));
```

---

### **10. Higher-Order Functions**
```javascript
function calculate(a, b, operation) {
  return operation(a, b);
}

function add(x, y) {
  return x + y;
}

function multiply(x, y) {
  return x * y;
}

console.log(calculate(5, 3, add));       // Output: 8
console.log(calculate(5, 3, multiply));  // Output: 15
```
Here, `calculate` takes a callback (`add` or `multiply`) to perform an operation.

---

These examples demonstrate the power and flexibility of callback functions in JavaScript, from simple use cases to handling complex asynchronous flows.