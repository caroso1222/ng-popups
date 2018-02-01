import { fadeInOut } from './quick-dialog.animation';
import { NgxQuickDialogType } from './quick-dialog-type';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ngx-quick-dialog',
  templateUrl: './quick-dialog.component.html',
  styleUrls: ['./quick-dialog.component.scss'],
  animations: [fadeInOut]
})
export class NgxQuickDialogComponent {
  type: NgxQuickDialogType;

  message: string;

  @HostBinding('@fadeInOut')
  animation = true;

  escKey() {
    this.close();
  }

  close() {

  }

}
