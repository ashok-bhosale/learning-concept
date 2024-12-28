In Angular, pipes are a way to transform and format data before displaying it in the template. Angular provides several built-in pipes, and you can also create custom pipes to suit your specific needs. Here's how to use both built-in and custom pipes in your Angular application:

**Using Built-In Pipes:**

Angular comes with a set of built-in pipes that you can use in your templates to format and transform data.

**1. Date Pipe:**

The Date pipe is used to format date values. Here's an example of how to use it:

```html
<p>{{ currentDate | date: 'dd/MM/yyyy' }}</p>
```

This will display the `currentDate` in the format "dd/MM/yyyy".

**2. Currency Pipe:**

The Currency pipe is used to format currency values. For example:

```html
<p>{{ price | currency: 'USD':true:'1.2-2' }}</p>
```

This will display the `price` as a currency value with two decimal places and the currency symbol ("$").

**3. Decimal Pipe:**

The Decimal pipe is used to format numbers with a fixed number of decimal places. For example:

```html
<p>{{ pi | number: '1.2-2' }}</p>
```

This will display the value of `pi` with two decimal places.

**4. Uppercase and Lowercase Pipes:**

You can use the `uppercase` and `lowercase` pipes to change the case of a string. For example:

```html
<p>{{ text | uppercase }}</p>
<p>{{ text | lowercase }}</p>
```

**Using Custom Pipes:**

You can create custom pipes to perform more specialized transformations or formatting. To create a custom pipe, follow these steps:

**1. Create a Pipe:**

Use the Angular CLI to generate a new pipe:

```bash
ng generate pipe custom
```

This will create a file named `custom.pipe.ts` with a `transform` method that you can use to define the custom transformation logic.

**2. Implement the Custom Pipe:**

In the `custom.pipe.ts` file, implement the transformation logic in the `transform` method:

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom'
})
export class CustomPipe implements PipeTransform {
  transform(value: string, arg1: any, arg2: any): string {
    // Perform custom transformation logic here
    return value;
  }
}
```

**3. Use the Custom Pipe:**

In your template, you can now use the custom pipe:

```html
<p>{{ text | custom: arg1: arg2 }}</p>
```

Make sure to provide the appropriate arguments to your custom pipe to perform the desired transformation.

**4. Register the Custom Pipe:**

Don't forget to register your custom pipe in your application module. Add it to the `declarations` array:

```typescript
@NgModule({
  declarations: [
    YourComponent,
    CustomPipe
  ],
  // ...
})
export class YourModule { }
```

Using both built-in and custom pipes, you can format and transform data in your Angular templates to display it in the desired way. Custom pipes are particularly useful when you need to perform specialized transformations that are not covered by the built-in pipes.