import { Observable } from 'rxjs';

/**
 * Available dialog types
 */
export enum NgDialogType {
  Alert,
  Confirm,
  Prompt,
}

/**
 * Payload return by the result callback of the prompt dialog
 */
export interface NgDialogPromptResult {
  result: boolean;
  value: string;
}

/**
 * Generic dialog result type
 */
export type NgDialogResult = Observable<boolean | NgDialogPromptResult>;
