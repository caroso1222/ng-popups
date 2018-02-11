import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { NgxQuickDialogModule } from '../lib';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    NgxQuickDialogModule.forRoot({
      titles: {
        confirm: 'You better double check dat'
      },
      cancelButtonText: 'Exit',
      color: 'red'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
