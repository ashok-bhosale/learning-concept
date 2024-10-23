In Angular, services are a fundamental part of building modular and maintainable applications. They are used to share data and logic across components, making it easier to manage your application's functionality. Here's a step-by-step guide on how to create and use services in Angular:

**1. Create a Service:**

You can create a service using the Angular CLI, or you can manually create a TypeScript class. Here's how to create a service using the CLI:

```bash
ng generate service my-service
```

This command generates a service file named `my-service.service.ts`.

**2. Define the Service:**

In your service file, define the service class with properties and methods that provide the desired functionality. For example:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This makes the service a singleton across the application.
})
export class MyService {
  private data: string;

  constructor() {
    this.data = 'Initial data';
  }

  getData(): string {
    return this.data;
  }

  setData(newData: string): void {
    this.data = newData;
  }
}
```

In this example, `MyService` has a `getData` method to retrieve data and a `setData` method to update the data. The service is decorated with `@Injectable` to make it injectable into other components.

**3. Inject the Service:**

To use the service in your components, you need to inject it via constructor injection. In the component where you want to use the service, import the service and add it to the constructor. For example:

```typescript
import { Component } from '@angular/core';
import { MyService } from './my-service.service';

@Component({
  selector: 'app-my-component',
  template: `
    <p>Data from service: {{ serviceData }}</p>
    <button (click)="updateData()">Update Data</button>
  `
})
export class MyComponent {
  serviceData: string;

  constructor(private myService: MyService) {
    this.serviceData = myService.getData();
  }

  updateData() {
    this.myService.setData('Updated data');
    this.serviceData = this.myService.getData();
  }
}
```

In this component, the `MyService` is injected into the constructor, allowing you to access the service's methods and properties.

**4. Provide the Service:**

To make the service available to your application, you should provide it in an Angular module. You can either provide the service at the component level or as a singleton service available throughout the application.

For a singleton service available throughout the application, you can provide it in the `@NgModule` decorator of your app module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MyService } from './my-service.service';
import { MyComponent } from './my-component.component';

@NgModule({
  declarations: [MyComponent],
  imports: [BrowserModule],
  providers: [MyService], // Provide the service here
  bootstrap: [MyComponent]
})
export class AppModule { }
```

**5. Use the Service:**

Now, you can use the service in your component as shown in step 3. When the component is created, the service is injected, and its methods can be used to share data and logic across components.

Services are essential for sharing data and logic across different parts of your Angular application, and they help you maintain a clean and modular codebase. They are particularly useful for managing application state, making HTTP requests, and handling business logic.