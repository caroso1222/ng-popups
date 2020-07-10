import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NgDialogsModule } from '../lib';
import { DynamicTextComponent } from './dynamic-text/dynamic-text.component';

@NgModule({
  declarations: [AppComponent, DynamicTextComponent],
  imports: [BrowserAnimationsModule, BrowserModule, NgDialogsModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
