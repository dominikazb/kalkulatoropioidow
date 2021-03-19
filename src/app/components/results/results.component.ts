import {Component, OnInit} from '@angular/core';
import {ResultsService} from '../shared/services/results/results.service';
import {Results} from '../shared/model/results/results';
import {Router} from '@angular/router';
import {CalculationsService} from '../shared/services/calculations/calculations.service';
import {OpioidService} from '../shared/services/opioid/opioid.service';
import resultsContent from '../shared/data/textContent/resultsContent.json';
import opioidInfoContent from '../shared/data/opioid/opioidInfoContent.json';
import {Opioid} from '../shared/model/opioid/opioid';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {

  public textData: {
    resultsText: string,
    opioidText: string,
    dailyDoseText: string,
    morphineEquivalentText: string,
    goBackText: string,
    noResultsText: string,
    contactText: string,
    contactTextInfo: string
  } = resultsContent;

  public showResults: boolean;
  public results: Results;

  public opioidInfoData: {'1': any, '2': any, '3': any, '4': any, '5': any, '6': any, '7': any,
                           '8': any, '9': any, '10': any, '11': any, '12': any, '13': any
  } = opioidInfoContent;

  constructor(public opioidService: OpioidService,
              private calculationsService: CalculationsService,
              private resultsService: ResultsService,
              private router: Router) { }

  ngOnInit(): void {
    this.results = this.resultsService.getResults();
    this.loadResultsOrRedirect();

    if (this.results && this.results.opioidToConvertToIndex !== 0) {
      this.setDoseRangeForOpioidToConvertTo();
      this.setReducedDoseRangeForOpioidToConvertTo();
      this.setDoseExceededForOpioidToConvertTo();
    }
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
    }, 800);
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
    const opioidToConvertToIndex: number = this.resultsService.results.opioidToConvertToIndex;
    // @ts-ignore
    const doseCanBeExceeded = this.opioidInfoData[opioidToConvertToIndex].doseCanBeExceeded;

    if (doseCanBeExceeded) {
      // @ts-ignore
      const doseLimit = this.opioidInfoData[opioidToConvertToIndex].doseLimit;

      if (this.calculationsService.opioidToConvertToDoseWasExceeded(
        this.resultsService.results.opioidToConvertToDoseRange, doseLimit)) {
        this.resultsService.results.opioidToConvertToDoseExceeded = true;
      }

      // dla buprenorfiny transdermalnie (?)
    }
  }

  public opioidToConvertToWasChosen(): boolean {
    return this.results.opioidToConvertToIndex !== 0;
  }
}
