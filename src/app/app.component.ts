import { Component } from '@angular/core';
import { NgxQuickDialogService } from '../lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private dialog: NgxQuickDialogService) {}

  open() {
    this.dialog.confirm('Sure you want to continue?');
  }
}
