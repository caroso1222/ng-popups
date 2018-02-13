import { Component, OnInit } from '@angular/core';
import {
  NgxQuickDialogService,
  NgxQuickDialogType,
  NgxQuickDialog,
  NgxQuickDialogResult,
  NgxQuickDialogTheme
} from '../lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  themes = Object.keys(Theme);

  activeTheme: Theme = Theme.Default;

  constructor(private dialog: NgxQuickDialogService) {}

  ngOnInit() {
  }

  open(type: NgxQuickDialogType) {
    const theme = this.activeTheme.toLowerCase() as NgxQuickDialogTheme;
    let dialog: NgxQuickDialogResult;
    if (type === NgxQuickDialogType.Alert) {
      dialog = this.dialog.alert('You can’t actually do that. Names can only be edited by administrators.',
      {
        title: 'Wait not so fast…',
        theme
      });
    } else if (type === NgxQuickDialogType.Confirm) {
      dialog = this.dialog.confirm(`Not my business, but, really, you’re about to make
      an obscene huge mistake. Wanna continue tho?`,
      {
        title: 'You better double check dat',
        theme
      });
    } else {
      dialog = this.dialog.prompt(`Please type your email below. I will annoy you
      every single day of your life with garbage emails you can’t care less about.`,
      {
        title: 'Newsletter signup',
        theme
      });
    }
    dialog.subscribe(res => {
      console.log(res);
    });
  }
}

export enum Theme {
  Default = 'Default',
  Material = 'Material',
  Dark = 'Dark'
}
