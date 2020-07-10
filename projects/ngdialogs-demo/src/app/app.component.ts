import { Component } from '@angular/core';
import {
  NgDialogsService,
  NgDialogsType,
  NgDialogResult,
  NgDialogsTheme,
} from 'dist/ngdialogs';

export enum Theme {
  Default = 'Default',
  Material = 'Material',
  Dark = 'Dark',
}

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
    'pretty',
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

  open(type: NgDialogsType) {
    const theme = this.activeTheme.toLowerCase() as NgDialogsTheme;
    let dialog: NgDialogResult;
    if (type === NgDialogsType.Alert) {
      dialog = this.ngDialogs.alert(
        'You can’t actually do that. Names can only be edited by administrators.',
        {
          title: 'Wait not so fast…',
          theme,
        }
      );
    } else if (type === NgDialogsType.Confirm) {
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
