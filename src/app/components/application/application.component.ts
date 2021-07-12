import {Component, HostListener, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import * as _ from 'underscore';
import {FormsService} from '../shared/services/form/forms.service';
import {Router} from '@angular/router';
import {ResultsService} from '../shared/services/results/results.service';
import {Opioid} from '../shared/model/opioid/opioid';
import {OpioidService} from '../shared/services/opioid/opioid.service';
import {OpioidResults} from '../shared/model/results/opioid.results';
import {MinMax} from '../shared/model/opioid/minMax';
import {Results} from '../shared/model/results/results';
import {ContentService} from '../shared/services/content/content.service';

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

  public opioidConversionForm: FormGroup;
  private screenWidth: number;
  public secondOpioidIsCollapsed: boolean;
  public thirdOpioidIsCollapsed: boolean;
  public fentanylIsCollapsed: boolean;
  public buprenorphineIsCollapsed: boolean;

  constructor(public contentService: ContentService,
              private formsService: FormsService,
              private opioidService: OpioidService,
              private resultsService: ResultsService,
              private router: Router) { }

  ngOnInit(): void {
    this.getScreenSize();
    this.buildForm();
    this.resultsService.results = new Results();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(): void {
    this.screenWidth = window.innerWidth;
    this.setFormsCollapsing();
  }

  private setFormsCollapsing(): void {
    if (this.screenWidth <= 767) {
      if (this.resultsService.results && this.opioidService.oneOfOpioidsWasChosen(this.resultsService.results)) {
        this.secondOpioidIsCollapsed = !this.opioidService.opioidWasChosen(this.resultsService.results.secondOpioid);
        this.thirdOpioidIsCollapsed = !this.opioidService.opioidWasChosen(this.resultsService.results.thirdOpioid);
        this.fentanylIsCollapsed = !this.opioidService.plasterWasChosen(this.resultsService.results.fentanyl);
        this.buprenorphineIsCollapsed = !this.opioidService.plasterWasChosen(this.resultsService.results.buprenorphine);
      } else {
        this.setFormCollapsingValues(true, true, true, true);
      }
    } else {
      this.setFormCollapsingValues(false, false, false, false);
    }
  }

  private setFormCollapsingValues(secondOpioidIsCollapsed: boolean, thirdOpioidIsCollapsed: boolean,
                                  fentanylIsCollapsed: boolean, buprenorphineIsCollapsed: boolean): void {
    this.secondOpioidIsCollapsed = secondOpioidIsCollapsed;
    this.thirdOpioidIsCollapsed = thirdOpioidIsCollapsed;
    this.fentanylIsCollapsed = fentanylIsCollapsed;
    this.buprenorphineIsCollapsed = buprenorphineIsCollapsed;
  }

  private buildForm(): void {
    this.opioidConversionForm = new FormGroup({
      kidneyCheckbox: new FormControl(this.resultsService.results ? this.resultsService.results.kidneyCheckbox : false)
    });

    let firstOpioidForm: FormGroup;
    let secondOpioidForm: FormGroup;
    let thirdOpioidForm: FormGroup;
    let fentanylForm: FormGroup;
    let buprenorphineForm: FormGroup;
    let conversionToForm: FormGroup;

    if (this.resultsService.results) {
      firstOpioidForm =
        this.addControlsToMainForm(this.opioidConversionFormFields.firstOpioid, this.resultsService.results.firstOpioid);
      secondOpioidForm =
        this.addControlsToMainForm(this.opioidConversionFormFields.secondOpioid, this.resultsService.results.secondOpioid);
      thirdOpioidForm =
        this.addControlsToMainForm(this.opioidConversionFormFields.thirdOpioid, this.resultsService.results.thirdOpioid);
      fentanylForm = this.formsService.fillFormFentanyl(this.resultsService.results);
      buprenorphineForm = this.formsService.fillFormBuprenorphine(this.resultsService.results);
      conversionToForm = this.formsService.fillFormConversionTo(this.resultsService.results);
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

  private addControlsToMainForm(name: string, opioidResults?: OpioidResults): FormGroup {
    if (opioidResults) {
      return this.formsService.fillFormOpioid(name, opioidResults);
    } else {
      return this.formsService.fillFormOpioid(name);
    }
  }

  private registerControls(opioidForm: FormGroup): void {
    _.forEach(opioidForm.controls, (control: AbstractControl, key: string) => {
      this.opioidConversionForm.registerControl(key, control);
    });
  }

  private setFormResults(): void {
    const firstOpioid: OpioidResults = this.setOpioidData('firstOpioid');
    const secondOpioid: OpioidResults = this.setOpioidData('secondOpioid');
    const thirdOpioid: OpioidResults = this.setOpioidData('thirdOpioid');
    this.resultsService.results.setFirstOpioid(firstOpioid);
    this.resultsService.results.setSecondOpioid(secondOpioid);
    this.resultsService.results.setThirdOpioid(thirdOpioid);
    this.setFentanylData();
    this.setBuprenorphineData();
    this.resultsService.results.setKidneyCheckbox(this.getControlValue('kidneyCheckbox'));
    this.setConversionToResults();
    this.setEmptyResultsCalculations();
  }

  private setOpioidData(opioidNo: string): OpioidResults {
    const index: number = parseFloat(this.getControlValue(opioidNo + '.index'));
    const numberOfDoses: number = parseFloat(this.getControlValue(opioidNo + '.numberOfDoses'));
    const dose: number = parseFloat(this.getControlValue(opioidNo + '.dose'));
    const unit: string = this.getControlValue(opioidNo + '.unit');
    const opioid: Opioid = this.opioidService.getOpioid(index);
    const opioidResults: OpioidResults = new OpioidResults(opioid, numberOfDoses ? numberOfDoses : 0,
      dose ? dose : 0, unit);
    return opioidResults;
  }

  private setFentanylData(): void {
    const fentanylDose: number = parseFloat(this.getControlValue('fentanylDose'));
    const fentanyl: Opioid = this.opioidService.getFentanyl();
    const results: OpioidResults = new OpioidResults(fentanyl, 0, fentanylDose, 'μg/h');
    this.resultsService.results.setFentanyl(results);
  }

  private setBuprenorphineData(): void {
    const buprenorphineDose: number = parseFloat(this.getControlValue('buprenorphineDose'));
    const buprenorphine: Opioid = this.opioidService.getBuprenorphine();
    const results: OpioidResults = new OpioidResults(buprenorphine, 0, buprenorphineDose, 'μg/h');
    this.resultsService.results.setBuprenorphine(results);
  }

  private setConversionToResults(): void {
    const opioidToConvertToIndex: number = parseInt(this.getControlValue('opioidToCovertTo'), 10);
    const opioidToConvertTo: Opioid = this.opioidService.getOpioid(opioidToConvertToIndex);
    const doseReduction: number = parseInt(this.getControlValue('doseReduction'), 10);

    this.resultsService.results.setOpioidToConvertToIndex(opioidToConvertToIndex);
    this.resultsService.results.setOpioidToConvertTo(opioidToConvertTo);
    this.resultsService.results.setDoseReduction(doseReduction);
  }

  private setEmptyResultsCalculations(): void {
    this.resultsService.results.setSumOfMorphineEquivalents(new MinMax(0, 0));
    this.resultsService.results.setOpioidToConvertToDoseRange(new MinMax(0, 0));
    this.resultsService.results.setOpioidToConvertToReducedDoseRange(new MinMax(0, 0));
    this.resultsService.results.setOpioidToConvertToDoseExceeded(false);
  }

  private getControlValue(controlName: any): any {
    return this.opioidConversionForm.controls[controlName].value;
  }

  public onSubmit(): void {
    this.setFormResults();
    this.router.navigate(['/results']).then(() => {});
  }
}
