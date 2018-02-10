import { Observable } from 'rxjs/Observable';

/**
 * Available dialog types
 */
export enum NgxQuickDialogType {
  Alert, Confirm, Prompt
}

/**
 * Payload return by the result callback of the prompt dialog
 */
export interface NgxQuickDialogPromptResult {
  result: boolean;
  value: string;
}

/**
 * Generic dialog result type
 */
export type NgxQuickDialogResult = Observable<boolean | NgxQuickDialogPromptResult>;
