import { NgxQuickDialogTheme } from './quick-dialog-theme';

export class NgxQuickDialogOptions {
  theme?: NgxQuickDialogTheme;
  okBtnLabel?: string;
  cancelBtnLabel?: string;
  alertTitle?: string;
  confirmTitle?: string;
  promptTitle?: string;
  mainColor?: string;

  constructor() {
    this.theme = 'default';
    this.okBtnLabel = 'OK';
    this.cancelBtnLabel = 'Cancel';
    this.alertTitle = 'Alert';
    this.confirmTitle = 'Confirm';
    this.promptTitle = 'Prompt';
    this.mainColor = '#5E5BEC';
  }
}
