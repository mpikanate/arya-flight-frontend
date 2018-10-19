import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from '../_guards';
import { AlertService, AuthenticationService, UserService } from '../_services';
import { JwtInterceptor, ErrorInterceptor } from '../_helpers';
import { AlertComponent } from '../_directives';
import { RegisterComponent } from './components/register/register.component';
import { SidebarModule } from 'ng-sidebar';
import { CreateFlightComponent } from './components/create-flight/create-flight.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DaterangepickerComponent } from '../lib/daterangepicker/daterangepicker.component';
import { LibModule } from '../lib/lib.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule.forRoot(),
    LibModule
  ],
  declarations: [
    LoginComponent,
    HomeComponent,
    AlertComponent,
    RegisterComponent,
    CreateFlightComponent,
    DashboardComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DaterangepickerComponent

    // provider used to create fake backend
    // fakeBackendProvider
  ]
})
export class AdminModule { }
