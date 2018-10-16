import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { NgxCoolDialogsModule } from '../lib';
import { DynamicTextComponent } from './dynamic-text/dynamic-text.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

console.log({ enabled: environment.production });

@NgModule({
  declarations: [
    AppComponent,
    DynamicTextComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    NgxCoolDialogsModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
