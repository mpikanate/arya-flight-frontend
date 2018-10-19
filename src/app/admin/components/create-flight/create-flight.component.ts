import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-flight',
  templateUrl: './create-flight.component.html',
  styleUrls: ['./create-flight.component.css']
})
export class CreateFlightComponent implements OnInit {

  public createFlightForm;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createFormGroup();
  }

  createFormGroup() {
    this.createFlightForm = this.fb.group({
      flightNo: '',
      origin: '',
      departureTime: '',
      destination: '',
      arrivalTime: '',
      type: '',
      remark: ''
    });
  }

  createFlightSubmit() {
    console.log("SUBMIT CREATE FLIGHT FORM");
  }

}
