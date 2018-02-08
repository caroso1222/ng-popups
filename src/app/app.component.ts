import { Component, OnInit } from '@angular/core';
import { NgxQuickDialogService, NgxQuickDialogType } from '../lib';

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
    if (type === NgxQuickDialogType.Alert) {
      this.dialog.alert('You can’t actually do that. Names can only be edited by administrators.',
      {
        title: 'Wait not so fast…',
        theme: 'material'
      });
    } else if (type === NgxQuickDialogType.Confirm) {
      this.dialog.confirm(`Not my business, but, really, you’re about to make
      an obscene huge mistake. Wanna continue tho?`);
    } else {
      this.dialog.prompt(`Please type your email below. I will annoy you
      every single day of your life with garbage emails you can’t care less about.`,
      {
        okButtonText: 'Sure, whatever',
        theme: 'dark'
      });
    }
  }
}
