import { NGX_QUICK_DIALOG_CONFIG } from './quick-dialog.config';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQuickDialog } from './quick-dialog';
import { NgxQuickDialogService } from './quick-dialog.service';
import { NgxQuickDialogOptions } from './quick-dialog-options';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxQuickDialog
  ],
  exports: [
    NgxQuickDialog
  ],
  entryComponents: [
    NgxQuickDialog
  ]
})
export class NgxQuickDialogModule {
  static forRoot(globalOptions?: NgxQuickDialogOptions): ModuleWithProviders {
    return {
      ngModule: NgxQuickDialogModule,
      providers: [
        NgxQuickDialogService,
        {
          provide: NGX_QUICK_DIALOG_CONFIG,
          useValue: globalOptions
        }
      ]
    };
  }
}
