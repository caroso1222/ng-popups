import { Observable } from 'rxjs';

/**
 * Available popup types
 */
export enum NgPopupsType {
  Alert,
  Confirm,
  Prompt,
}

/**
 * Payload return by the result callback of the prompt popup
 */
export interface NgPopupsPromptResult {
  result: boolean;
  value: string;
}

/**
 * Generic popup result type
 */
export type NgPopupsResult = Observable<boolean | NgPopupsPromptResult>;
