import { Component, OnInit } from '@angular/core';
import {
  NgxQuickDialogService,
  NgxQuickDialogType,
  NgxQuickDialog,
  NgxQuickDialogResult
} from '../lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private dialog: NgxQuickDialogService) {}

  ngOnInit() {
    requestAnimationFrame(() => {
      this.open(NgxQuickDialogType.Alert);
    });
  }

  open(type: NgxQuickDialogType) {
    let dialog: NgxQuickDialogResult;
    if (type === NgxQuickDialogType.Alert) {
      dialog = this.dialog.alert('You can’t actually do that. Names can only be edited by administrators.',
      {
        title: 'Wait not so fast…',
        theme: 'material'
      });
    } else if (type === NgxQuickDialogType.Confirm) {
      dialog = this.dialog.confirm(`Not my business, but, really, you’re about to make
      an obscene huge mistake. Wanna continue tho?`);
    } else {
      dialog = this.dialog.prompt(`Please type your email below. I will annoy you
      every single day of your life with garbage emails you can’t care less about.`,
      {
        okButtonText: 'Sure, whatever',
        theme: 'dark',
        color: 'purple'
      });
    }
    dialog.subscribe(res => {
      console.log(res);
    });
  }
}
