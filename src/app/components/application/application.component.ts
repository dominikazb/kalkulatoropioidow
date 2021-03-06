import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FormOpioidComponent} from '../sub-components/form-opioid/form-opioid.component';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  public title = 'Kalkulator konwersji leków opioidowych';
  public conversionFromText = 'Konwersja z:';
  public optionallyText = 'Opcjonalnie:';
  public opioidForm: FormGroup;

  constructor() {
    this.opioidForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {

  }

  public onSubmit(): void {
    console.log('form has been submitted');
  }

}
