import { Observable } from 'rxjs';

/**
 * Available dialog types
 */
export enum NgxCoolDialogType {
  Alert, Confirm, Prompt
}

/**
 * Payload return by the result callback of the prompt dialog
 */
export interface NgxCoolDialogPromptResult {
  result: boolean;
  value: string;
}

/**
 * Generic dialog result type
 */
export type NgxCoolDialogResult = Observable<boolean | NgxCoolDialogPromptResult>;
