# Ngx Cool Dialogs

Easily create astounding alert, confirm and prompt dialogs for Angular. Think of `window.alert` and `window.confirm`, but way cooler.

**Demo:** [https://ngx-cool-dialogs.carlosroso.com/](https://ngx-cool-dialogs.carlosroso.com/)


![demo gif](https://user-images.githubusercontent.com/3689856/36462064-25202fc4-168f-11e8-87a0-31cd9b72c3fb.gif)

## Installation

```
npm i ngx-cool-dialogs
```

## Usage

### Basic

1. Add the `NgxCoolDialogsModule` to your core module (e.g. `app.module.ts`). You can optionally
pass a config object as the parameter of the `forRoot` method.

```typescript
import { NgxCoolDialogsModule } from 'ngx-cool-dialogs';

@NgModule({
  ...,
  imports: [
    ...,
    NgxCoolDialogsModule.forRoot(globalConfig)
  ],
  ...
})
export class MyCoreModule { }
```

2. Inject the service `NgxCoolDialogsService` as a dependency of your component.

```typescript
constructor(private coolDialogs: NgxCoolDialogsService) {}
```

3. Start creating dialogs as if there was no tomorrow. 
  Use any of these simple three methods: `alert`, `confirm`, `prompt`.

```typescript
// Alert
this.coolDialogs.alert('Whoa boy, be careful!');

// Confirm
this.coolDialogs.confirm('Do you blindly accept our conditions?')
  .subscribe(res => {
    if (res) {
      console.log('You clicked OK. You dumb.');
    } else {
      console.log('You clicked Cancel. You smart.');
    }
  });

// Prompt. Callback param has the following form:
// { result: boolean, value: string }
this.coolDialogs.prompt('Please type your email below.')
  .subscribe(res => {
    if (res.result) {
      console.log('Thanks, now we have your email:', res.value);
    }
  });

```

### Advanced

#### Global configuration

You can globally configure all your dialogs for properties like titles, texts and colors. Do this
by passing a config object in the `forRoot` module declaration (see step 1).

```
NgxCoolDialogsModule.forRoot(globalConfig: NgxCoolDialogsGlobalConfig)
``` 

##### `NgxCoolDialogsGlobalConfig`

Find below an example of a global config object. Please note that all these properties are
optional. Please check out the SOURCE for full descriptions of all properties and 
its allowed and default values.

```javascript
NgxCoolDialogsModule.forRoot({
  theme: 'material', // available themes: 'default' | 'material' | 'dark'
  okButtonText: 'Yes',
  cancelButtonText: 'No',
  color: '#8030c3',
  titles: {
    alert: 'Danger!',
    confirm: 'Confirmation',
    prompt: 'Website asks...'
  }
});
```

#### Local configuration

You can also pass a configuration object to the methods `alert()`, `confirm()` and `prompt()` as the 
second argument. Any property set here will obviously override the corresponding global configuration.

##### `NgxCoolDialogsLocalConfig`

The configuration example below applies for any of the three main methods. Please check out the 
SOURCE for full descriptions of all properties and its allowed and default values.

```javascript
this.coolDialogs.confirm('Do you agree to follow Barça?', {
  theme: 'dark',
  okButtonText: 'Yes, I do',
  cancelButtonText: 'Nope',
  color: 'red',
  title: 'Wait, think twice'
});
```

**Note:** When using `prompt`, you can also set the `defaultText` property which will be used to 
autofill the text input.

## Contributing

Feel free to open issues, shoot PRs, reach out on [twitter](https://twitter.com/caroso1222), etc.

This is really just a good ol' Angular CLI project. Feel free to clone the project and play around if you
feel like adding new features or fixing bugs. All the library code lies inside `./app/lib/src`. 

## Licence

MIT

---

**Shameless self promotion:** This library was created using [ng-lib-schematics](https://github.com/caroso1222/ng-lib-schematics), 
which is a [Schematic](https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2) I built to create Angular libraries.