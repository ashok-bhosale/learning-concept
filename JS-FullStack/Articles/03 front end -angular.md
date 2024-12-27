Sure! Let's create a simple **Angular** frontend application that communicates with the **REST APIs** for **User Authentication**, **Product Management**, and **Order Creation**. The app will follow the structure we outlined earlier and will use **JWT authentication**, **HTTP Client** for API calls, and **Angular Services** to manage data.

Here’s how to build it:

### Step 1: Set Up an Angular Project

First, you need to create a new Angular project:

```bash
ng new e-commerce-frontend --routing
cd e-commerce-frontend
npm install axios
```

### Step 2: Create the User Authentication Service

We will create an **AuthService** to handle user login, JWT storage, and token management.

#### `src/app/services/auth.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3001'; // User service base URL
  private tokenSubject: BehaviorSubject<string | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  }

  // Get current token
  public get currentToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  // Login user
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password });
  }

  // Store JWT token
  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  // Remove JWT token (logout)
  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Create Authorization headers
  createAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
```

### Step 3: Create the Product Service

This service will interact with the **Product Service API** to fetch product data.

#### `src/app/services/product.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3002'; // Product service base URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get all products
  getProducts(): Observable<any[]> {
    const headers = this.authService.createAuthHeaders();
    return this.http.get<any[]>(`${this.baseUrl}/products`, { headers });
  }

  // Create an order
  createOrder(productId: number, quantity: number): Observable<any> {
    const totalPrice = 100 * quantity; // Simplified price calculation
    const headers = this.authService.createAuthHeaders();
    return this.http.post<any>(`${this.baseUrl}/orders`, { productId, quantity, totalPrice }, { headers });
  }
}
```

### Step 4: Create the Login Component

This component will handle the login form.

#### `src/app/components/login/login.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        const { token } = response;
        this.authService.setToken(token);
        this.router.navigate(['/products']);
      },
      (error) => {
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}
```

#### `src/app/components/login/login.component.html`

```html
<div>
  <h2>Login</h2>
  <form (ngSubmit)="login()">
    <input
      type="email"
      placeholder="Email"
      [(ngModel)]="email"
      name="email"
      required
    />
    <input
      type="password"
      placeholder="Password"
      [(ngModel)]="password"
      name="password"
      required
    />
    <button type="submit">Login</button>
    <div *ngIf="errorMessage" style="color: red;">
      {{ errorMessage }}
    </div>
  </form>
</div>
```

### Step 5: Create the Product List Component

This component will display the products fetched from the **Product Service** and allow users to create an order.

#### `src/app/components/product-list/product-list.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  errorMessage: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching products';
      }
    );
  }

  createOrder(productId: number): void {
    const quantity = prompt('Enter quantity for the product:');
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      alert('Invalid quantity!');
      return;
    }

    this.productService.createOrder(productId, +quantity).subscribe(
      (response) => {
        alert('Order created successfully!');
      },
      (error) => {
        this.errorMessage = 'Error creating order';
      }
    );
  }
}
```

#### `src/app/components/product-list/product-list.component.html`

```html
<div>
  <h2>Products</h2>
  <div *ngIf="errorMessage" style="color: red;">{{ errorMessage }}</div>
  <div *ngFor="let product of products">
    <p>{{ product.name }} - ${{ product.price }}</p>
    <button (click)="createOrder(product.id)">Create Order</button>
  </div>
</div>
```

### Step 6: Set Up Routing

We'll create routes for login and product listing.

#### `src/app/app-routing.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

### Step 7: Update `AppModule`

Ensure all the components and services are declared and imported.

#### `src/app/app.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Step 8: Running the Angular App

Run your Angular app:

```bash
ng serve
```

Now, your **Angular application** should be up and running, and it will communicate with the backend services as follows:

1. **Login**: Users can log in with their credentials, and the JWT token will be stored in `localStorage`.
2. **View Products**: After logging in, users will see a list of products fetched from the **Product Service**.
3. **Create Orders**: Users can create orders for products by selecting a quantity.

### Key Concepts Covered:

1. **JWT Authentication**: The token is stored in `localStorage` and added to the HTTP request headers for authenticated API calls.
2. **Service Layer**: The services (`AuthService`, `ProductService`) encapsulate the logic for making HTTP requests.
3. **Routing**: Reactivity and routing are managed with Angular's **Router**.
4. **HTTP Interceptors (Optional)**: You can add an HTTP interceptor to attach

 the JWT token to all outgoing HTTP requests.

With this setup, you now have a fully functional **Angular** frontend for your **E-commerce Platform** that interacts with the backend services via RESTful APIs.