import {
  NgxQuickDialogLocalConfig,
  NgxQuickDialogCompleteConfig,
  NgxQuickDialogGlobalConfig,
  NgxQuickDialogBaseConfig
} from './quick-dialog.config';
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
  ChangeDetectionStrategy
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { NGX_QUICK_DIALOG_CONFIG } from './quick-dialog.config';

@Component({
  selector: 'ngx-quick-dialog',
  templateUrl: './quick-dialog.html',
  styleUrls: ['./quick-dialog.scss'],
  animations: [fadeInOut],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
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

  localConfig: NgxQuickDialogLocalConfig;

  private _config: NgxQuickDialogCompleteConfig;

  get config(): NgxQuickDialogCompleteConfig {
    return this._config;
  }

  constructor(@Optional()
              @Inject(NGX_QUICK_DIALOG_CONFIG)
              private globalConfig: NgxQuickDialogGlobalConfig) {}

  ngOnInit() {
    this.elWithFocus = document.activeElement as HTMLElement;
    this.themeClass = `ngx-quick-dialog--${this.theme}-theme`;
    const defaultConfig = new NgxQuickDialogBaseConfig();
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

  getTitle() {
    // if a generic title exists, then use that
    let title = this.config.title;
    if (title) {
      return title;
    }

    // if no title was passed on `open()`, then search
    // through the titles set via global configs
    const titles = this.config.titles || {};
    if (this.type === NgxQuickDialogType.Alert) {
      title = titles.alert;
    } else if (this.type === NgxQuickDialogType.Confirm) {
      title = titles.confirm;
    } else {
      title = titles.prompt;
    }
    console.log({title});
    return title;
  }
}
