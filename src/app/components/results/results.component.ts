import {Component, OnInit} from '@angular/core';
import {ResultsService} from '../shared/services/results.service';
import {TotalDailyDoseService} from '../shared/services/calculations/total.daily.dose.service';
import {Results} from '../shared/model/results';
import {MorphineEquivalentService} from '../shared/services/calculations/morphine.equivalent.service';
import {MinMax} from '../shared/model/minMax';
import {Opioid} from '../shared/model/opioid';
import {Router} from '@angular/router';

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

  public firstOpioidDailyDose: number;
  public secondOpioidDailyDose: number;
  public thirdOpioidDailyDose: number;
  public fentanylDailyDose: number;
  public buprenorphineDailyDose: number;

  public firstOpioidMorphineEquivalent: MinMax;
  public secondOpioidMorphineEquivalent: MinMax;
  public thirdOpioidMorphineEquivalent: MinMax;
  public fentanylMorphineEquivalent: MinMax;
  public buprenorphineMorphineEquivalent: MinMax;

  public sumOfMorphineEquivalents: MinMax;

  public opioidToConvertTo: number;
  public doseReduction: number;

  public showResults = true;

  constructor(private totalDailyDoseService: TotalDailyDoseService,
              private morphineEquivalentService: MorphineEquivalentService,
              private results: ResultsService,
              private router: Router) { }

  ngOnInit(): void {
    this.getResults();
    console.log(this.data);
    this.loadResultsOrRedirect();
  }

  private getResults(): void {
    this.data = this.results.getResults();
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
    this.setDailyDoses(this.data);
    this.setMorphineEquivalents();
    this.setSumOfMorphineEquivalents();
  }

  private setDailyDoses(results: Results): void {
    this.firstOpioidDailyDose = this.totalDailyDoseService.calculateOpioidTotalDailyDose(results.firstOpioid.index,
      results.firstOpioid.numberOfDoses, results.firstOpioid.dose, results.firstOpioid.unit);
    this.secondOpioidDailyDose = this.totalDailyDoseService.calculateOpioidTotalDailyDose(results.secondOpioid.index,
      results.secondOpioid.numberOfDoses, results.secondOpioid.dose, results.secondOpioid.unit);
    this.thirdOpioidDailyDose = this.totalDailyDoseService.calculateOpioidTotalDailyDose(results.thirdOpioid.index,
      results.thirdOpioid.numberOfDoses, results.thirdOpioid.dose, results.thirdOpioid.unit);
    this.fentanylDailyDose = this.totalDailyDoseService.calculateOpioidPlasterTotalDailyDose(results.fentanyl.dose);
    this.buprenorphineDailyDose = this.totalDailyDoseService.calculateOpioidPlasterTotalDailyDose(results.buprenorphine.dose);
  }

  private setMorphineEquivalents(): void {
    this.firstOpioidMorphineEquivalent = this.morphineEquivalent(this.firstOpioidDailyDose, this.data.firstOpioid);
    this.secondOpioidMorphineEquivalent = this.morphineEquivalent(this.secondOpioidDailyDose, this.data.secondOpioid);
    this.thirdOpioidMorphineEquivalent = this.morphineEquivalent(this.thirdOpioidDailyDose, this.data.thirdOpioid);
    this.fentanylMorphineEquivalent =
      this.morphineEquivalentService.calculateMorphineEquivalentForFentanylPlaster(this.data.fentanyl.dose);
    this.buprenorphineMorphineEquivalent =
      this.morphineEquivalentService.calculateMorphineEquivalentForBuprenorfinaPlaster(this.buprenorphineDailyDose);
  }

  private morphineEquivalent(dailyDose: number, opioid: Opioid): MinMax {
    let morphineEquivalent: MinMax;
    if (opioid.index === 7) {
      morphineEquivalent = this.morphineEquivalentService.calculateMorphineEquivalentForMetadon(
        dailyDose);
    } else {
      morphineEquivalent = this.morphineEquivalentService.calculateMorphineEquivalent(
        opioid, dailyDose);
    }
    return morphineEquivalent;
  }

  public opioidWasChosen(opioid: Opioid): boolean {
    return opioid.index !== 0 && opioid.numberOfDoses !== 0 && opioid.dose !== 0;
  }

  public plasterWasChosen(opioid: Opioid): boolean {
    return opioid.dose !== 0;
  }

  private setSumOfMorphineEquivalents(): void {
    this.sumOfMorphineEquivalents = this.morphineEquivalentService.sumUpMorphineEquivalentRangeForAllDrugs(
      this.firstOpioidMorphineEquivalent,
      this.secondOpioidMorphineEquivalent,
      this.thirdOpioidMorphineEquivalent,
      this.fentanylMorphineEquivalent,
      this.buprenorphineMorphineEquivalent
    );
  }
}
