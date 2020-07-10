import { NGDIALOGs_CONFIG } from './ngdialogs.config';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDialog } from './ngdialog';
import { NgDialogsService } from './ngdialogs.service';
import { NgDialogsGlobalConfig } from './ngdialogs.config';

@NgModule({
  imports: [CommonModule],
  declarations: [NgDialog],
  exports: [NgDialog],
  entryComponents: [NgDialog],
})
export class NgDialogsModule {
  static forRoot(globalConfig?: NgDialogsGlobalConfig): ModuleWithProviders {
    return {
      ngModule: NgDialogsModule,
      providers: [
        NgDialogsService,
        {
          provide: NGDIALOGs_CONFIG,
          useValue: globalConfig,
        },
      ],
    };
  }
}
