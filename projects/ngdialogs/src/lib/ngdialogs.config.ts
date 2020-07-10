import { InjectionToken } from '@angular/core';
import { NgDialogsTheme } from './ngdialogs-theme';

/**
 * Base configuration object. It applies to both local and global
 * settings. Local refers to config passed through the service's
 * methods; Global referes to config passed through the module's
 * .forRoot()
 */
export class NgDialogsBaseConfig {
  /**
   * Dialog theme
   */
  theme?: NgDialogsTheme;

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
export interface NgDialogsGlobalTitles {
  titles?: {
    alert?: string;
    confirm?: string;
    prompt?: string;
  };
}

/**
 * Models the props you can change only via service's methods
 */
export interface NgDialogsLocalConfigComplement {
  title?: string;
  defaultText?: string;
}

/**
 * Represents the allowable interface for global config only
 */
export type NgDialogsGlobalConfig = NgDialogsBaseConfig & NgDialogsGlobalTitles;

/**
 * Represents the allowable interface for local config only
 */
export type NgDialogsLocalConfig = NgDialogsBaseConfig &
  NgDialogsLocalConfigComplement;

/**
 * Represents a union between global and local configs
 */
export type NgDialogsCompleteConfig = NgDialogsBaseConfig &
  NgDialogsGlobalTitles &
  NgDialogsLocalConfigComplement;

/**
 * Configuration injection token
 */
export let NGDIALOGs_CONFIG = new InjectionToken<NgDialogsGlobalConfig>(
  'ngdialogs.config'
);
