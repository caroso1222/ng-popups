# NgPopups

[![npm version](https://badge.fury.io/js/ng-popups.svg)](https://badge.fury.io/js/ng-popups)
[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)](LICENSE)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/caroso1222/ng-popups/pulls)

Easily create **alert, confirm and prompt dialogs** for Angular. Think of `window.alert` or `window.confirm`, but more angularish and way prettier.

**Demo:** [https://ngx-cool-dialogs.carlosroso.com/](https://ngx-cool-dialogs.carlosroso.com/)

![demo gif](https://user-images.githubusercontent.com/3689856/36462314-a970271a-1690-11e8-9949-183e0ce3bf54.gif)

## Features

- Cross browser compatible
- Responsive
- Easy to use
- Highly configurable
- Packaged with the official Angular format
- Good a11y and i18n support
- Support for Angular v9

## Installation

```
npm i ng-popups @angular/cdk
```

## Usage

### Basic

1. Add the `NgPopupsModule` to your core module (e.g. `app.module.ts`). You can optionally
pass a config object as the parameter of the `forRoot` method.

```typescript
import { NgPopupsModule } from 'ng-popups';

@NgModule({
  ...,
  imports: [
    ...,
    NgPopupsModule.forRoot(globalConfig)
  ],
  ...
})
export class MyCoreModule { }
```

2. Inject the service `NgPopupsService` as a dependency of your component.

```typescript
constructor(private ngPopups: NgPopupsService) {}
```

3. Make sure you have `BrowserAnimationsModule` imported in your root module (e.g. `app.module.ts`).

```typescript
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
...
@NgModule({
  declarations: [ ... ],
  imports: [
    ...,
    BrowserAnimationsModule,
    ...
  ],
  providers: [ ... ],
  bootstrap: [AppComponent]
})
```

4. Use any of these three methods to create the dialogs: `alert`, `confirm`, `prompt`.

```typescript
// Alert
this.ngPopups.alert('Whoa boy, be careful!');

// Confirm
this.ngPopups.confirm('Do you blindly accept our conditions?')
  .subscribe(res => {
    if (res) {
      console.log('You clicked OK. You dumb.');
    } else {
      console.log('You clicked Cancel. You smart.');
    }
  });

// Prompt. Callback param has the following form:
// { result: boolean, value: string }
this.ngPopups.prompt('Please type your email below.')
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
NgPopupsModule.forRoot(globalConfig: NgPopupsGlobalConfig)
``` 

##### `NgPopupsGlobalConfig`

Find below an example of a global config object. Please note that all these properties are
optional. Please check out the SOURCE for full descriptions of all properties and 
its allowed and default values.

```javascript
NgPopupsModule.forRoot({
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

##### `NgPopupsLocalConfig`

The configuration example below applies for any of the three main methods. Please check out the 
SOURCE for full descriptions of all properties and its allowed and default values.

```javascript
this.ngPopups.confirm('Do you agree to follow Barça?', {
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
feel like adding new features or fixing bugs. 

Run the demo via `npm start`. All the library code lies inside `projects/ng-popups`. 

## Licence

MIT © [Carlos Roso](https://carlosroso.com/)

---

**Shameless self promotion:** This library was created using [ng-lib-schematics](https://github.com/caroso1222/ng-lib-schematics), 
which is a [Schematic](https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2) I built to create Angular libraries.