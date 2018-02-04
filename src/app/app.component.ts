import { Component, OnInit } from '@angular/core';
import { NgxQuickDialogService } from '../lib';

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
      this.open();
    });
  }

  open() {
    this.dialog.alert('Sure you want to continue?');
  }
}
