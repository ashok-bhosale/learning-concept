Arrays and objects are two fundamental data structures in JavaScript, each serving different purposes. Let's explore both, including their properties, methods, and manipulation techniques.

### **1. Arrays:**

Arrays are ordered lists that store multiple values of any data type.

#### **a. Creating Arrays:**

```javascript
let numbers = [1, 2, 3, 4, 5];
let fruits = ['apple', 'orange', 'banana'];
```

#### **b. Accessing Elements:**

```javascript
console.log(numbers[2]); // Accessing the third element (index starts from 0)
```

#### **c. Modifying Elements:**

```javascript
fruits[1] = 'grape'; // Modifying the second element
```

#### **d. Array Methods:**

- **`push()` and `pop()`:** Add/remove elements to/from the end of the array.

  ```javascript
  numbers.push(6); // Adds 6 to the end
  numbers.pop(); // Removes the last element (returns the removed element)
  ```

- **`unshift()` and `shift()`:** Add/remove elements to/from the beginning of the array.

  ```javascript
  fruits.unshift('melon'); // Adds 'melon' to the beginning
  fruits.shift(); // Removes the first element (returns the removed element)
  ```

- **`splice()`:** Add/remove elements at a specific index.

  ```javascript
  numbers.splice(2, 0, 10, 11); // Adds 10 and 11 at index 2
  numbers.splice(1, 2); // Removes 2 elements starting from index 1
  ```

- **`slice()`:** Creates a new array by extracting elements from an existing array.

  ```javascript
  let slicedNumbers = numbers.slice(1, 4); // Returns a new array with elements from index 1 to 3
  ```

- **`concat()`:** Combines arrays.

  ```javascript
  let combinedArray = numbers.concat(fruits);
  ```

### **2. Objects:**

Objects are collections of key-value pairs and are used to represent entities.

#### **a. Creating Objects:**

```javascript
let person = {
  name: 'John',
  age: 30,
  isStudent: false
};
```

#### **b. Accessing Properties:**

```javascript
console.log(person.name); // Accessing the 'name' property
```

#### **c. Modifying Properties:**

```javascript
person.age = 31; // Modifying the 'age' property
```

#### **d. Object Methods:**

Objects can have methods, which are functions associated with the object.

```javascript
let calculator = {
  add: function (a, b) {
    return a + b;
  },
  subtract: function (a, b) {
    return a - b;
  }
};

let sum = calculator.add(5, 3); // Calls the 'add' method
```

#### **e. Adding and Deleting Properties:**

```javascript
person.job = 'Engineer'; // Adding a new property
delete person.isStudent; // Deleting a property
```

#### **f. Object.keys() and Object.values():**

```javascript
let keys = Object.keys(person); // Returns an array of keys ('name', 'age', 'job')
let values = Object.values(person); // Returns an array of values ('John', 31, 'Engineer')
```

### **3. Manipulation Techniques:**

#### **a. Iterating Through Arrays:**

- **`forEach()`:** Executes a provided function once for each array element.

  ```javascript
  numbers.forEach(function (number) {
    console.log(number);
  });
  ```

- **`map()`:** Creates a new array with the results of calling a provided function on every element.

  ```javascript
  let squaredNumbers = numbers.map(function (number) {
    return number * number;
  });
  ```

#### **b. Iterating Through Objects:**

- **`for...in` Loop:** Iterates over the enumerable properties of an object.

  ```javascript
  for (let key in person) {
    console.log(key + ': ' + person[key]);
  }
  ```

- **`Object.entries()`:** Returns an array of a given object's own enumerable property `[key, value]` pairs.

  ```javascript
  let entries = Object.entries(person);
  ```

These are foundational concepts for working with arrays and objects in JavaScript. Mastery of these structures and their manipulation techniques is essential for building complex and dynamic applications.

In JavaScript, the `map`, `filter`, and `reduce` methods are powerful array functions that enable functional programming patterns. Here are detailed explanations and examples of each method:

### `map` Method

The `map` method creates a new array by applying a function to each element of the original array.

#### Syntax
```javascript
const newArray = array.map(callback(element[, index[, array]])[, thisArg]);
```

- **callback**: A function that is called for every element of the array. Each element is passed to the function as the `element` parameter.
- **index** (optional): The index of the current element being processed.
- **array** (optional): The array `map` was called upon.
- **thisArg** (optional): Value to use as `this` when executing `callback`.

#### Example
```javascript
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map(num => num * num);
console.log(squaredNumbers); // Output: [1, 4, 9, 16, 25]
```

### `filter` Method

The `filter` method creates a new array with all elements that pass the test implemented by the provided function.

#### Syntax
```javascript
const newArray = array.filter(callback(element[, index[, array]])[, thisArg]);
```

- **callback**: A function that is called for every element of the array. Each element is passed to the function as the `element` parameter.
- **index** (optional): The index of the current element being processed.
- **array** (optional): The array `filter` was called upon.
- **thisArg** (optional): Value to use as `this` when executing `callback`.

#### Example
```javascript
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // Output: [2, 4]
```

### `reduce` Method

The `reduce` method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.

#### Syntax
```javascript
const result = array.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue]);
```

- **callback**: A function to execute on each element in the array (except for the first element if no `initialValue` is provided), taking four arguments:
  - **accumulator**: The accumulator accumulates the callback's return values; it is the accumulated value previously returned in the last invocation of the callback, or `initialValue`, if supplied.
  - **currentValue**: The current element being processed in the array.
  - **index** (optional): The index of the current element being processed in the array.
  - **array** (optional): The array `reduce` was called upon.
- **initialValue** (optional): A value to use as the first argument to the first call of the callback. If no `initialValue` is supplied, the first element in the array will be used as the initial `accumulator` value, and the `currentValue` will start from the second element in the array.

#### Example
```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // Output: 15
```

### Combined Example

Let's see an example where we use all three methods together:

#### Example
```javascript
const numbers = [1, 2, 3, 4, 5, 6];

// Step 1: Map to get squares
const squares = numbers.map(num => num * num);

// Step 2: Filter to get even squares
const evenSquares = squares.filter(num => num % 2 === 0);

// Step 3: Reduce to sum the even squares
const sumOfEvenSquares = evenSquares.reduce((sum, num) => sum + num, 0);

console.log(sumOfEvenSquares); // Output: 56 (which is 4 + 16 + 36)
```

In this example:
1. `map` is used to square each number in the array.
2. `filter` is used to select only the even squares.
3. `reduce` is used to sum the even squares.

These methods are highly effective for transforming and processing data in arrays in a concise and readable manner.