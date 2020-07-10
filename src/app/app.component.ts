import { Component, OnInit } from '@angular/core';
import {
  NgDialogsService,
  NgDialogType,
  NgDialog,
  NgDialogResult,
  NgDialogTheme,
} from '../lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';

  themes = Object.keys(Theme);

  activeTheme: Theme = Theme.Default;

  feature = 'beautiful';

  features = [
    'beautiful',
    'cross browser compatible',
    'highly configurable',
    'responsive',
    'astounding',
    'themed',
    'i18n compatible',
  ];

  constructor(private ngDialogs: NgDialogsService) {}

  switchFeature() {
    // wait three seconds before changing to the new word
    setTimeout(() => {
      let idx = this.features.indexOf(this.feature) + 1;
      if (idx === this.features.length) {
        idx = 0;
      }
      this.feature = this.features[idx];
    }, 3000);
  }

  open(type: NgDialogType) {
    const theme = this.activeTheme.toLowerCase() as NgDialogTheme;
    let dialog: NgDialogResult;
    if (type === NgDialogType.Alert) {
      dialog = this.ngDialogs.alert(
        'You can’t actually do that. Names can only be edited by administrators.',
        {
          title: 'Wait not so fast…',
          theme,
        }
      );
    } else if (type === NgDialogType.Confirm) {
      dialog = this.ngDialogs.confirm(
        `Not my business, but, really, you’re about to make
                  an obscene huge mistake. Wanna continue tho?`,
        {
          title: 'You better double check dat',
          theme,
        }
      );
    } else {
      dialog = this.ngDialogs.prompt(
        `Please type your email below. I will annoy you every single day
                 of your life with garbage emails you can’t care less about.`,
        {
          title: 'Newsletter signup',
          theme,
        }
      );
    }
    dialog.subscribe((res) => {
      console.log(res);
    });
  }
}

export enum Theme {
  Default = 'Default',
  Material = 'Material',
  Dark = 'Dark',
}
