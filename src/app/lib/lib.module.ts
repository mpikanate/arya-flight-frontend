import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Daterangepicker } from 'ng2-daterangepicker';
import { DaterangepickerComponent } from './daterangepicker/daterangepicker.component';

@NgModule({
  declarations: [
    DaterangepickerComponent
  ],
  imports: [
    Daterangepicker,
    CommonModule
  ],
  providers: [
  ], 
  exports: [
    DaterangepickerComponent
  ]
})
export class LibModule { }
