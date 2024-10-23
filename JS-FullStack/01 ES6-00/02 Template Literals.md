Template strings, also known as template literals, provide a more flexible way to concatenate strings in JavaScript. They allow you to embed expressions and variables directly within the string, making it easier to create complex strings. Template strings are enclosed by backticks (` `) instead of single or double quotes. Here's how you can use template strings:

### Basic Template Strings:

```javascript
const name = 'John';
const age = 30;

// Using template strings
const greeting = `Hello, my name is ${name} and I am ${age} years old.`;

console.log(greeting);
// Output: Hello, my name is John and I am 30 years old.
```

In the example above, `${name}` and `${age}` are placeholders for variables. These expressions are evaluated, and their values are inserted into the string.

### Multiline Strings:

```javascript
const multiLineString = `
  This is a multiline string.
  It spans multiple lines.
  ${2 + 2} equals 4.
`;

console.log(multiLineString);
/*
Output:
  This is a multiline string.
  It spans multiple lines.
  4 equals 4.
*/
```

Using template strings, you can create multiline strings without explicitly adding line breaks.

### Expressions in Template Strings:

```javascript
const a = 5;
const b = 10;

// Using expressions in template strings
const result = `The sum of ${a} and ${b} is ${a + b}.`;

console.log(result);
// Output: The sum of 5 and 10 is 15.
```

Expressions inside `${}` are not limited to variables; you can perform calculations or include any valid JavaScript expression.

### Tagged Template Literals:

Template strings can be tagged with a function, allowing you to process the string and values before the final result is created.

```javascript
function tagFunction(strings, ...values) {
  console.log(strings); // An array of string literals
  console.log(values);  // An array of evaluated expressions

  let result = '';
  strings.forEach((string, index) => {
    result += string + (values[index] || '');
  });

  return result;
}

const a = 5;
const b = 10;

const taggedResult = tagFunction`The sum of ${a} and ${b} is ${a + b}.`;

console.log(taggedResult);
// Output: The sum of 5 and 10 is 15.
```

In the example above, `tagFunction` processes the template string components and values, allowing you to customize the output.

Using template strings provides a cleaner and more readable way to create strings in JavaScript, especially when dealing with dynamic content or multiline text. They offer a convenient alternative to traditional string concatenation and improve the overall readability of your code.