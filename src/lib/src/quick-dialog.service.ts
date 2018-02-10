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
   * Reference to Portal.
   * This is the portal we'll use to attach our NgxQuickDialog component.
   */
  private quickDialogPortal: ComponentPortal<NgxQuickDialog>;

  /**
   * Reference to Portal Host.
   * We use DOMPortalHost as we'll be using document.body as our anchor.
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

  alert(message: string, config?: NgxQuickDialogLocalConfig): NgxQuickDialogResult {
    return this.createQuickDialogComponent(NgxQuickDialogType.Alert, message, config);
  }

  confirm(message: string, config?: NgxQuickDialogLocalConfig): NgxQuickDialogResult {
    return this.createQuickDialogComponent(NgxQuickDialogType.Confirm, message, config);
  }

  prompt(prompt: string, config?: NgxQuickDialogLocalConfig): NgxQuickDialogResult {
    return this.createQuickDialogComponent(NgxQuickDialogType.Prompt, prompt, config);
  }

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
