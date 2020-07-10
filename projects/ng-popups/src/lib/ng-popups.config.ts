import { InjectionToken } from '@angular/core';
import { NgPopupsTheme } from './ng-popups-theme';

/**
 * Base configuration object. It applies to both local and global
 * settings. Local refers to config passed through the service's
 * methods; Global referes to config passed through the module's
 * .forRoot()
 */
export class NgPopupsBaseConfig {
  /**
   * Popup theme
   */
  theme?: NgPopupsTheme;

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
 * Object used to set the titles of all popups upfront
 */
export interface NgPopupsGlobalTitles {
  titles?: {
    alert?: string;
    confirm?: string;
    prompt?: string;
  };
}

/**
 * Models the props you can change only via service's methods
 */
export interface NgPopupsLocalConfigComplement {
  title?: string;
  defaultText?: string;
}

/**
 * Represents the allowable interface for global config only
 */
export type NgPopupsGlobalConfig = NgPopupsBaseConfig & NgPopupsGlobalTitles;

/**
 * Represents the allowable interface for local config only
 */
export type NgPopupsLocalConfig = NgPopupsBaseConfig &
  NgPopupsLocalConfigComplement;

/**
 * Represents a union between global and local configs
 */
export type NgPopupsCompleteConfig = NgPopupsBaseConfig &
  NgPopupsGlobalTitles &
  NgPopupsLocalConfigComplement;

/**
 * Configuration injection token
 */
export let NG_POPUPS_CONFIG = new InjectionToken<NgPopupsGlobalConfig>(
  'ng-popups.config'
);
