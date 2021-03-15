import {Component, HostListener, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
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

    let firstOpioidForm;
    let secondOpioidForm;
    let thirdOpioidForm;
    let fentanylForm;
    let buprenorphineForm;
    let conversionToForm;

    if (this.results.results) {
      firstOpioidForm = this.addControlsToMainForm(this.opioidConversionFormFields.firstOpioid, this.results.results.firstOpioid);
      secondOpioidForm = this.addControlsToMainForm(this.opioidConversionFormFields.secondOpioid, this.results.results.secondOpioid);
      thirdOpioidForm = this.addControlsToMainForm(this.opioidConversionFormFields.thirdOpioid, this.results.results.thirdOpioid);
      fentanylForm = this.formsService.fillFormFentanyl(this.results.results);
      buprenorphineForm = this.formsService.fillFormBuprenorphine(this.results.results);
      conversionToForm = this.formsService.fillFormConversionTo(this.results.results);
    } else {
      firstOpioidForm = this.addControlsToMainForm(this.opioidConversionFormFields.firstOpioid);
      secondOpioidForm = this.addControlsToMainForm(this.opioidConversionFormFields.secondOpioid);
      thirdOpioidForm = this.addControlsToMainForm(this.opioidConversionFormFields.thirdOpioid);
      fentanylForm = this.formsService.fillFormFentanyl();
      buprenorphineForm = this.formsService.fillFormBuprenorphine();
      conversionToForm = this.formsService.fillFormConversionTo();
    }

    this.registerControls(firstOpioidForm);
    this.registerControls(secondOpioidForm);
    this.registerControls(thirdOpioidForm);
    this.registerControls(fentanylForm);
    this.registerControls(buprenorphineForm);
    this.registerControls(conversionToForm);
  }

  private addControlsToMainForm(name: string, opioid?: Opioid): FormGroup {
    if (opioid) {
      return this.formsService.fillFormOpioid(name, opioid);
    } else {
      return this.formsService.fillFormOpioid(name);
    }
  }

  private registerControls(opioidForm: FormGroup): void {
    _.forEach(opioidForm.controls, (control: AbstractControl, key: string) => {
      this.opioidConversionForm.registerControl(key, control);
    });
  }

  public onSubmit(): void {
    const formResults: Results = this.collectResults();
    this.results.setResults(formResults);
    console.log(this.results.results);
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
    const results: OpioidResults = new OpioidResults(0, fentanylDose, 'μg/h');
    fentanyl.setResults(results);
    return fentanyl;
  }

  private setBuprenorphineData(): Opioid {
    const buprenorphineDose: number = parseFloat(this.getControlValue('buprenorphineDose'));
    const buprenorphine: Opioid = this.opioidService.getBuprenorphine();
    const results: OpioidResults = new OpioidResults(0, buprenorphineDose, 'μg/h');
    buprenorphine.setResults(results);
    return buprenorphine;
  }

  private getControlValue(controlName: any): any {
    return this.opioidConversionForm.controls[controlName].value;
  }
}
