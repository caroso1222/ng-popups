import { NGX_QUICK_DIALOG_CONFIG } from './cool-dialogs.config';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCoolDialog } from './cool-dialog';
import { NgxCoolDialogsService } from './cool-dialogs.service';
import { NgxCoolDialogsGlobalConfig } from './cool-dialogs.config';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxCoolDialog
  ],
  exports: [
    NgxCoolDialog
  ],
  entryComponents: [
    NgxCoolDialog
  ]
})
export class NgxCoolDialogsModule {
  static forRoot(globalConfig?: NgxCoolDialogsGlobalConfig): ModuleWithProviders {
    return {
      ngModule: NgxCoolDialogsModule,
      providers: [
        NgxCoolDialogsService,
        {
          provide: NGX_QUICK_DIALOG_CONFIG,
          useValue: globalConfig
        }
      ]
    };
  }
}
