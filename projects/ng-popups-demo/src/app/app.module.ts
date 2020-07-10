import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DynamicTextComponent } from './dynamic-text/dynamic-text.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgPopupsModule } from 'dist/ng-popups';

@NgModule({
  declarations: [AppComponent, DynamicTextComponent],
  imports: [BrowserAnimationsModule, BrowserModule, NgPopupsModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
