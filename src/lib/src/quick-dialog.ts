import { NgxQuickDialogOptions } from './quick-dialog-options';
import { NgxQuickDialogTheme } from './quick-dialog-theme';
import { fadeInOut } from './quick-dialog.animation';
import { NgxQuickDialogType } from './quick-dialog-type';
import {
  Component,
  HostBinding,
  ViewEncapsulation,
  OnInit,
  Optional,
  Inject,
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { NGX_QUICK_DIALOG_CONFIG } from './quick-dialog.config';

@Component({
  selector: 'ngx-quick-dialog',
  templateUrl: './quick-dialog.html',
  styleUrls: ['./quick-dialog.scss'],
  animations: [fadeInOut],
  encapsulation: ViewEncapsulation.None
})
export class NgxQuickDialog implements OnInit {

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

  localConfig: NgxQuickDialogOptions;

  private _config: NgxQuickDialogOptions;

  get config(): NgxQuickDialogOptions {
    return this._config;
  }

  constructor(@Optional()
              @Inject(NGX_QUICK_DIALOG_CONFIG)
              private globalConfig: NgxQuickDialogOptions) {}

  ngOnInit() {
    this.elWithFocus = document.activeElement as HTMLElement;
    this.themeClass = `ngx-quick-dialog--${this.theme}-theme`;
    const defaultConfig = new NgxQuickDialogOptions();
    this._config = Object.assign({}, defaultConfig, this.globalConfig, this.localConfig);
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
