import {
  NgxCoolDialogType,
  NgxCoolDialogResult,
  NgxCoolDialogPromptResult
} from './cool-dialogs-types';
import { NgxCoolDialog } from './cool-dialog';
import {
  Injectable,
  ApplicationRef,
  ComponentFactoryResolver,
  Injector
} from '@angular/core';
import { ComponentPortal, DomPortalHost } from '@angular/cdk/portal';
import { NgxCoolDialogsLocalConfig } from './cool-dialogs.config';
import { Observable } from 'rxjs';

@Injectable()
export class NgxCoolDialogsService {

  /**
   * Reference to the main Portal.
   */
  private coolDialogPortal: ComponentPortal<NgxCoolDialog>;

  /**
   * Reference to the main Portal Host.
   */
  private bodyPortalHost: DomPortalHost;

  constructor(
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
    // Create a Portal based on the NgxCoolDialog component
    this.coolDialogPortal = new ComponentPortal(NgxCoolDialog);

    // Create a PortalHost anchored in document.body
    this.bodyPortalHost = new DomPortalHost(
      document.body,
      this.componentFactoryResolver,
      this.appRef,
      this.injector);
  }

  /**
   * Creates an alert dialog
   * @param message - text to render inside the dialog
   * @param config - optional configuration object
   */
  alert(message: string, config?: NgxCoolDialogsLocalConfig): NgxCoolDialogResult {
    return this.createCoolDialogComponent(NgxCoolDialogType.Alert, message, config);
  }

  /**
   * Creates a confirm dialog
   * @param message - text to render inside the dialog
   * @param config - optional configuration object
   */
  confirm(message: string, config?: NgxCoolDialogsLocalConfig): NgxCoolDialogResult {
    return this.createCoolDialogComponent(NgxCoolDialogType.Confirm, message, config);
  }

  /**
   * Creates a prompt dialog
   * @param message - text to render inside the dialog
   * @param config - optional configuration object
   */
  prompt(prompt: string, config?: NgxCoolDialogsLocalConfig): NgxCoolDialogResult {
    return this.createCoolDialogComponent(NgxCoolDialogType.Prompt, prompt, config);
  }

  /**
   * Creates a dialog
   * @param type - type of the dialog: alert, confirm or prompt
   * @param message - main text to render inside the dialog
   * @param config - optional configuration object
   */
  private createCoolDialogComponent(
    type: NgxCoolDialogType,
    message: string,
    config?: NgxCoolDialogsLocalConfig): NgxCoolDialogResult {
      const componentRef = this.bodyPortalHost.attachComponentPortal(this.coolDialogPortal);
      const coolDialog = componentRef.instance as NgxCoolDialog;
      coolDialog.message = message;
      coolDialog.localConfig = config;
      coolDialog.type = type;
      // subscribe to the dialog closing event so that the portal can actually be detached
      const subscription = coolDialog.$close
        .subscribe((res: boolean | NgxCoolDialogPromptResult) => {
          this.bodyPortalHost.detach();
          subscription.unsubscribe();
        });
      return new Observable(observer => {
        // subscribe to the dialog closing event to forward the event to the caller
        const _subscription = coolDialog.$close
          .subscribe((res: boolean | NgxCoolDialogPromptResult) => {
            _subscription.unsubscribe();
            observer.next(res);
          });
      });
  }
}
