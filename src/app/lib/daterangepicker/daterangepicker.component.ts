import { Component, OnInit, Input, Output, ViewChild, ElementRef, OnChanges, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DaterangepickerConfig, DaterangePickerComponent } from 'ng2-daterangepicker';
import * as moment from 'moment';

@Component({
  selector: 'daterangepicker',
  templateUrl: './daterangepicker.component.html',
  styleUrls: ['./daterangepicker.component.css']
})
export class DaterangepickerComponent implements OnInit {
  @Input() format: string;
  @Input() startDate: any;
  @Input() endDate: any;
  @Input() minDate: any;
  @Input() maxDate: any;
  @Input() dateLimit: any;
  @Input() showDropdowns: boolean;
  @Input() timePicker: boolean;
  @Input() timePickerIncrement: any;
  @Input() autoApply: boolean;
  @Input() linkedCalendars: boolean;
  @Input() singleDatePicker: boolean;
  @Input() defaultDateValue: boolean;
  @Input() id: string;
  @Input() disabled: boolean = false;
  @Output() dateValue: EventEmitter<any> = new EventEmitter();
  @ViewChild(DaterangePickerComponent)
  public picker: DaterangePickerComponent;

  @ViewChild('daterangepickerEl') daterangepickerEl;


  public daterange: any = {};
  public tmp: any;
  dateModel = '';
  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    timePicker24Hour: true,
    timePickerIncrement: 1,
    autoApply: this.autoApply || true,
    defaultDateValue: true,
  };

  public getPicker() {
    return this.picker.datePicker;
  }

  public selectedDate(value: any, datepicker?: any) {
    // this is the date the iser selected
    // console.log(value);

    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;
    this.dateValue.emit(value);

    // or manupulat your own internal property
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }

  constructor() { }

  ngOnInit() {
    if (this.format) {
      this.options.locale.format = this.format;
    }
    if (this.startDate) {
      this.options.startDate = moment(this.startDate, this.format);
    } else {
      this.options.startDate = moment();
    }

    if (this.endDate) {
      this.options.endDate = moment(this.endDate, this.format);
    } else {
      if (this.startDate) {
        this.options.endDate = moment(this.startDate, this.format);
      } else {
        this.options.endDate = moment();
      }
    }
    this.dateValue.emit({ start: this.options.startDate, end: this.options.endDate });

    if (this.minDate) {
      this.options.minDate = this.minDate;
    }

    if (this.maxDate) {
      this.options.maxDate = this.maxDate;
    }

    if (this.dateLimit) {
      this.options.dateLimit = {};
      this.options.dateLimit.days = parseInt(this.dateLimit);
    }

    if (this.showDropdowns) {
      this.options.showDropdowns = this.showDropdowns;
    }
    if (this.timePicker) {
      this.options.timePicker = this.timePicker;
    }
    if (this.timePickerIncrement) {
      this.options.timePickerIncrement = this.timePickerIncrement;
    }
    if (this.autoApply) {
      this.options.autoApply = this.autoApply;
      console.log(this.options.autoApply)
    }
    if (this.linkedCalendars) {
      this.options.linkedCalendars = this.linkedCalendars;
    }
    if (this.singleDatePicker) {
      this.options.singleDatePicker = this.singleDatePicker;
    }

    if (this.defaultDateValue === false) {
      setTimeout(() => {
        this.daterangepickerEl.nativeElement.value = '';
        this.dateValue.emit('');
      });
    }

  }

  calendarCanceled(event) {
    // console.log(event)
    if (this.defaultDateValue === false) {
      event.picker.element[0].value = '';
      this.dateValue.emit('');
    }
  }

}
