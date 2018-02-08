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
      this.dialog.alert('Sure you want to continue?', {
        title: 'Wait not so fast…'
      });
    } else if (type === NgxQuickDialogType.Prompt) {
      this.dialog.prompt('Please write your name');
    } else {
      this.dialog.confirm('You sure?');
    }
  }
}
