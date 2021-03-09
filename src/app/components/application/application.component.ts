import {Component, HostListener, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import * as _ from 'underscore';
import {FormsService} from '../shared/services/forms.service';
import {ResultsModel} from '../shared/model/results.model';

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

  public onSubmit(): void {
    const results: ResultsModel = this.collectResults();
 }

  private collectResults(): ResultsModel {
    const firstOpioidIndex: number = parseInt(
      this.opioidConversionForm.controls['firstOpioid.index'].value, 10);
    const firstOpioidNumberOfDoses: number = parseInt(
      this.opioidConversionForm.controls['firstOpioid.numberOfDoses'].value, 10);
    const firstOpioidDose: number = parseInt(
      this.opioidConversionForm.controls['firstOpioid.dose'].value, 10);
    const firstOpioidUnit: string =
      this.opioidConversionForm.controls['firstOpioid.unit'].value;
    const secondOpioidIndex: number = parseInt(
      this.opioidConversionForm.controls['secondOpioid.index'].value, 10);
    const secondOpioidNumberOfDoses: number = parseInt(
      this.opioidConversionForm.controls['secondOpioid.numberOfDoses'].value, 10);
    const secondOpioidDose: number = parseInt(
      this.opioidConversionForm.controls['secondOpioid.dose'].value, 10);
    const secondOpioidUnit: string =
      this.opioidConversionForm.controls['secondOpioid.unit'].value;
    const thirdOpioidIndex: number = parseInt(
      this.opioidConversionForm.controls['thirdOpioid.index'].value, 10);
    const thirdOpioidNumberOfDoses: number = parseInt(
      this.opioidConversionForm.controls['thirdOpioid.numberOfDoses'].value, 10);
    const thirdOpioidDose: number = parseInt(
      this.opioidConversionForm.controls['thirdOpioid.dose'].value, 10);
    const thirdOpioidUnit: string =
      this.opioidConversionForm.controls['thirdOpioid.unit'].value;
    const fentanylDose: number = parseInt(
      this.opioidConversionForm.controls[this.formsService.formFentanylFields.fentanylDose].value, 10);
    const buprenorphineDose: number = parseInt(
      this.opioidConversionForm.controls[this.formsService.formBuprenorfineFields.buprenorphineDose].value, 10);
    const opioidToConvertTo: number = parseInt(
      this.opioidConversionForm.controls[this.formsService.formConversionToFields.opioidToCovertTo].value, 10);
    const doseReduction: number = parseInt(
      this.opioidConversionForm.controls[this.formsService.formConversionToFields.doseReduction].value, 10);

    return new ResultsModel(
      firstOpioidIndex, firstOpioidNumberOfDoses, firstOpioidDose, firstOpioidUnit,
      secondOpioidIndex, secondOpioidNumberOfDoses, secondOpioidDose, secondOpioidUnit,
      thirdOpioidIndex, thirdOpioidNumberOfDoses, thirdOpioidDose, thirdOpioidUnit,
      fentanylDose, buprenorphineDose, opioidToConvertTo, doseReduction);
  }
}
