import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickDialogComponent } from './quick-dialog.component';
import { NgxQuickDialogService } from './quick-dialog.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    QuickDialogComponent
  ],
  exports: [
    QuickDialogComponent
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
