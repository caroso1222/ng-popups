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
  host: {
    '(@fadeInOut.done)': 'animationDone()'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxQuickDialog implements OnInit, AfterViewInit, OnDestroy {

  /**
   * Subject used to stream close events
   */
  private closeSubject: Subject<boolean | NgxQuickDialogPromptResult> = new Subject();

  /**
   * Observable that emits on every close action
   */
  $close = this.closeSubject.asObservable();

  /**
   * The type of the dialog
   */
  type: NgxQuickDialogType;

  /**
   * List of all the available dialg types
   */
  types = NgxQuickDialogType;

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
  @ViewChild('promptInput')
  promptInput: ElementRef;

  /**
   * Reference to the dialog content
   */
  @ViewChild('dialogContent')
  dialogContent: ElementRef;

  /**
   * Whether or not to set the host class
   */
  @HostBinding('class.ngx-quick-dialog')
  setHostClass = true;

  /**
   * The config passed by the user via service methods
   */
  localConfig: NgxQuickDialogLocalConfig;

  /**
   * Mapped config that blends both local and global configs
   */
  private _config: NgxQuickDialogCompleteConfig;

  /**
   * The current mapped config
   */
  get config(): NgxQuickDialogCompleteConfig {
    return this._config;
  }

  /**
   * The current theme
   */
  get theme(): NgxQuickDialogTheme {
    return this.config.theme;
  }

  /**
   * Initializes the component
   * @param globalConfig - the configuration passed via .forRoot()
   */
  constructor(@Optional()
              @Inject(NGX_QUICK_DIALOG_CONFIG)
              private globalConfig: NgxQuickDialogGlobalConfig) {}

  /**
   * Initializes the component with the theme and mapped configs
   */
  ngOnInit() {
    this.elWithFocus = document.activeElement as HTMLElement;
    const defaultConfig = new NgxQuickDialogBaseConfig();
    this._config = Object.assign({}, defaultConfig, this.globalConfig, this.localConfig);
    this.themeClass = `ngx-quick-dialog--${this.theme}-theme`;
    this.dialogContent.nativeElement.focus();
  }

  /**
   * Called after Angular initializes the component's views
   */
  ngAfterViewInit() {
    // set the focus to 'content' so that ESC can be listened right away
    this.dialogContent.nativeElement.focus();

    // if the type is Prompt, then set the focus to the input and select
    // the text, just as window.prompt does
    if (this.type === NgxQuickDialogType.Prompt) {
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
    if (this.type === NgxQuickDialogType.Alert) {
      title = titles.alert;
    } else if (this.type === NgxQuickDialogType.Confirm) {
      title = titles.confirm;
    } else {
      title = titles.prompt;
    }
    return title;
  }

  /**
   * Component cleanup. return the focus to the element that was active
   * prior to the quick dialog opening
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

  getOkButtonFillColor() {
    if (this.theme !== 'material') {
      return this.config.color;
    }
  }

  /**
   *
   */
  getCancelButtonBorderColor() {
    // material theme doesn't have border
    if (this.theme !== 'material') {
      return this.config.color;
    }
  }

  getCancelButtonTextColor() {
    // for dark theme the text should always be white
    if (this.theme !== 'dark') {
      return this.config.color;
    }
  }
}
