import {Component, HostListener, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import * as _ from 'underscore';
import {FormsService} from '../shared/services/forms.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html'
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
  public addAnotherText = 'dodaj kolejny...';
  public fentanylText = 'fentanyl (transdermalnie)';
  public buprenorphineText = 'buprenorfina (transdermalnie)';
  public conversionFromText = 'Konwersja z:';
  public optionallyText = 'Opcjonalnie:';
  public btnResetText = 'Wyczyść';
  public btnCalculateText = 'Przelicz';
  private screenWidth: number;

  public firstIsCollapsed: boolean;
  public secondIsCollapsed: boolean;
  public fentanylIsCollapsed: boolean;
  public buprenorphineIsCollapsed: boolean;

  constructor(private formsService: FormsService) { }

  ngOnInit(): void {
    this.getScreenSize();
    this.buildForm();
  }

  private setFormsCollapsing(): void {
    if (this.screenWidth < 767) {
      this.setFormsCollapsingValues(true, true, true, true);
    } else {
      this.setFormsCollapsingValues(false, false, false, false);
    }
  }

  private setFormsCollapsingValues(firstIsCollapsed: boolean,
                                   secondIsCollapsed: boolean,
                                   fentanylIsCollapsed: boolean,
                                   buprenorphineIsCollapsed: boolean): any {
    this.firstIsCollapsed = firstIsCollapsed;
    this.secondIsCollapsed = secondIsCollapsed;
    this.fentanylIsCollapsed = fentanylIsCollapsed;
    this.buprenorphineIsCollapsed = buprenorphineIsCollapsed;
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(): void {
    this.screenWidth = window.innerWidth;
    this.setFormsCollapsing();
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

  private getControlValue(controlName: string): AbstractControl {
    return this.opioidConversionForm.get([controlName])?.value;
  }

  public onSubmit(): void {
    this.printResultsToConsole();
  }














  private printResultsToConsole(): void {
    console.log('form has been submitted');
    console.log(this.opioidConversionForm);

    console.log('firstOpioid: '
      + this.getControlValue('firstOpioid.name') + ' | '
      + this.getControlValue('firstOpioid.numberOfDoses') + ' | '
      + this.getControlValue('firstOpioid.dose') + ' | '
      + this.getControlValue('firstOpioid.unit'));

    console.log('secondOpioid: '
      + this.getControlValue('secondOpioid.name') + ' | '
      + this.getControlValue('secondOpioid.numberOfDoses') + ' | '
      + this.getControlValue('secondOpioid.dose') + ' | '
      + this.getControlValue('secondOpioid.unit'));

    console.log('thirdOpioid: '
      + this.getControlValue('thirdOpioid.name') + ' | '
      + this.getControlValue('thirdOpioid.numberOfDoses') + ' | '
      + this.getControlValue('thirdOpioid.dose') + ' | '
      + this.getControlValue('thirdOpioid.unit'));

    console.log('fentanyl: ' + this.getControlValue('fentanylDose'));
    console.log('buprenorphine: ' + this.getControlValue('buprenorphineDose'));

    console.log('conversionTo: '
      + this.getControlValue('opioidToCovertTo') + ' | '
      + this.getControlValue('doseReduction'));
  }
}
