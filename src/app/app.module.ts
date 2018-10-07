import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.route'
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AlertService, AuthenticationService } from './_services';
import { AuthGuard } from './_guards';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule ,
     BrowserAnimationsModule,
     FormsModule,
     ReactiveFormsModule,
     HttpClientModule,
     AppRoutingModule,
   ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
