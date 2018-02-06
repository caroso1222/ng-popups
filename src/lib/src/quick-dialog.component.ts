import { NgxQuickDialogTheme } from './quick-dialog-theme';
import { fadeInOut } from './quick-dialog.animation';
import { NgxQuickDialogType } from './quick-dialog-type';
import {
  Component,
  HostBinding,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ngx-quick-dialog',
  templateUrl: './quick-dialog.component.html',
  styleUrls: ['./quick-dialog.component.scss'],
  animations: [fadeInOut],
  encapsulation: ViewEncapsulation.None
})
export class NgxQuickDialogComponent implements OnInit {

  private closeSubject: Subject<any> = new Subject();

  $close = this.closeSubject.asObservable();

  type: NgxQuickDialogType;

  types = NgxQuickDialogType;

  message: string;

  closing = false;

  defaultText = '';

  private elWithFocus: HTMLElement;

  @HostBinding('@fadeInOut')
  animation = true;

  theme: NgxQuickDialogTheme = 'default';

  @HostBinding('class')
  themeClass: string;

  @HostBinding('class.ngx-quick-dialog')
  setHostClass = true;

  ngOnInit() {
    this.elWithFocus = document.activeElement as HTMLElement;
    this.themeClass = `ngx-quick-dialog--${this.theme}-theme`;

  }

  escKey() {
    this.close();
  }

  close() {
    this.closing = true;
    requestAnimationFrame(() => {
      this.closeSubject.next();
    });
  }

  onCloseBtnClick() {
    this.close();
  }

  onOkBtnClick() {
    this.close();
  }

  onCancelBtnClick() {
    this.close();
  }

  onBackdropClick() {
    this.close();
  }
}
