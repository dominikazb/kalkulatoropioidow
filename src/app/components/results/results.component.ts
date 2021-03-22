import {Component, OnInit} from '@angular/core';
import {ResultsService} from '../shared/services/results/results.service';
import {Results} from '../shared/model/results/results';
import {Router} from '@angular/router';
import {CalculationsService} from '../shared/services/calculations/calculations.service';
import {OpioidService} from '../shared/services/opioid/opioid.service';
import resultsContent from '../shared/data/textContent/resultsContent.json';
import opioidInfoContent from '../shared/data/opioid/opioidInfoContent.json';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {

  public resultsTextData: {
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

  public opioidInfoData: {1: number, 2: number, 3: number, 4: number, 5: number, 6: number, 7: number,
                           8: number, 9: number, 10: number, 11: number, 12: number, 13: number
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
    }
  }
}
