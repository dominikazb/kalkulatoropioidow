import {Results} from '../../model/results';
import {Opioid} from '../../model/opioid';
import {MinMax} from '../../model/minMax';
import {MorphineEquivalentService} from './morphine.equivalent.service';
import {TotalDailyDoseService} from './total.daily.dose.service';
import {Injectable} from '@angular/core';

@Injectable()
export class CalculationsService {

  constructor(private totalDailyDoseService: TotalDailyDoseService,
              private morphineEquivalentService: MorphineEquivalentService) {
  }

  public setDailyDosesForOpioids(results: Results): void {
    const firstOpioidDD = this.totalDailyDoseService.calculateOpioidTotalDailyDose(results.firstOpioid.index,
      results.firstOpioid.results.numberOfDoses, results.firstOpioid.results.dose, results.firstOpioid.results.unit);
    const secondOpioidDD = this.totalDailyDoseService.calculateOpioidTotalDailyDose(results.secondOpioid.index,
      results.secondOpioid.results.numberOfDoses, results.secondOpioid.results.dose, results.secondOpioid.results.unit);
    const thirdOpioidDD = this.totalDailyDoseService.calculateOpioidTotalDailyDose(results.thirdOpioid.index,
      results.thirdOpioid.results.numberOfDoses, results.thirdOpioid.results.dose, results.thirdOpioid.results.unit);
    const fentanylDD = this.totalDailyDoseService.calculateOpioidPlasterTotalDailyDose(results.fentanyl.results.dose);
    const buprenorphineDD = this.totalDailyDoseService.calculateOpioidPlasterTotalDailyDose(results.buprenorphine.results.dose);

    results.firstOpioid.results.setDailyDose(firstOpioidDD);
    results.secondOpioid.results.setDailyDose(secondOpioidDD);
    results.thirdOpioid.results.setDailyDose(thirdOpioidDD);
    results.fentanyl.results.setDailyDose(fentanylDD);
    results.buprenorphine.results.setDailyDose(buprenorphineDD);
  }

  public setMorphineEquivalentsForOpioids(results: Results): void {
    const firstOpioidME = this.calculateMorphineEquivalent(results.firstOpioid.results.dailyDose, results.firstOpioid);
    const secondOpioidME = this.calculateMorphineEquivalent(results.secondOpioid.results.dailyDose, results.secondOpioid);
    const thirdOpioidME = this.calculateMorphineEquivalent(results.thirdOpioid.results.dailyDose, results.thirdOpioid);
    const fentanylME =
      this.morphineEquivalentService.calculateMorphineEquivalentForFentanylPlaster(results.fentanyl.results.dose);
    const buprenorphineME =
      this.morphineEquivalentService.calculateMorphineEquivalentForBuprenorfinaPlaster(results.buprenorphine.results.dailyDose);

    results.firstOpioid.results.setMorphineEquivalent(firstOpioidME);
    results.secondOpioid.results.setMorphineEquivalent(secondOpioidME);
    results.thirdOpioid.results.setMorphineEquivalent(thirdOpioidME);
    results.fentanyl.results.setMorphineEquivalent(fentanylME);
    results.buprenorphine.results.setMorphineEquivalent(buprenorphineME);
  }

  private calculateMorphineEquivalent(dailyDose: number, opioid: Opioid): MinMax {
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

  public setSumOfMorphineEquivalents(results: Results): MinMax {
      return this.morphineEquivalentService.sumUpMorphineEquivalentRangeForAllDrugs(
      results.firstOpioid.results.morphineEquivalent,
      results.secondOpioid.results.morphineEquivalent,
      results.thirdOpioid.results.morphineEquivalent,
      results.fentanyl.results.morphineEquivalent,
      results.buprenorphine.results.morphineEquivalent
    );
  }
}
