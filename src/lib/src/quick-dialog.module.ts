import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQuickDialogComponent } from './quick-dialog.component';
import { NgxQuickDialogService } from './quick-dialog.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxQuickDialogComponent
  ],
  exports: [
    NgxQuickDialogComponent
  ],
  entryComponents: [
    NgxQuickDialogComponent
  ]
})
export class NgxQuickDialogModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxQuickDialogModule,
      providers: [NgxQuickDialogService]
    };
  }
}
