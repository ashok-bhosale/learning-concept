As of my last knowledge update in January 2022, I can provide information on features introduced in ECMAScript 2016 (ES7), ECMAScript 2017 (ES8), ECMAScript 2018 (ES9), ECMAScript 2019 (ES10), ECMAScript 2020 (ES11), and ECMAScript 2021 (ES12). However, I may not have information on features introduced after that date. Here are some features introduced in ES7 and beyond:

1. **ES7 (2016):**
   - **Array.prototype.includes():** Adds a method to easily check if an array contains a specific element.
     ```javascript
     let arr = [1, 2, 3];
     console.log(arr.includes(2)); // Output: true
     ```

2. **ES8 (2017):**
   - **Async/Await:** Provides a cleaner syntax for working with asynchronous code, making it easier to write and understand.
     ```javascript
     async function fetchData() {
       let response = await fetch('https://api.example.com/data');
       let data = await response.json();
       console.log(data);
     }
     ```

3. **ES9 (2018):**
   - **Rest/Spread Properties:** Allows spreading properties of an object into another object.
     ```javascript
     let obj1 = { a: 1, b: 2 };
     let obj2 = { ...obj1, c: 3 };
     console.log(obj2); // Output: { a: 1, b: 2, c: 3 }
     ```

4. **ES10 (2019):**
   - **Optional Catch Binding:** Allows using a variable in a catch block only if it's needed.
     ```javascript
     try {
       // code that may throw an error
     } catch {
       // no need for an error variable
     }
     ```

   - **String.prototype.trimStart() and String.prototype.trimEnd():** Adds methods to remove whitespace from the beginning or end of a string.
     ```javascript
     let str = "   Hello, World!   ";
     console.log(str.trimStart()); // Output: "Hello, World!   "
     console.log(str.trimEnd());   // Output: "   Hello, World!"
     ```

5. **ES11 (2020):**
   - **Optional Chaining (?.):** Allows accessing nested properties without having to explicitly check each level for null or undefined.
     ```javascript
     let user = {
       address: {
         street: {
           name: 'Main Street'
         }
       }
     };

     console.log(user?.address?.street?.name); // Output: 'Main Street'
     ```

   - **Nullish Coalescing (??):** Provides a way to provide a default value for variables that are null or undefined, excluding falsy values.
     ```javascript
     let defaultValue = 'Default';
     let userInput; // Assume userInput is undefined
     let result = userInput ?? defaultValue;
     console.log(result); // Output: 'Default'
     ```

6. **ES12 (2021):**
   - **BigInt:** Adds a new primitive type to represent arbitrary precision integers.
     ```javascript
     const bigIntValue = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
     console.log(bigIntValue);
     ```

These are just a few examples of features introduced in each ECMAScript version beyond ES6. To stay updated with the latest ECMAScript features and proposals, you can regularly check the [ECMAScript proposals GitHub repository](https://github.com/tc39/proposals) and follow discussions on the [TC39 GitHub organization](https://github.com/tc39). Additionally, official ECMAScript documentation and reliable JavaScript news sources can provide updates on language features and proposals.