import { Observable } from 'rxjs/Observable';

export enum NgxQuickDialogType {
  Alert, Confirm, Prompt
}

export interface NgxQuickDialogPromptResult {
  result: boolean;
  value: string;
}

export type NgxQuickDialogResult = Observable<boolean | NgxQuickDialogPromptResult>;
