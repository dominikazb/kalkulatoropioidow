import {Component, HostListener, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import * as _ from 'underscore';
import {FormsService} from '../shared/services/forms.service';
import {Results} from '../shared/model/results';
import {Router} from '@angular/router';
import {ResultsService} from '../shared/services/results.service';
import {Opioid} from '../shared/model/opioid';
import {OpioidService} from '../shared/services/opioid.service';
import {OpioidResults} from '../shared/model/opioid.results';

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

  constructor(private formsService: FormsService,
              private opioidService: OpioidService,
              private router: Router,
              private results: ResultsService) { }

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
    const formResults: Results = this.collectResults();
    console.log(this.opioidConversionForm);
    this.results.setResults(formResults);
    this.router.navigate(['/results']).then(() => {});
 }

  private collectResults(): Results {
    const opioidToConvertToIndex: number = parseInt(this.getControlValue('opioidToCovertTo'), 10);
    const opioidToConvertTo: Opioid = this.opioidService.getOpioid(opioidToConvertToIndex);
    const doseReduction: number = parseInt(this.getControlValue('doseReduction'), 10);

    return new Results(
      this.setOpioidData('firstOpioid'),
      this.setOpioidData('secondOpioid'),
      this.setOpioidData('thirdOpioid'),
      this.setFentanylData(),
      this.setBuprenorphineData(),
      opioidToConvertTo, doseReduction);
  }

  private setOpioidData(opioidNo: string): Opioid {
    const index: number = parseFloat(this.getControlValue(opioidNo + '.index'));
    const numberOfDoses: number = parseFloat(this.getControlValue(opioidNo + '.numberOfDoses'));
    const dose: number = parseFloat(this.getControlValue(opioidNo + '.dose'));
    const unit: string = this.getControlValue(opioidNo + '.unit');

    const opioid: Opioid = this.opioidService.getOpioid(index);
    const results: OpioidResults = new OpioidResults(numberOfDoses ? numberOfDoses : 0,
      dose ? dose : 0, unit);
    opioid.setResults(results);
    return opioid;
  }

  private setFentanylData(): Opioid {
    const fentanylDose: number = parseFloat(this.getControlValue('fentanylDose'));
    const fentanyl: Opioid = this.opioidService.getFentanyl();
    const results: OpioidResults = new OpioidResults(0, fentanylDose, '');
    fentanyl.setResults(results);
    return fentanyl;
  }

  private setBuprenorphineData(): Opioid {
    const buprenorphineDose: number = parseFloat(this.getControlValue('buprenorphineDose'));
    const buprenorphine: Opioid = this.opioidService.getBuprenorphine();
    const results: OpioidResults = new OpioidResults(0, buprenorphineDose, '');
    buprenorphine.setResults(results);
    return buprenorphine;
  }

  private getControlValue(controlName: any): any {
    return this.opioidConversionForm.controls[controlName].value;
  }
}
