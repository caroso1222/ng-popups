# Ngx Quick Dialogs

Easily create astounding alert, confirm and prompt dialogs for Angular. Think of `window.alert` and `window.confirm`, but way cooler.

**Demo:** [carlosroso.com/ngx-quick-dialogs](http://carlosroso.com/ngx-quick-dialogs/)

![demo gif](https://media.giphy.com/media/l2SpZitHNMHjic8Mw/giphy.gif)

## Installation

```
npm i ngx-quick-dialogs
```

## Usage

1. Add the `NgxQuickDialogsModule` to your core module (e.g. `app.module.ts`). You can optionally
pass a config object as the parameter of the `forRoot` method.

```typescript
import { NgxQuickDialogModule } from 'ngx-quick-dialogs';

@NgModule({
  ...,
  imports: [
    ...,
    NgxQuickDialogModule.forRoot(config)
  ],
  ...
})
export class MyCoreModule { }
```

2. Inject the service `NgxQuickDialogService` as a dependency of your component.

```typescript
constructor(private quickDialogs: NgxQuickDialogService) {}
```

3. Start creating dialogs as if there was no tomorrow. 
  Use any of these simple three methods: `alert`, `confirm`, `prompt`.

```typescript
// Alert
this.quickDialogs.alert('Whoa boy, be careful!');

// Confirm
this.quickDialogs.confirm('Do you blindly accept our conditions?')
  .subscribe(res => {
    if (res) {
      console.log('You clicked OK. You dumb.');
    } else {
      console.log('You clicked Cancel. You smart.');
    }
  });
```