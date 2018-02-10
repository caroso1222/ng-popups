import {
  NgxQuickDialogType,
  NgxQuickDialogResult,
  NgxQuickDialogPromptResult
} from './quick-dialog-types';
import { NgxQuickDialog } from './quick-dialog';
import {
  Injectable,
  ApplicationRef,
  ComponentFactoryResolver,
  Injector
} from '@angular/core';
import { ComponentPortal, DomPortalHost } from '@angular/cdk/portal';
import { NgxQuickDialogLocalConfig } from './quick-dialog.config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NgxQuickDialogService {

  /**
   * Reference to the main Portal.
   */
  private quickDialogPortal: ComponentPortal<NgxQuickDialog>;

  /**
   * Reference to the main Portal Host.
   */
  private bodyPortalHost: DomPortalHost;

  constructor(
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
    // Create a Portal based on the NgxQuickDialog component
    this.quickDialogPortal = new ComponentPortal(NgxQuickDialog);

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
  alert(message: string, config?: NgxQuickDialogLocalConfig): NgxQuickDialogResult {
    return this.createQuickDialogComponent(NgxQuickDialogType.Alert, message, config);
  }

  /**
   * Creates a confirm dialog
   * @param message - text to render inside the dialog
   * @param config - optional configuration object
   */
  confirm(message: string, config?: NgxQuickDialogLocalConfig): NgxQuickDialogResult {
    return this.createQuickDialogComponent(NgxQuickDialogType.Confirm, message, config);
  }

  /**
   * Creates a prompt dialog
   * @param message - text to render inside the dialog
   * @param config - optional configuration object
   */
  prompt(prompt: string, config?: NgxQuickDialogLocalConfig): NgxQuickDialogResult {
    return this.createQuickDialogComponent(NgxQuickDialogType.Prompt, prompt, config);
  }

  /**
   * Creates a dialog
   * @param type - type of the dialog: alert, confirm or prompt
   * @param message - main text to render inside the dialog
   * @param config - optional configuration object
   */
  private createQuickDialogComponent(
    type: NgxQuickDialogType,
    message: string,
    config?: NgxQuickDialogLocalConfig): NgxQuickDialogResult {
      const componentRef = this.bodyPortalHost.attachComponentPortal(this.quickDialogPortal);
      const quickDialog = componentRef.instance as NgxQuickDialog;
      quickDialog.message = message;
      quickDialog.localConfig = config;
      quickDialog.type = type;
      return new Observable(observer => {
        const subscription = quickDialog.$close
          .subscribe((res: boolean | NgxQuickDialogPromptResult) => {
            this.bodyPortalHost.detach();
            subscription.unsubscribe();
            observer.next(res);
          });
      });
  }
}
