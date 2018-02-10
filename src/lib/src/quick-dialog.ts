import {
  NgxQuickDialogLocalConfig,
  NgxQuickDialogCompleteConfig,
  NgxQuickDialogGlobalConfig,
  NgxQuickDialogBaseConfig
} from './quick-dialog.config';
import { NgxQuickDialogTheme } from './quick-dialog-theme';
import { fadeInOut } from './quick-dialog.animation';
import {
  NgxQuickDialogType,
  NgxQuickDialogPromptResult
} from './quick-dialog-types';
import {
  Component,
  HostBinding,
  ViewEncapsulation,
  OnInit,
  Optional,
  Inject,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
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
export class NgxQuickDialog implements OnInit, AfterViewInit, OnDestroy {

  private closeSubject: Subject<boolean | NgxQuickDialogPromptResult> = new Subject();

  $close = this.closeSubject.asObservable();

  type: NgxQuickDialogType;

  types = NgxQuickDialogType;

  message: string;

  closing = false;

  defaultText = '';

  private elWithFocus: HTMLElement;

  @HostBinding('@fadeInOut')
  animation = true;

  @HostBinding('class')
  themeClass: string;

  @ViewChild('promptInput')
  promptInput: ElementRef;

  @ViewChild('dialogContent')
  dialogContent: ElementRef;

  @HostBinding('class.ngx-quick-dialog')
  setHostClass = true;

  localConfig: NgxQuickDialogLocalConfig;

  private _config: NgxQuickDialogCompleteConfig;

  get config(): NgxQuickDialogCompleteConfig {
    return this._config;
  }

  get theme(): NgxQuickDialogTheme {
    return this.config.theme;
  }

  constructor(@Optional()
              @Inject(NGX_QUICK_DIALOG_CONFIG)
              private globalConfig: NgxQuickDialogGlobalConfig) {}

  ngOnInit() {
    this.elWithFocus = document.activeElement as HTMLElement;
    const defaultConfig = new NgxQuickDialogBaseConfig();
    this._config = Object.assign({}, defaultConfig, this.globalConfig, this.localConfig);
    this.themeClass = `ngx-quick-dialog--${this.theme}-theme`;
    this.dialogContent.nativeElement.focus();
  }

  ngAfterViewInit() {
    // set the focus to 'content' so that ESC can be listened right away
    this.dialogContent.nativeElement.focus();
    if (this.type === NgxQuickDialogType.Prompt) {
      this.promptInput.nativeElement.focus();
    }
  }

  escKey() {
    this.close();
  }

  enterKey() {
    if (this.type === NgxQuickDialogType.Prompt) {
      this.close(true);
    }
  }

  close(result = false) {
    this.closing = true;
    requestAnimationFrame(() => {
      let payload;
      if (this.type === NgxQuickDialogType.Prompt) {
        payload = {
          result,
          value: this.promptInput.nativeElement.value || ''
        };
      } else {
        payload = result;
      }
      this.closeSubject.next(payload);
    });
  }

  onCloseBtnClick() {
    this.close();
  }

  onOkBtnClick() {
    this.close(true);
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
    return title;
  }

  ngOnDestroy() {
    // return the focus to the element that was active
    // prior to the quick dialog opening
    const body = document.body;
    const elWithFocus = this.elWithFocus;

    let elementToFocus;
    if (elWithFocus && elWithFocus.focus && body.contains(elWithFocus)) {
      elementToFocus = elWithFocus;
    } else {
      elementToFocus = body;
    }
    elementToFocus.focus();
    this.elWithFocus = null;
  }
}
