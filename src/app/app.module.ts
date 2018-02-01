import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NgxQuickDialogModule } from '../lib';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxQuickDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
