import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import * as _ from 'underscore';
import {FormsService} from '../shared/services/forms.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  public opioidConversionFormFields: any = {
    firstOpioid: 'firstOpioid',
    secondOpioid: 'secondOpioid',
    thirdOpioid: 'thirdOpioid',
    fentanyl: 'fentanyl',
    buprenorphine: 'buprenorphine',
    conversionTo: 'conversionTo',
    doseReduction: 'doseReduction'
  };

  // @ts-ignore
  public opioidConversionForm: FormGroup;
  public title = 'Kalkulator konwersji leków opioidowych';
  public conversionFromText = 'Konwersja z:';
  public optionallyText = 'Opcjonalnie:';

  constructor(private formsService: FormsService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.opioidConversionForm = new FormGroup({
      [this.opioidConversionFormFields.fentanyl]: new FormControl(),
      [this.opioidConversionFormFields.buprenorphine]: new FormControl(),
      [this.opioidConversionFormFields.conversionTo]: new FormControl(),
      [this.opioidConversionFormFields.doseReduction]: new FormControl(),
    });

    const firstOpioidForm = this.formsService.fillFormOpioid(this.opioidConversionFormFields.firstOpioid);
    _.forEach(firstOpioidForm.controls, (control: AbstractControl, key: string) => {
      this.opioidConversionForm.registerControl(key, control);
    });

    const secondOpioidForm = this.formsService.fillFormOpioid(this.opioidConversionFormFields.secondOpioid);
    _.forEach(secondOpioidForm.controls, (control: AbstractControl, key: string) => {
      this.opioidConversionForm.registerControl(key, control);
    });

    const thirdOpioidForm = this.formsService.fillFormOpioid(this.opioidConversionFormFields.thirdOpioid);
    _.forEach(thirdOpioidForm.controls, (control: AbstractControl, key: string) => {
      this.opioidConversionForm.registerControl(key, control);
    });

  }



  public onSubmit(): void {
    console.log('form has been submitted');
    console.log(this.opioidConversionForm.get(['firstOpioid.name'])?.value);
    console.log(this.opioidConversionForm.get(['firstOpioid.numberOfDoses'])?.value);
    console.log(this.opioidConversionForm.get(['firstOpioid.dose'])?.value);
    console.log(this.opioidConversionForm.get(['firstOpioid.unit'])?.value);
  }

}
