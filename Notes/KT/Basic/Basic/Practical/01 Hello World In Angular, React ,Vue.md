Node js install
>node -v
>
>VS code

I'll provide you with step-by-step instructions for setting up, creating, building, and running a "Hello World" program for Angular, React, and Vue 3 separately.

Let's start with Angular:

1. Angular Hello World


```shellscript
# Step 1: Install Angular CLI
npm install -g @angular/cli

# Step 2: Create a new Angular project
ng new angular-hello-world
cd angular-hello-world

# Step 3: Replace the content of src/app/app.component.ts with:

```

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>Hello World!</h1>',
})
export class AppComponent {}
```

```shellscript
# Step 4: Build the project
ng build

# Step 5: Run the project
ng serve
```

Now, open your browser and navigate to `http://localhost:4200`. You should see "Hello World!" displayed.

Next, let's do React:

2. React Hello World


```shellscript
# Step 1: Create a new React project using Create React App
npx create-react-app react-hello-world
cd react-hello-world

# Step 2: Replace the content of src/App.js with:
```

```javascriptreact
import React from 'react';

function App() {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}

export default App;
```

```shellscript
# Step 3: Build the project
npm run build

# Step 4: Run the project
npm start
```

Your browser should automatically open and display "Hello World!" at `http://localhost:3000`.

Finally, let's set up Vue 3:

3. Vue 3 Hello World


```shellscript
# Step 1: Install Vue CLI
npm install -g @vue/cli

# Step 2: Create a new Vue 3 project
vue create vue3-hello-world
cd vue3-hello-world

# Step 3: Replace the content of src/App.vue with:
```

```vue
<template>
  <h1>{{ message }}</h1>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      message: 'Hello World!'
    }
  }
}
</script>
```

```shellscript
# Step 4: Build the project
npm run build

# Step 5: Run the project
npm run serve
```

Open your browser and go to `http://localhost:8080`. You should see "Hello World!" displayed.

These steps will get you started with basic "Hello World" projects in Angular, React, and Vue 3. Each framework has its own structure and conventions, but these examples demonstrate the fundamental setup and execution process for each.

Remember, for all these projects, you can stop the development server by pressing Ctrl+C in the terminal where it's running.