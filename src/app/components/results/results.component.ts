import {Component, OnInit} from '@angular/core';
import {ResultsService} from '../shared/services/results.service';
import {Results} from '../shared/model/results';
import {MinMax} from '../shared/model/minMax';
import {Opioid} from '../shared/model/opioid';
import {Router} from '@angular/router';
import {CalculationsService} from '../shared/services/calculations.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  public resultsText = 'WYNIKI';
  public opioidText = 'Opioid';
  public dailyDoseText = 'Dawka dzienna';
  public morphineEquivalentText = 'Ekwiwalent morfiny';
  public goBackText = 'Wróć do strony głównej';
  public noResultsText = 'Nie wybrano żadnych leków.';

  public data: Results;

  public sumOfMorphineEquivalents: MinMax;

  public opioidToConvertTo: number;
  public doseReduction: number;
  public opioidsForTable: Opioid[] = [];

  public showResults = true;

  constructor(private calculationsService: CalculationsService,
              private results: ResultsService,
              private router: Router) { }

  ngOnInit(): void {
    this.getResults();
    this.createArrayOfOpioids();
    console.log(this.data);
    this.loadResultsOrRedirect();
  }

  private getResults(): void {
    this.data = this.results.getResults();
  }

  private createArrayOfOpioids(): void {
    this.opioidsForTable.push(this.data.firstOpioid);
    this.opioidsForTable.push(this.data.secondOpioid);
    this.opioidsForTable.push(this.data.thirdOpioid);
    this.opioidsForTable.push(this.data.fentanyl);
    this.opioidsForTable.push(this.data.buprenorphine);
  }

  private loadResultsOrRedirect(): void {
    if (this.resultsAreNotUndefined(this.data)) {
      if (this.oneOfOpioidsWasChosen()) {
        this.getData();
        this.showResults = true;
      } else {
        this.showResults = false;
        setTimeout(() => {
          this.redirectToMainPage();
        }, 1000);
      }
    } else {
      this.showResults = false;
      this.redirectToMainPage();
    }
  }

  private resultsAreNotUndefined(results: Results): boolean {
    return results !== null || results !== undefined;
  }

  private redirectToMainPage(): void {
    this.router.navigate(['/']).then(() => {});
  }

  private oneOfOpioidsWasChosen(): boolean {
    return this.opioidWasChosen(this.data.firstOpioid) || this.opioidWasChosen(this.data.secondOpioid) ||
      this.opioidWasChosen(this.data.thirdOpioid) || this.plasterWasChosen(this.data.fentanyl) ||
      this.plasterWasChosen(this.data.buprenorphine);
  }

  private getData(): void {
    this.calculationsService.setDailyDosesForOpioids(this.data);
    this.calculationsService.setMorphineEquivalentsForOpioids(this.data);
    this.sumOfMorphineEquivalents = this.calculationsService.setSumOfMorphineEquivalents(this.data);
  }

  public opioidWasChosen(opioid: Opioid): boolean {
    return opioid.index !== 0 && opioid.results.numberOfDoses !== 0 && opioid.results.dose !== 0;
  }

  public plasterWasChosen(opioid: Opioid): boolean {
    return opioid.results.dose !== 0;
  }
}
