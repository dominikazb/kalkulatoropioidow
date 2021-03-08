import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
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

  constructor(private formsService: FormsService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.opioidConversionForm = new FormGroup({});

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

    const fentanylForm = this.formsService.fillFormFentanyl();
    _.forEach(fentanylForm.controls, (control: AbstractControl, key: string) => {
      this.opioidConversionForm.registerControl(key, control);
    });

    const buprenorphineForm = this.formsService.fillFormBuprenorphine();
    _.forEach(buprenorphineForm.controls, (control: AbstractControl, key: string) => {
      this.opioidConversionForm.registerControl(key, control);
    });

    const conversionToForm = this.formsService.fillFormConversionTo();
    _.forEach(conversionToForm.controls, (control: AbstractControl, key: string) => {
      this.opioidConversionForm.registerControl(key, control);
    });

  }

  private getValue(controlName: string): AbstractControl {
    return this.opioidConversionForm.get([controlName])?.value;
  }

  public onSubmit(): void {
    this.printResultsToConsole();
  }














  private printResultsToConsole(): void {
    console.log('form has been submitted');
    console.log(this.opioidConversionForm);

    console.log('firstOpioid: '
      + this.getValue('firstOpioid.name') + ' | '
      + this.getValue('firstOpioid.numberOfDoses') + ' | '
      + this.getValue('firstOpioid.dose') + ' | '
      + this.getValue('firstOpioid.unit'));

    console.log('secondOpioid: '
      + this.getValue('secondOpioid.name') + ' | '
      + this.getValue('secondOpioid.numberOfDoses') + ' | '
      + this.getValue('secondOpioid.dose') + ' | '
      + this.getValue('secondOpioid.unit'));

    console.log('thirdOpioid: '
      + this.getValue('thirdOpioid.name') + ' | '
      + this.getValue('thirdOpioid.numberOfDoses') + ' | '
      + this.getValue('thirdOpioid.dose') + ' | '
      + this.getValue('thirdOpioid.unit'));

    console.log('fentanyl: ' + this.getValue('fentanylDose'));
    console.log('buprenorphine: ' + this.getValue('buprenorphineDose'));

    console.log('conversionTo: '
      + this.getValue('opioidToCovertTo') + ' | '
      + this.getValue('doseReduction'));
  }
}
