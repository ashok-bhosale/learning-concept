Ensuring cross-browser compatibility is a crucial aspect of web development, as different browsers may interpret and render code differently. Additionally, handling legacy browsers, which lack support for modern web standards, is a common challenge. Here are techniques and best practices for achieving cross-browser compatibility and dealing with legacy browsers:

### 1. **Feature Detection:**

Instead of relying on browser detection, use feature detection to check if a particular feature or API is supported. This allows your code to adapt to the capabilities of the browser.

```javascript
if (window.localStorage) {
  // Local storage is supported
  // Your code here
} else {
  // Local storage is not supported
  // Handle accordingly
}
```

### 2. **Progressive Enhancement:**

Start with a baseline of functionality that works across all browsers and progressively enhance it for modern browsers that support additional features.

```html
<!-- Basic HTML structure for all browsers -->
<div id="content">
  <p>This is some content.</p>
</div>

<!-- Enhanced features for modern browsers -->
<script>
  if (document.querySelector) {
    // Modern browser, enhance the UI
    const content = document.querySelector('#content');
    content.classList.add('rounded-corners');
  }
</script>
```

### 3. **Vendor Prefixes for CSS:**

Some CSS properties may require vendor prefixes to work across different browsers. Use tools like Autoprefixer to automatically add the necessary prefixes during the build process.

```css
/* Without vendor prefixes */
.box {
  border-radius: 10px;
}

/* With vendor prefixes */
.box {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
}
```

### 4. **Polyfills:**

Polyfills are pieces of code that provide modern functionality to older browsers. Use polyfills selectively to fill the gaps in functionality.

```javascript
// Polyfill for Array.prototype.includes
if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement, fromIndex) {
    // Implementation here
  };
}
```

### 5. **Normalize CSS:**

Use a CSS normalization library, like Normalize.css, to ensure consistent rendering across different browsers by resetting default styles.

```html
<!-- Include Normalize.css in your HTML -->
<link rel="stylesheet" href="https://necolas.github.io/normalize.css/latest/normalize.css">
```

### 6. **Feature Policy:**

Use the `Feature-Policy` HTTP header to control which browser features your site can use, providing an additional layer of control over browser behavior.

```html
<!-- Restrict the use of certain features -->
<meta http-equiv="Feature-Policy" content="geolocation 'none'; microphone 'none';">
```

### 7. **Transpilers for JavaScript:**

Use transpilers like Babel to convert modern ECMAScript features into a compatible version that works on older browsers.

```javascript
// Modern JavaScript
const myArray = [1, 2, 3];
const doubled = myArray.map(item => item * 2);

// Transpiled JavaScript
var myArray = [1, 2, 3];
var doubled = myArray.map(function (item) {
  return item * 2;
});
```

### 8. **Testing Across Multiple Browsers:**

Regularly test your website or application across different browsers and devices to identify and address compatibility issues. Use tools like BrowserStack or cross-browser testing services.

### 9. **Graceful Degradation:**

Build your web application with the expectation that certain features might not be available in all browsers. Ensure that the core functionality remains usable, even if some enhancements are not present.

By incorporating these techniques into your web development workflow, you can improve cross-browser compatibility and gracefully handle legacy browsers, providing a more consistent and reliable experience for users across various platforms.