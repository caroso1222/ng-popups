import { InjectionToken } from '@angular/core';
import { NgxCoolDialogTheme } from './cool-dialogs-theme';

/**
 * Base configuration object. It applies to both local and global
 * settings. Local refers to config passed through the service's
 * methods; Global referes to config passed through the module's
 * .forRoot()
 */
export class NgxCoolDialogsBaseConfig {
  /**
   * Dialog theme
   */
  theme?: NgxCoolDialogTheme;

  /**
   * Text of the 'OK' button
   */
  okButtonText?: string;

  /**
   * Text of the 'Cancel' button
   */
  cancelButtonText?: string;

  /**
   * Color for buttons (fill, labels and borders)
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
export interface NgxCoolDialogsGlobalTitles {
  titles?: {
    alert?: string,
    confirm?: string,
    prompt?: string
  };
}

/**
 * Models the props you can change only via service's methods
 */
export interface NgxCoolDialogsLocalConfigComplement {
  title?: string;
  defaultText?: string;
}

/**
 * Represents the allowable interface for global config only
 */
export type NgxCoolDialogsGlobalConfig =
  NgxCoolDialogsBaseConfig &
  NgxCoolDialogsGlobalTitles;

/**
 * Represents the allowable interface for local config only
 */
export type NgxCoolDialogsLocalConfig =
  NgxCoolDialogsBaseConfig &
  NgxCoolDialogsLocalConfigComplement;

/**
 * Represents a union between global and local configs
 */
export type NgxCoolDialogsCompleteConfig =
  NgxCoolDialogsBaseConfig &
  NgxCoolDialogsGlobalTitles &
  NgxCoolDialogsLocalConfigComplement;

/**
 * Configuration injection token
 */
export let NGX_QUICK_DIALOG_CONFIG =
  new InjectionToken<NgxCoolDialogsGlobalConfig>('ngx-cool-dialogs.config');
