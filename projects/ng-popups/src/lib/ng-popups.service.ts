import {
  NgPopupsType,
  NgPopupsResult,
  NgPopupsPromptResult,
} from './ng-popups-types';
import { NgPopup } from './ng-popup';
import {
  Injectable,
  ApplicationRef,
  ComponentFactoryResolver,
  Injector,
} from '@angular/core';
import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import { NgPopupsLocalConfig } from './ng-popups.config';
import { Observable } from 'rxjs';

@Injectable()
export class NgPopupsService {
  /**
   * Reference to the main Portal.
   */
  private ngPopupPortal: ComponentPortal<NgPopup>;

  /**
   * Reference to the main Portal Host.
   */
  private bodyPortalHost: DomPortalOutlet;

  constructor(
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {
    // Create a Portal based on the NgPopup component
    this.ngPopupPortal = new ComponentPortal(NgPopup);

    // Create a PortalHost anchored in document.body
    this.bodyPortalHost = new DomPortalOutlet(
      document.body,
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );
  }

  /**
   * Creates an alert popup
   * @param message - text to render inside the popup
   * @param config - optional configuration object
   */
  alert(message: string, config?: NgPopupsLocalConfig): NgPopupsResult {
    return this.createNgPopupComponent(NgPopupsType.Alert, message, config);
  }

  /**
   * Creates a confirm popup
   * @param message - text to render inside the popup
   * @param config - optional configuration object
   */
  confirm(message: string, config?: NgPopupsLocalConfig): NgPopupsResult {
    return this.createNgPopupComponent(NgPopupsType.Confirm, message, config);
  }

  /**
   * Creates a prompt popup
   * @param message - text to render inside the popup
   * @param config - optional configuration object
   */
  prompt(prompt: string, config?: NgPopupsLocalConfig): NgPopupsResult {
    return this.createNgPopupComponent(NgPopupsType.Prompt, prompt, config);
  }

  /**
   * Creates a popup
   * @param type - type of the popup: alert, confirm or prompt
   * @param message - main text to render inside the popup
   * @param config - optional configuration object
   */
  private createNgPopupComponent(
    type: NgPopupsType,
    message: string,
    config?: NgPopupsLocalConfig
  ): NgPopupsResult {
    const componentRef = this.bodyPortalHost.attachComponentPortal(
      this.ngPopupPortal
    );
    const ngPopup = componentRef.instance as NgPopup;
    ngPopup.message = message;
    ngPopup.localConfig = config;
    ngPopup.type = type;
    // subscribe to the popup closing event so that the portal can actually be detached
    const subscription = ngPopup.$close.subscribe(
      (res: boolean | NgPopupsPromptResult) => {
        this.bodyPortalHost.detach();
        subscription.unsubscribe();
      }
    );
    return new Observable((observer) => {
      // subscribe to the popup closing event to forward the event to the caller
      const _subscription = ngPopup.$close.subscribe(
        (res: boolean | NgPopupsPromptResult) => {
          _subscription.unsubscribe();
          observer.next(res);
        }
      );
    });
  }
}
