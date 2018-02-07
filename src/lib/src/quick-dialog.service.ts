import { NgxQuickDialogType } from './quick-dialog-type';
import { NgxQuickDialogComponent } from './quick-dialog.component';
import {
  Injectable,
  ApplicationRef,
  ComponentFactoryResolver,
  Injector
} from '@angular/core';
import { ComponentPortal, DomPortalHost } from '@angular/cdk/portal';

@Injectable()
export class NgxQuickDialogService {

  /**
   * Reference to Portal.
   * This is the portal we'll use to attach our NgxQuickDialog component.
   */
  private quickDialogPortal: ComponentPortal<NgxQuickDialogComponent>;

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
    this.quickDialogPortal = new ComponentPortal(NgxQuickDialogComponent);

    // Create a PortalHost anchored in document.body
    this.bodyPortalHost = new DomPortalHost(
      document.body,
      this.componentFactoryResolver,
      this.appRef,
      this.injector);
  }

  alert(message: string) {
    this.createQuickDialogComponent(NgxQuickDialogType.Alert, message);
  }

  confirm(message: string) {
    this.createQuickDialogComponent(NgxQuickDialogType.Confirm, message);
  }

  prompt(prompt: string, defaultText?: string) {
    this.createQuickDialogComponent(NgxQuickDialogType.Prompt, prompt, defaultText);
  }

  private createQuickDialogComponent(type: NgxQuickDialogType, message: string, defaultText?: string): NgxQuickDialogComponent {
    const componentRef = this.bodyPortalHost.attachComponentPortal(this.quickDialogPortal);
    const quickDialog = componentRef.instance as NgxQuickDialogComponent;
    quickDialog.type = type;
    quickDialog.message = message;
    quickDialog.defaultText = defaultText;
    quickDialog.theme = 'material';
    const subscription = quickDialog.$close.subscribe(() => {
      this.bodyPortalHost.detach();
      subscription.unsubscribe();
    });
    return quickDialog;
  }
}
