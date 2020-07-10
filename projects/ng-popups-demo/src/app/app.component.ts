import { Component } from '@angular/core';
import {
  NgPopupsService,
  NgPopupsType,
  NgPopupsResult,
  NgPopupsTheme,
} from 'dist/ng-popups';

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

  constructor(private ngPopups: NgPopupsService) {}

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

  open(type: NgPopupsType) {
    const theme = this.activeTheme.toLowerCase() as NgPopupsTheme;
    let popup: NgPopupsResult;
    if (type === NgPopupsType.Alert) {
      popup = this.ngPopups.alert(
        'You can’t actually do that. Names can only be edited by administrators.',
        {
          title: 'Wait not so fast…',
          theme,
        }
      );
    } else if (type === NgPopupsType.Confirm) {
      popup = this.ngPopups.confirm(
        `Not my business, but, really, you’re about to make
                  an obscene huge mistake. Wanna continue tho?`,
        {
          title: 'You better double check dat',
          theme,
        }
      );
    } else {
      popup = this.ngPopups.prompt(
        `Please type your email below. I will annoy you every single day
                 of your life with garbage emails you can’t care less about.`,
        {
          title: 'Newsletter signup',
          theme,
        }
      );
    }
    popup.subscribe((res) => {
      console.log(res);
    });
  }
}
