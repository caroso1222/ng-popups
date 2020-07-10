import { NG_POPUPS_CONFIG } from './ng-popups.config';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPopup } from './ng-popup';
import { NgPopupsService } from './ng-popups.service';
import { NgPopupsGlobalConfig } from './ng-popups.config';

@NgModule({
  imports: [CommonModule],
  declarations: [NgPopup],
  exports: [NgPopup],
  entryComponents: [NgPopup],
})
export class NgPopupsModule {
  static forRoot(globalConfig?: NgPopupsGlobalConfig): ModuleWithProviders {
    return {
      ngModule: NgPopupsModule,
      providers: [
        NgPopupsService,
        {
          provide: NG_POPUPS_CONFIG,
          useValue: globalConfig,
        },
      ],
    };
  }
}
