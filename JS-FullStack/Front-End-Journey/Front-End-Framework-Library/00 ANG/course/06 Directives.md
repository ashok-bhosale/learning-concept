In Angular, directives are instructions that modify the DOM (Document Object Model) or behavior of HTML elements. There are built-in directives provided by Angular, such as `ngFor` and `ngIf`, which help you manage the structure and behavior of your templates. Additionally, you can create custom directives to extend the functionality of your application. Let's explore built-in directives and how to create custom directives:

**1. `ngFor` Directive:**

The `ngFor` directive is used for rendering lists or collections of data in your Angular templates. It iterates over each item in an array or iterable object and generates HTML elements accordingly.

Example of using `ngFor` to loop through an array of items:

```html
<ul>
  <li *ngFor="let item of items">{{ item }}</li>
</ul>
```

In this example, `items` is an array defined in the component class, and `*ngFor` iterates over the array to create an `<li>` element for each item in the list.

**2. `ngIf` Directive:**

The `ngIf` directive is used for conditional rendering. It displays or removes an element based on the evaluation of a condition. If the condition is true, the element is shown; otherwise, it is removed from the DOM.

Example of using `ngIf` to conditionally display an element:

```html
<div *ngIf="isLoggedIn">
  Welcome, {{ username }}
</div>
```

In this example, the `div` element is displayed only if the `isLoggedIn` property in the component class is `true`.

**3. Custom Directives:**

You can create custom directives to encapsulate and reuse functionality throughout your application. Custom directives are defined as TypeScript classes decorated with `@Directive`, and they can manipulate the DOM or provide custom behavior.

Here's an example of creating a custom directive:

```typescript
import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @Input('appHighlight') highlightColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor || 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

In this example, we define a `HighlightDirective` that changes the background color of an element when the mouse enters and reverts it when the mouse leaves. The directive is used in the HTML template like this:

```html
<p [appHighlight]="'lightblue'">Hover to highlight</p>
```

**4. Using Custom Directives:**

To use a custom directive, you must import and declare it in an Angular module's `declarations` array. For the `HighlightDirective` from the previous example, you would include it like this:

```typescript
@NgModule({
  declarations: [YourComponent, HighlightDirective],
})
```

After declaring the custom directive, you can apply it to elements using the directive's selector, as shown in the HTML example above.

**5. Directives in Angular Modules:**

Remember to import any modules that are necessary for your custom directives to work. For example, if you are using `ngFor` or `ngIf` in your custom directive, you should import the `CommonModule` from `@angular/common`.

Custom directives can be used to encapsulate complex behavior or to create reusable components. They can be applied to any HTML element, extending the capabilities of your Angular application.