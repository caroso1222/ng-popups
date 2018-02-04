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

  message: string;

  closing = false;

  defaultText = '';

  private elWithFocus: HTMLElement;

  @HostBinding('@fadeInOut')
  animation = true;

  @HostBinding('class.ngx-quick-dialog')
  setHostClass = true;

  ngOnInit() {
    this.elWithFocus = document.activeElement as HTMLElement;
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
