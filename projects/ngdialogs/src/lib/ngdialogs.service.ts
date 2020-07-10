import {
  NgDialogsType,
  NgDialogResult,
  NgDialogsPromptResult,
} from './ngdialogs-types';
import { NgDialog } from './ngdialog';
import {
  Injectable,
  ApplicationRef,
  ComponentFactoryResolver,
  Injector,
} from '@angular/core';
import { ComponentPortal, DomPortalHost } from '@angular/cdk/portal';
import { NgDialogsLocalConfig } from './ngdialogs.config';
import { Observable } from 'rxjs';

@Injectable()
export class NgDialogsService {
  /**
   * Reference to the main Portal.
   */
  private ngDialogPortal: ComponentPortal<NgDialog>;

  /**
   * Reference to the main Portal Host.
   */
  private bodyPortalHost: DomPortalHost;

  constructor(
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
    // Create a Portal based on the NgDialog component
    this.ngDialogPortal = new ComponentPortal(NgDialog);

    // Create a PortalHost anchored in document.body
    this.bodyPortalHost = new DomPortalHost(
      document.body,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
  }

  /**
   * Creates an alert dialog
   * @param message - text to render inside the dialog
   * @param config - optional configuration object
   */
  alert(message: string, config?: NgDialogsLocalConfig): NgDialogResult {
    return this.createNgDialogComponent(NgDialogsType.Alert, message, config);
  }

  /**
   * Creates a confirm dialog
   * @param message - text to render inside the dialog
   * @param config - optional configuration object
   */
  confirm(message: string, config?: NgDialogsLocalConfig): NgDialogResult {
    return this.createNgDialogComponent(NgDialogsType.Confirm, message, config);
  }

  /**
   * Creates a prompt dialog
   * @param message - text to render inside the dialog
   * @param config - optional configuration object
   */
  prompt(prompt: string, config?: NgDialogsLocalConfig): NgDialogResult {
    return this.createNgDialogComponent(NgDialogsType.Prompt, prompt, config);
  }

  /**
   * Creates a dialog
   * @param type - type of the dialog: alert, confirm or prompt
   * @param message - main text to render inside the dialog
   * @param config - optional configuration object
   */
  private createNgDialogComponent(
    type: NgDialogsType,
    message: string,
    config?: NgDialogsLocalConfig
  ): NgDialogResult {
    const componentRef = this.bodyPortalHost.attachComponentPortal(
      this.ngDialogPortal
    );
    const ngDialog = componentRef.instance as NgDialog;
    ngDialog.message = message;
    ngDialog.localConfig = config;
    ngDialog.type = type;
    // subscribe to the dialog closing event so that the portal can actually be detached
    const subscription = ngDialog.$close.subscribe(
      (res: boolean | NgDialogsPromptResult) => {
        this.bodyPortalHost.detach();
        subscription.unsubscribe();
      }
    );
    return new Observable((observer) => {
      // subscribe to the dialog closing event to forward the event to the caller
      const _subscription = ngDialog.$close.subscribe(
        (res: boolean | NgDialogsPromptResult) => {
          _subscription.unsubscribe();
          observer.next(res);
        }
      );
    });
  }
}
