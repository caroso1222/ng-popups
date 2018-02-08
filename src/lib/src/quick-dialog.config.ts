import { InjectionToken } from '@angular/core';

import { NgxQuickDialogTheme } from './quick-dialog-theme';

export class NgxQuickDialogBaseConfig {
  theme?: NgxQuickDialogTheme;
  okBtnLabel?: string;
  cancelBtnLabel?: string;
  mainColor?: string;

  constructor() {
    this.theme = 'default';
    this.okBtnLabel = 'OK';
    this.cancelBtnLabel = 'Cancel';
    this.mainColor = '#5E5BEC';
  }
}

export interface NgxQuickDialogGlobalTitles {
  titles?: {
    alert?: string,
    confirm?: string,
    prompt?: string
  };
}

export interface NgxQuickDialogLocalConfigComplement {
  title?: string;
  defaultText?: string;
}

export type NgxQuickDialogGlobalConfig =
  NgxQuickDialogBaseConfig &
  NgxQuickDialogGlobalTitles;

export type NgxQuickDialogLocalConfig =
  NgxQuickDialogBaseConfig &
  NgxQuickDialogLocalConfigComplement;

export type NgxQuickDialogCompleteConfig =
  NgxQuickDialogBaseConfig &
  NgxQuickDialogGlobalTitles &
  NgxQuickDialogLocalConfigComplement;

export let NGX_QUICK_DIALOG_CONFIG =
  new InjectionToken<NgxQuickDialogGlobalConfig>('ngx-quick-dialog.config');
