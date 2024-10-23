In Angular, you can make HTTP requests to retrieve data from a server using the Angular HttpClient module. The HttpClient module simplifies making HTTP requests and handling responses in a clean and structured way. Here's how to make HTTP requests and handle responses in an Angular application:

**1. Import and Configure HttpClient:**

First, make sure you have imported and configured the `HttpClientModule` in your Angular application. You should import it in your application module (usually `app.module.ts`):

```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    // ...
    HttpClientModule // Add HttpClientModule to the imports array
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**2. Creating a Service for HTTP Requests:**

It's a good practice to encapsulate HTTP requests in a service. Create a service to handle your HTTP requests. For example, let's create a `DataService` service:

```bash
ng generate service data
```

Define the HTTP methods you need in your service, such as `get`, `post`, `put`, `delete`, etc.

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://your-api-url.com';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/data`);
  }

  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/data`, data);
  }
}
```

**3. Making HTTP Requests:**

In your component, inject the `DataService` and use it to make HTTP requests. For example, let's make a GET request to retrieve data:

```typescript
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      <button (click)="fetchData()">Fetch Data</button>
      <p>Data: {{ responseData }}</p>
    </div>
  `
})
export class MyComponent implements OnInit {
  responseData: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Optionally, you can fetch data when the component is initialized
    this.fetchData();
  }

  fetchData() {
    this.dataService.getData().subscribe(
      (data) => {
        this.responseData = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
```

**4. Handling Responses:**

In the component, use the `.subscribe()` method to handle the response from the HTTP request. The subscribe function takes two arguments: a callback function to handle the successful response and a callback function to handle errors.

**5. Error Handling:**

Don't forget to handle errors using the second callback function of the `subscribe` method. You can log errors or show error messages to the user.

**6. Displaying Data:**

Use the response data in your component's template to display it. In this example, the `responseData` property is bound to the template to display the fetched data.

Angular's HttpClient module returns Observables by default, making it easy to handle asynchronous responses, error handling, and data transformation.

By following these steps, you can make HTTP requests to retrieve data from a server and handle responses in your Angular application effectively.