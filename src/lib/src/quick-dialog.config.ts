import { InjectionToken } from '@angular/core';
import { NgxQuickDialogTheme } from './quick-dialog-theme';

/**
 * Base configuration object. It applies to both local and global
 * settings. Local refers to config passed through the service's
 * methods; Global referes to config passed through the module's
 * .forRoot()
 */
export class NgxQuickDialogBaseConfig {
  /**
   * Dialog theme
   */
  theme?: NgxQuickDialogTheme;

  /**
   * Text of the 'OK' button
   */
  okButtonText?: string;

  /**
   * Text of the 'Cancel' button
   */
  cancelButtonText?: string;

  /**
   * Main color of the dialog
   */
  color?: string;

  constructor() {
    this.theme = 'default';
    this.color = '#3F51B5';
  }
}

/**
 * Object used to set the titles of all dialogs upfront
 */
export interface NgxQuickDialogGlobalTitles {
  titles?: {
    alert?: string,
    confirm?: string,
    prompt?: string
  };
}

/**
 * Models the props you can change only via service's methods
 */
export interface NgxQuickDialogLocalConfigComplement {
  title?: string;
  defaultText?: string;
}

/**
 * Represents the allowable interface for global config only
 */
export type NgxQuickDialogGlobalConfig =
  NgxQuickDialogBaseConfig &
  NgxQuickDialogGlobalTitles;

/**
 * Represents the allowable interface for local config only
 */
export type NgxQuickDialogLocalConfig =
  NgxQuickDialogBaseConfig &
  NgxQuickDialogLocalConfigComplement;

/**
 * Represents a union between global and local configs
 */
export type NgxQuickDialogCompleteConfig =
  NgxQuickDialogBaseConfig &
  NgxQuickDialogGlobalTitles &
  NgxQuickDialogLocalConfigComplement;

/**
 * Configuration injection token
 */
export let NGX_QUICK_DIALOG_CONFIG =
  new InjectionToken<NgxQuickDialogGlobalConfig>('ngx-quick-dialog.config');
