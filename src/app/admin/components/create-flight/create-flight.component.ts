import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'underscore';
import * as moment from 'moment';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css']
})
export class CreateFlightComponent implements OnInit {

  private createFlightForm;
  @ViewChild('departureTimePicker') departureTimePicker: any;
  @ViewChild('arrivalTimePicker') arrivalTimePicker: any;
  private typeList = [];
  username;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.createFormGroup();
    this.loadData();
    this.onFormChange()
    this.initUser();

  }

  loadData() {
    this.typeList = [
      { value: 'OPR', label: 'Operate' },
      { value: 'PNC', label: 'PNC' },
      { value: 'LHS', label: 'Home Standby' },
      { value: 'LCS', label: 'Company Standby' }
    ]
  }

  initUser() {

    let currentUser = JSON.parse(localStorage['currentUser']);
    console.log(currentUser);
    if (currentUser && currentUser['username'] != '') {
      this.username = currentUser['username'];
    }

  }

  createFormGroup() {
    this.createFlightForm = this.fb.group({
      flightNo: ['', [Validators.required]],
      origin: ['', [Validators.required]],
      departureTime: [moment().hour(0).minute(0).second(0), [Validators.required]],
      destination: ['', [Validators.required]],
      arrivalTime: [moment().hour(0).minute(0).second(0), [Validators.required]],
      type: ['', [Validators.required]],
      remark: ''
    });
  }

  private onFormChange() {
    this.createFlightForm.valueChanges.subscribe(change => {
      console.log(change);
      console.log(this.createFlightForm.valid);
    });
  }

  createFlightSubmit() {
    console.log(this.createFlightForm.value);
    console.log("SUBMIT CREATE FLIGHT FORM");
    // stop here if form is invalid
    if (this.createFlightForm.invalid) {
      return;
    }

    let createFlightDetailParam = {
      flightNo: this.createFlightForm.controls['flightNo'].value || '',
      origin: this.createFlightForm.controls['origin'].value || '',
      departureTime: this.createFlightForm.controls['departureTime'].value.format('DD/MM/YYYY HH:mm') || '',
      destination: this.createFlightForm.controls['destination'].value || '',
      arrivalTime: this.createFlightForm.controls['arrivalTime'].value.format('DD/MM/YYYY HH:mm') || '',
      type: this.createFlightForm.controls['type'].value || '',
      remark: this.createFlightForm.controls['remark'].value || ''
    }

    console.log(createFlightDetailParam);

    this.adminService.createFlightDetail(createFlightDetailParam);
  }

  setDepartureTime(data) {
    this.createFlightForm.controls['departureTime'].patchValue(data['start']);
    this.arrivalTimePicker.options.minDate = this.createFlightForm.controls['departureTime'].value;
  }

  setArrivalTime(data) {
    this.createFlightForm.controls['arrivalTime'].patchValue(data['start']);
  }

}
