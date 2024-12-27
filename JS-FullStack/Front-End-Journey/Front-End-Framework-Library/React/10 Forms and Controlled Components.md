Creating and managing forms in React applications involves handling user input, validation, and managing form state. Controlled components are a common approach to manage form inputs in React. Here's how to create and manage forms using controlled components:

**Creating a Form with Controlled Components:**

A controlled component is an input element whose value is controlled by React's state. To create a controlled form input, follow these steps:

**1. Create a Form Component:**

Start by creating a form component that will render the form and handle its state.

```jsx
import React, { Component } from 'react';

class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
    };
  }

  render() {
    return (
      <form>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleInputChange}
        />
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

In this example, we create a form component with two controlled input fields for "username" and "email." The `value` of each input is bound to the corresponding state property.

**2. Handle Input Changes:**

Create an event handler to update the state when the user interacts with the form inputs.

```jsx
handleInputChange = (event) => {
  const { name, value } = event.target;
  this.setState({ [name]: value });
};
```

The `handleInputChange` function takes an event and updates the state based on the input's `name` and `value`.

**3. Submitting the Form:**

To handle form submission, add an `onSubmit` event handler to the form element.

```jsx
handleSubmit = (event) => {
  event.preventDefault();
  // Process the form data (e.g., send it to a server)
};

render() {
  return (
    <form onSubmit={this.handleSubmit}>
      {/* ... form inputs ... */}
      <button type="submit">Submit</button>
    </form>
  );
}
```

In the `handleSubmit` method, you can process the form data, such as sending it to a server.

**Validating Form Data:**

To implement form validation, you can add conditional logic to your event handlers. For example, you can check if the input data meets certain criteria (e.g., is not empty, is a valid email address) and display error messages accordingly.

```jsx
handleInputChange = (event) => {
  const { name, value } = event.target;
  // Perform validation, and set an error state if necessary
  this.setState({ [name]: value, error: false });
};
```

**Displaying Error Messages:**

To display error messages, you can conditionally render elements based on the validation results:

```jsx
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <input
        type="text"
        name="username"
        value={this.state.username}
        onChange={this.handleInputChange}
      />
      {this.state.error && (
        <p className="error">Username is required.</p>
      )}
      {/* ... other inputs ... */}
      <button type="submit">Submit</button>
    </form>
  );
}
```

By following these steps, you can create and manage controlled forms in your React applications. Controlled components provide a structured way to handle form inputs, allowing you to capture user input, validate it, and submit the form data when ready.