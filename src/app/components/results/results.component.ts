import {Component, OnInit} from '@angular/core';
import {ResultsService} from '../shared/services/results/results.service';
import {Results} from '../shared/model/results/results';
import {Router} from '@angular/router';
import {CalculationsService} from '../shared/services/calculations/calculations.service';
import {OpioidService} from '../shared/services/opioid/opioid.service';
import {ContentService} from '../shared/services/content/content.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {

  public showResults: boolean;
  public results: Results;
  public kidneyCheckboxWasChecked: boolean;

  // TODO: kidney failure component <a href> for reformatting
  // TODO: wynieść kidney failure do osobnego komponentu
  // TODO: add content-service for managing all the json content

  constructor(public contentService: ContentService,
              public opioidService: OpioidService,
              private calculationsService: CalculationsService,
              private resultsService: ResultsService,
              private router: Router) { }

  ngOnInit(): void {
    this.results = this.resultsService.getResults();
    this.loadResultsOrRedirect();

    if (this.results.opioidToConvertToIndex && this.results.opioidToConvertToIndex !== 0) {
      this.setDoseRangeForOpioidToConvertTo();
      this.setReducedDoseRangeForOpioidToConvertTo();
      this.setDoseExceededForOpioidToConvertTo();
    }
    this.checkIfKidneyCheckboxWasChecked();
  }

  private loadResultsOrRedirect(): void {
    if (this.results) {
      if (this.opioidService.oneOfOpioidsWasChosen(this.results)) {
        this.getData();
        this.showResults = true;
      } else {
        this.hideResults();
      }
    } else {
      this.hideResults();
    }
  }

  private hideResults(): void {
    this.showResults = false;
    setTimeout(() => {
      this.redirectToMainPage();
    }, 500);
  }

  private redirectToMainPage(): void {
    this.router.navigate(['/']).then(() => {});
  }

  private getData(): void {
    this.calculationsService.setDailyDosesForOpioids(this.results);
    this.calculationsService.setMorphineEquivalentsForOpioids(this.results);
    this.calculationsService.setSumOfMorphineEquivalents(this.results);
  }

  private setDoseRangeForOpioidToConvertTo(): void {
    const opioidToConvertToDoseRange =
      this.calculationsService.calculateOpioidToConvertToDoseRange(this.results.opioidToConvertToIndex,
        this.results.sumOfMorphineEquivalents, this.results, this.results.opioidToConvertTo);
    this.results.setOpioidToConvertToDoseRange(opioidToConvertToDoseRange);
  }

  private setReducedDoseRangeForOpioidToConvertTo(): void {
    if (this.results.doseReduction > 0) {
      const opioidToConvertToReducedDoseRange = this.calculationsService.calculateOpioidToConvertToReducedDoseRange(
        this.results.doseReduction, this.results.opioidToConvertToDoseRange);
      this.results.setOpioidToConvertToReducedDoseRange(opioidToConvertToReducedDoseRange);
    }
  }

  private setDoseExceededForOpioidToConvertTo(): void {
    const opioidToConvertToIndex: number = this.results.opioidToConvertToIndex;
    // @ts-ignore
    const doseCanBeExceeded = this.contentService.opioidInfoData[opioidToConvertToIndex].doseCanBeExceeded;

    if (doseCanBeExceeded) {
      // @ts-ignore
      const doseLimit = this.contentService.opioidInfoData[opioidToConvertToIndex].doseLimit;

      if (this.calculationsService.opioidToConvertToDoseWasExceeded(
        this.resultsService.results.opioidToConvertToDoseRange, doseLimit)) {
        this.resultsService.results.opioidToConvertToDoseExceeded = true;
      }
    }
  }

  private checkIfKidneyCheckboxWasChecked(): void {
    this.kidneyCheckboxWasChecked = this.resultsService.results.kidneyCheckbox;
  }
}
