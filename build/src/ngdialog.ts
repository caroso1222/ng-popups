import {
  NgDialogsLocalConfig,
  NgDialogsCompleteConfig,
  NgDialogsGlobalConfig,
  NgDialogsBaseConfig,
} from './ngdialogs.config';
import { NgDialogTheme } from './ngdialogs-theme';
import { fadeInOut } from './ngdialogs.animation';
import { NgDialogType, NgDialogPromptResult } from './ngdialogs-types';
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
  OnDestroy,
} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NGDIALOG_CONFIG } from './ngdialogs.config';

@Component({
  selector: 'ngdialog',
  template: "<div class=\"ngdialog__backdrop\" (click)=\"onBackdropClick()\" [@fadeInOut]></div> <div class=\"ngdialog__content\" #dialogContent tabindex=\"-1\" (keyup.esc)=\"escKey()\" (keyup.enter)=\"enterKey()\" [class.ngdialog__content--closing]=\"closing\"> <div class=\"ngdialog__header\"> <h3 class=\"ngdialog__title\"> <ng-container *ngIf=\"getTitle(); else anotherTitle\"> {{ getTitle() }} </ng-container> <ng-template #anotherTitle> <ng-container *ngIf=\"type === types.Alert\" i18n=\"The default title for Alert dialogs@@ngDialogAlert\"> Alert </ng-container> <ng-container *ngIf=\"type === types.Confirm\" i18n=\"The default title for Confirm dialogs@@ngDialogConfirm\"> Confirm </ng-container> <ng-container *ngIf=\"type === types.Prompt\" i18n=\"The default title for Prompt dialogs@@ngDialogPrompt\"> Prompt </ng-container> </ng-template> </h3> <button class=\"ngdialog__close-btn\" *ngIf=\"theme !== 'material'\" (click)=\"onCloseBtnClick()\"> <span class=\"ngdialog__close-symbol\"></span> </button> </div> <hr class=\"ngdialog__divider\"> <p class=\"ngdialog__text\"> {{ message }} </p> <input *ngIf=\"type === types.Prompt\" type=\"text\" #promptInput autofocus class=\"ngdialog__input\"> <div class=\"ngdialog__footer\"> <button *ngIf=\"type === types.Confirm || type === types.Prompt\" class=\"ngdialog__cancel-btn\" [style.color]=\"getCancelButtonTextColor()\" [style.border-color]=\"getCancelButtonBorderColor()\" (click)=\"onCancelBtnClick()\"> <ng-container *ngIf=\"!config.cancelButtonText; else customCancelLabel\" i18n=\"The default text in the Cancel btn@@ngDialogCancelButton\"> Cancel </ng-container> <ng-template #customCancelLabel> {{ config.cancelButtonText }} </ng-template> </button> <button class=\"ngdialog__ok-btn\" [style.color]=\"getOkButtonTextColor()\" [style.background-color]=\"getOkButtonFillColor()\" (click)=\"onOkBtnClick()\"> <ng-container *ngIf=\"!config.okButtonText; else customOkLabel\" i18n=\"The default text in the OK btn@@ngDialogOKButton\"> OK </ng-container> <ng-template #customOkLabel> {{ config.okButtonText }} </ng-template> </button> </div> </div> ",
  styles: [".ngdialog{position:fixed;z-index:9999;top:0;width:100%;left:0;height:100%;text-align:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:0 20px}.ngdialog__backdrop{position:absolute;z-index:10;top:0;bottom:0;left:0;right:0;background:rgba(5,6,19,.64)}.ngdialog__backdrop--hidden{background:0 0}.ngdialog__content{width:425px;background:#fff;-webkit-box-shadow:0 3px 13px rgba(0,0,0,.5);box-shadow:0 3px 13px rgba(0,0,0,.5);border-radius:2px;overflow:hidden;z-index:20;position:relative;padding:19px 21px;-webkit-animation-name:ngdialog-fade-in-up;animation-name:ngdialog-fade-in-up;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-timing-function:cubic-bezier(.785,.135,.15,.86);animation-timing-function:cubic-bezier(.785,.135,.15,.86)}.ngdialog__content--closing{-webkit-animation-name:ngdialog-fade-out-down;animation-name:ngdialog-fade-out-down;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}.ngdialog__input{display:block;width:100%;margin-bottom:20px;height:38px;border-radius:2px;border:1px solid #d6d6d6;font-size:1em;padding:0 10px}.ngdialog__header{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:18px;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ngdialog__title{margin:0;font-size:1.14em;font-weight:600}.ngdialog__divider{border-top:1px solid #ededed;border-bottom:none;margin-bottom:14px;border-right:none;border-left:none}.ngdialog__text{margin-top:0;text-align:left;line-height:1.6em;margin-bottom:16px}.ngdialog__footer{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.ngdialog__cancel-btn,.ngdialog__ok-btn{height:36px;padding:0 24px;border-radius:2px;font-weight:600;font-size:1em}.ngdialog__cancel-btn{border:1px solid #3f51b5;color:#3f51b5;background:0 0;margin-right:16px}.ngdialog__cancel-btn:hover{background:#fafafa}.ngdialog__ok-btn{border:none;background:#3f51b5;color:#fff;min-width:100px}.ngdialog__ok-btn:hover{opacity:.93}.ngdialog__close-btn{border:none;background:0 0;padding:0}.ngdialog__close-symbol{height:12px;width:12px;position:relative;display:block}.ngdialog__close-symbol:after,.ngdialog__close-symbol:before{content:\"\";height:2px;width:100%;border-radius:2px;background:#d9d9d9;position:absolute;top:calc(50% - 1px);left:0}.ngdialog__close-symbol:after{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.ngdialog__close-symbol:before{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.ngdialog__close-symbol:hover:after,.ngdialog__close-symbol:hover:before{background:#bdbdbd}.ngdialog--dark-theme .ngdialog--dark-theme .ngdialog--dark-theme .ngdialog__divider{border-top-color:#424346}.ngdialog--dark-theme .ngdialog--dark-theme .ngdialog--dark-theme .ngdialog__content{background:#323337}.ngdialog--dark-theme .ngdialog--dark-theme .ngdialog--dark-theme .ngdialog__title{color:#fff;font-weight:700}.ngdialog--dark-theme .ngdialog--dark-theme .ngdialog--dark-theme .ngdialog__text{color:#fff;font-weight:600}.ngdialog--dark-theme .ngdialog--dark-theme .ngdialog--dark-theme .ngdialog__cancel-btn{background:0 0;color:#fff;border-width:2px}.ngdialog--dark-theme .ngdialog--dark-theme .ngdialog--dark-theme .ngdialog__cancel-btn:hover{background:rgba(255,255,255,.03)}.ngdialog--dark-theme .ngdialog--dark-theme .ngdialog--dark-theme .ngdialog__input{background:0 0;color:#fff}@-webkit-keyframes ngdialog-fade-in-up{from{opacity:0;-webkit-transform:translateY(11px);transform:translateY(11px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes ngdialog-fade-in-up{from{opacity:0;-webkit-transform:translateY(11px);transform:translateY(11px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes ngdialog-fade-out-down{from{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}to{opacity:0;-webkit-transform:translateY(17px);transform:translateY(17px)}}@keyframes ngdialog-fade-out-down{from{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}to{opacity:0;-webkit-transform:translateY(17px);transform:translateY(17px)}}.ngdialog--material-theme .ngdialog__divider{display:none}.ngdialog--material-theme .ngdialog__title{font-size:1.42em;font-weight:700}.ngdialog--material-theme .ngdialog__content{padding-bottom:15px}.ngdialog--material-theme .ngdialog__header{margin-bottom:12px}.ngdialog--material-theme .ngdialog__ok-btn{min-width:inherit;background:0 0;color:#3f51b5;margin-left:0}.ngdialog--material-theme .ngdialog__ok-btn:hover{background:#fafafa}.ngdialog--material-theme .ngdialog__cancel-btn{border:none}.ngdialog--material-theme .ngdialog__cancel-btn,.ngdialog--material-theme .ngdialog__ok-btn{padding:0 16px;font-weight:700;text-transform:uppercase}.ngdialog--material-theme .ngdialog__text{font-size:1.14em;margin-bottom:12px}.ngdialog--material-theme .ngdialog__input{border-radius:0;border:none;border-bottom:1px solid #979797;padding-left:0;font-size:1.14em}.ngdialog--dark-theme .ngdialog__divider{border-top-color:#424346}.ngdialog--dark-theme .ngdialog__content{background:#323337}.ngdialog--dark-theme .ngdialog__title{color:#fff;font-weight:700}.ngdialog--dark-theme .ngdialog__text{color:#fff;font-weight:600}.ngdialog--dark-theme .ngdialog__cancel-btn{background:0 0;color:#fff;border-width:2px}.ngdialog--dark-theme .ngdialog__cancel-btn:hover{background:rgba(255,255,255,.03)}.ngdialog--dark-theme .ngdialog__input{background:0 0;color:#fff}@media screen and (min-device-width:320px) and (max-device-width:480px){.ngdialog--dark-theme .ngdialog__cancel-btn,.ngdialog--dark-theme .ngdialog__ok-btn,.ngdialog--default-theme .ngdialog__cancel-btn,.ngdialog--default-theme .ngdialog__ok-btn{-webkit-box-flex:1;-ms-flex:1;flex:1;padding:10px 10px;height:inherit}}"],
  animations: [fadeInOut],
  host: {
    '(@fadeInOut.done)': 'animationDone()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgDialog implements OnInit, AfterViewInit, OnDestroy {
  /**
   * Subject used to stream close events
   */
  private closeSubject: Subject<boolean | NgDialogPromptResult> = new Subject();

  /**
   * Observable that emits on every close action
   */
  $close: Observable<
    boolean | NgDialogPromptResult
  > = this.closeSubject.asObservable();

  /**
   * The type of the dialog
   */
  type: NgDialogType;

  /**
   * List of all the available dialg types
   */
  types = NgDialogType;

  /**
   * Main text to render inside the dialog
   */
  message: string;

  /**
   * Whether or not the dialog is closing
   */
  closing = false;

  /**
   * Whether or not to listen to 'enter' key
   */
  canListenToEnter = false;

  /**
   * Element that is focused prior to modal opening
   */
  private elWithFocus: HTMLElement;

  /**
   * Whether or not to enable host animation
   */
  @HostBinding('@fadeInOut')
  animation = true;

  /**
   * Class to be applied according to the desired theme
   */
  @HostBinding('class')
  themeClass: string;

  /**
   * Reference to the prompt text input
   */
  @ViewChild('promptInput', { static: false })
  promptInput: ElementRef;

  /**
   * Reference to the dialog content
   */
  @ViewChild('dialogContent', { static: true })
  dialogContent: ElementRef;

  /**
   * Whether or not to set the host class
   */
  @HostBinding('class.ngdialog')
  setHostClass = true;

  /**
   * The config passed by the user via service methods
   */
  localConfig: NgDialogsLocalConfig;

  /**
   * Mapped config that blends both local and global configs
   */
  private _config: NgDialogsCompleteConfig;

  /**
   * The current mapped config
   */
  get config(): NgDialogsCompleteConfig {
    return this._config;
  }

  /**
   * The current theme
   */
  get theme(): NgDialogTheme {
    return this.config.theme;
  }

  /**
   * Initializes the component
   * @param globalConfig - the configuration passed via .forRoot()
   */
  constructor(
    @Optional()
    @Inject(NGDIALOG_CONFIG)
    private globalConfig: NgDialogsGlobalConfig
  ) {}

  /**
   * Initializes the component with the theme and mapped configs
   */
  ngOnInit() {
    this.elWithFocus = document.activeElement as HTMLElement;
    const defaultConfig = new NgDialogsBaseConfig();
    this._config = Object.assign(
      {},
      defaultConfig,
      this.globalConfig,
      this.localConfig
    );
    this.themeClass = `ngdialog--${this.theme}-theme`;
  }

  /**
   * Called after Angular initializes the component's views
   */
  ngAfterViewInit() {
    // set the focus to 'content' so that ESC can be listened right away
    this.dialogContent.nativeElement.focus();

    // if the type is Prompt, then set the focus to the input and select
    // the text, just as window.prompt does
    if (this.type === NgDialogType.Prompt) {
      const input = this.promptInput.nativeElement as HTMLInputElement;
      input.focus();
      const defaultText = this.config.defaultText;
      if (defaultText) {
        input.value = defaultText;
        input.setSelectionRange(0, defaultText.length);
      }
    }
  }

  /**
   * Listener for the 'esc' key
   */
  escKey() {
    this.close();
  }

  /**
   * Listener for the 'enter' key. It needs a fake 'debounce' otherwise
   * the dialog would close immediately after it's opened, if it
   * was trigger via an 'enter' key prior to dialog opening.
   */
  enterKey() {
    if (this.canListenToEnter) {
      this.close(true);
    }
  }

  /**
   * Closes the current dialog. Emits an event with the payload.
   * The payload can either be a boolean, or an object if the type
   * is Prompt.
   * @param result - whether it was 'Cancel': false, or 'OK': true
   */
  close(result = false) {
    this.closing = true;
    requestAnimationFrame(() => {
      let payload;
      if (this.type === NgDialogType.Prompt) {
        payload = {
          result,
          value: this.promptInput.nativeElement.value || '',
        };
      } else {
        payload = result;
      }
      this.closeSubject.next(payload);
    });
  }

  /**
   * Listener for click events on the 'x' button
   */
  onCloseBtnClick() {
    this.close();
  }

  /**
   * Function called when the main host animation finishes
   */
  animationDone() {
    this.canListenToEnter = true;
  }

  /**
   * Listener for click events on the 'OK' button
   */
  onOkBtnClick() {
    this.close(true);
  }

  /**
   * Listener for click events on the 'Cancel' button
   */
  onCancelBtnClick() {
    this.close();
  }

  /**
   * Listener for click events on the backdrop shadow
   */
  onBackdropClick() {
    this.close();
  }

  /**
   * The dialog's title
   */
  getTitle() {
    // if a generic title exists, then use that
    let title = this.config.title;
    if (title) {
      return title;
    }

    // if no title was passed on `open()`, then search
    // through the titles set via global configs
    const titles = this.config.titles || {};
    if (this.type === NgDialogType.Alert) {
      title = titles.alert;
    } else if (this.type === NgDialogType.Confirm) {
      title = titles.confirm;
    } else {
      title = titles.prompt;
    }
    return title;
  }

  /**
   * Component cleanup. return the focus to the element that was active
   * prior to the dialog opening
   */
  ngOnDestroy() {
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

  /**
   * Returns the fill color of the 'OK' button
   */
  getOkButtonTextColor(): string {
    // only for material theme the 'OK' has a color different than white
    if (this.theme === 'material') {
      return this.config.color;
    }
  }

  /**
   * Returns the fill color of the 'OK' button
   */
  getOkButtonFillColor(): string {
    // material theme doesn't have filled buttons
    if (this.theme !== 'material') {
      return this.config.color;
    }
  }

  /**
   * Returns the border color of the 'Cancel' button
   */
  getCancelButtonBorderColor(): string {
    // material theme doesn't have border
    if (this.theme !== 'material') {
      return this.config.color;
    }
  }

  /**
   * Returns the text color of the 'Cancel' button
   */
  getCancelButtonTextColor(): string {
    // for dark theme the text should always be white
    if (this.theme !== 'dark') {
      return this.config.color;
    }
  }
}
