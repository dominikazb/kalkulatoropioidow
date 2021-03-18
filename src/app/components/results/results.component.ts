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

  public opioidInfoData: [{
    index: number,
    name: string,
    text1: string, text2: string, text3: string, text4: string, text5: string, text6: string, text7: string,
    doseCanBeExceeded: boolean,
    doseLimit: number,
    doseLimitUnit: string,
    warning: string
  }] = opioidInfoContent;

  constructor(public opioidService: OpioidService,
              private calculationsService: CalculationsService,
              private resultsService: ResultsService,
              private router: Router) { }

  ngOnInit(): void {
    this.results = this.resultsService.getResults();
    this.loadResultsOrRedirect();

    if (this.results.opioidToConvertToIndex !== 0) {
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
    const opioidToConvertToDoseRange = this.calculationsService.calculateOpioidToConvertToDoseRange(
      this.results.opioidToConvertTo, this.results.sumOfMorphineEquivalents);
    this.results.setOpioidToConvertToDoseRange(opioidToConvertToDoseRange);
  }

  private setReducedDoseRangeForOpioidToConvertTo(): void {
    if (this.results.doseReduction > 0) {
      const opioidToConvertToReducedDoseRange = this.calculationsService.calculateOpioidToConvertToReducedDoseRange(
        this.results.doseReduction, this.results.opioidToConvertToDoseRange);
      this.results.setOpioidToConvertToReducedDoseRange(opioidToConvertToReducedDoseRange);
    }
  }

  // TODO: to musi być dla dawki normalnej + dla dawki przekroczonej (!!!)
  private setDoseExceededForOpioidToConvertTo(): void {
    let doseLimit = 100000000000; // TODO! DO ZAORANIA!
    this.opioidInfoData.forEach(opioid => {
      if (opioid.index === this.results.opioidToConvertToIndex) {
        doseLimit = opioid.doseLimit;
      }
    });
    const doseExceeded =
      this.calculationsService.opioidToConvertToDoseWasExceeded(this.results.opioidToConvertToDoseRange, doseLimit);
    this.results.setOpioidToConvertToDoseExceeded(doseExceeded);
  }

  public opioidToConvertToWasChosen(): boolean {
    return this.results.opioidToConvertToIndex !== 0;
  }
}
