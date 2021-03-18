import {Results} from '../../model/results/results';
import {Opioid} from '../../model/opioid/opioid';
import {MinMax} from '../../model/opioid/minMax';
import {MorphineEquivalentService} from './morphine.equivalent.service';
import {TotalDailyDoseService} from './total.daily.dose.service';
import {Injectable} from '@angular/core';
import {OPIOIDS} from '../../data/opioid/opioids';
import {ResultsService} from '../results/results.service';

@Injectable()
export class CalculationsService {

  private buprenorphineIndex = 2;
  private fentanylIndex = 5;
  private metadonIndex = 7;
  private oxycodoneIndex = 10;

  constructor(private totalDailyDoseService: TotalDailyDoseService,
              private morphineEquivalentService: MorphineEquivalentService,
              private resultsService: ResultsService) {
  }

  public setDailyDosesForOpioids(results: Results): void {
    const firstOpioidDD = this.totalDailyDoseService.calculateOpioidTotalDailyDose(results.firstOpioid.opioid.index,
      results.firstOpioid.numberOfDoses, results.firstOpioid.dose, results.firstOpioid.unit);
    const secondOpioidDD = this.totalDailyDoseService.calculateOpioidTotalDailyDose(results.secondOpioid.opioid.index,
      results.secondOpioid.numberOfDoses, results.secondOpioid.dose, results.secondOpioid.unit);
    const thirdOpioidDD = this.totalDailyDoseService.calculateOpioidTotalDailyDose(results.thirdOpioid.opioid.index,
      results.thirdOpioid.numberOfDoses, results.thirdOpioid.dose, results.thirdOpioid.unit);
    const fentanylDD = this.totalDailyDoseService.calculateOpioidPlasterTotalDailyDose(results.fentanyl.dose);
    const buprenorphineDD = this.totalDailyDoseService.calculateOpioidPlasterTotalDailyDose(results.buprenorphine.dose);

    results.firstOpioid.setDailyDose(firstOpioidDD);
    results.secondOpioid.setDailyDose(secondOpioidDD);
    results.thirdOpioid.setDailyDose(thirdOpioidDD);
    results.fentanyl.setDailyDose(fentanylDD);
    results.buprenorphine.setDailyDose(buprenorphineDD);
  }

  public setMorphineEquivalentsForOpioids(results: Results): void {
    const firstOpioidME = this.calculateMorphineEquivalent(results.firstOpioid.dailyDose, results.firstOpioid.opioid);
    const secondOpioidME = this.calculateMorphineEquivalent(results.secondOpioid.dailyDose, results.secondOpioid.opioid);
    const thirdOpioidME = this.calculateMorphineEquivalent(results.thirdOpioid.dailyDose, results.thirdOpioid.opioid);
    const fentanylME =
      this.morphineEquivalentService.calculateMorphineEquivalentForFentanylPlaster(results.fentanyl.dose);
    const buprenorphineME =
      this.morphineEquivalentService.calculateMorphineEquivalentForBuprenorfinaPlaster(results.buprenorphine.dailyDose);

    results.firstOpioid.setMorphineEquivalent(firstOpioidME);
    results.secondOpioid.setMorphineEquivalent(secondOpioidME);
    results.thirdOpioid.setMorphineEquivalent(thirdOpioidME);
    results.fentanyl.setMorphineEquivalent(fentanylME);
    results.buprenorphine.setMorphineEquivalent(buprenorphineME);
  }

  private calculateMorphineEquivalent(dailyDose: number, opioid: Opioid): MinMax {
    let morphineEquivalent: MinMax;
    if (opioid.index === 7) {
      morphineEquivalent = this.morphineEquivalentService.calculateMorphineEquivalentForMetadon(
        dailyDose);
    } else if (opioid.index === 10) {
      morphineEquivalent = this.morphineEquivalentService.calculateMorphineEquivalentForOxycodone(
        dailyDose);
    } else {
      morphineEquivalent = this.morphineEquivalentService.calculateMorphineEquivalent(
        opioid, dailyDose);
    }
    return morphineEquivalent;
  }

  public setSumOfMorphineEquivalents(results: Results): MinMax {
      return this.morphineEquivalentService.sumUpMorphineEquivalentRangeForAllDrugs(
      results.firstOpioid.morphineEquivalent,
      results.secondOpioid.morphineEquivalent,
      results.thirdOpioid.morphineEquivalent,
      results.fentanyl.morphineEquivalent,
      results.buprenorphine.morphineEquivalent
    );
  }

  public calculateOpioidToConvertToDoseRange(opioid: Opioid, sumOfMorphineEquivalents: MinMax): MinMax {
    let min = 0;
    let max = 0;

    if (opioid.index === this.buprenorphineIndex) {
      min = sumOfMorphineEquivalents.min / 115 / 24 * 1000;
      max = sumOfMorphineEquivalents.max / 75 / 24 * 1000;
    } else if (opioid.index === this.fentanylIndex) {
      min = this.calculateFentanylDoseRange(sumOfMorphineEquivalents.min);
      min = this.calculateFentanylDoseRange(sumOfMorphineEquivalents.max);
    } else if (opioid.index === this.metadonIndex) {
      min = this.setMetadonDoseRange(sumOfMorphineEquivalents.min);
      max = this.setMetadonDoseRange(sumOfMorphineEquivalents.max);
    } else if (opioid.index === this.oxycodoneIndex) {
      min = sumOfMorphineEquivalents.min * 100 / 90;
      max = sumOfMorphineEquivalents.max * 100 / 90;
    } else {
      OPIOIDS.forEach(drugModel => {
        if (drugModel.index === opioid.index) {
          min = sumOfMorphineEquivalents.min / opioid.minMultiplier;
          max = sumOfMorphineEquivalents.max / opioid.maxMultiplier;
        }
      });
    }
    return new MinMax(min, max);
  }

  private calculateFentanylDoseRange(sumOfMorphineEquivalentsMinMax: number): number {
    let minMax = 0;

    if (sumOfMorphineEquivalentsMinMax >= 0 && sumOfMorphineEquivalentsMinMax <= 44) {
        minMax = 12;
    } else if (sumOfMorphineEquivalentsMinMax >= 45 && sumOfMorphineEquivalentsMinMax <= 89) {
        // listOfSuggestedFentanylPlasters.add("Plaster: 25 μg/h");
        minMax = 25;
    } else if (sumOfMorphineEquivalentsMinMax >= 90 && sumOfMorphineEquivalentsMinMax <= 149 ) {
        // listOfSuggestedFentanylPlasters.add("Plaster: 50 μg/h");
      minMax = 50;
    } else if (sumOfMorphineEquivalentsMinMax >= 150 && sumOfMorphineEquivalentsMinMax <= 209) {
        // listOfSuggestedFentanylPlasters.add("Plaster: 75 μg/h");
        minMax = 75;
    } else if (sumOfMorphineEquivalentsMinMax >= 210 && sumOfMorphineEquivalentsMinMax <= 269) {
        // listOfSuggestedFentanylPlasters.add("Plaster: 100 μg/h");
        minMax =  100;
    } else if (sumOfMorphineEquivalentsMinMax >= 270 && sumOfMorphineEquivalentsMinMax <= 329) {
        // listOfSuggestedFentanylPlasters.add("Plaster: 25 μg/h + 100 μg/h");
        minMax = 125;
    } else if (sumOfMorphineEquivalentsMinMax >= 330 && sumOfMorphineEquivalentsMinMax <= 389) {
        // listOfSuggestedFentanylPlasters.add("Plaster: 50 μg/h + 100 μg/h");
        minMax =  150;
    } else if (sumOfMorphineEquivalentsMinMax >= 390 && sumOfMorphineEquivalentsMinMax <= 449) {
        // listOfSuggestedFentanylPlasters.add("Plaster: 75 μg/h + 100 μg/h");
        minMax = 175;
    } else if (sumOfMorphineEquivalentsMinMax >= 450 && sumOfMorphineEquivalentsMinMax <= 509) {
        // listOfSuggestedFentanylPlasters.add("Plaster: 2 x 100 μg/h");
        minMax = 200;
    } else if (sumOfMorphineEquivalentsMinMax >= 510 && sumOfMorphineEquivalentsMinMax <= 569) {
        // listOfSuggestedFentanylPlasters.add("Plaster: 2 x 100 μg/h + 25 μg/h");
        minMax = 225;
    } else if (sumOfMorphineEquivalentsMinMax >= 570 && sumOfMorphineEquivalentsMinMax <= 629) {
        // listOfSuggestedFentanylPlasters.add("Plaster: 2 x 100 μg/h + 50 μg/h");
        minMax = 250;
    } else if (sumOfMorphineEquivalentsMinMax >= 630 && sumOfMorphineEquivalentsMinMax <= 689) {
        // listOfSuggestedFentanylPlasters.add("Plaster: 2 x 100 μg/h + 75 μg/h");
        minMax = 275;
    } else if (sumOfMorphineEquivalentsMinMax >= 690 && sumOfMorphineEquivalentsMinMax <= 749) {
        // listOfSuggestedFentanylPlasters.add("Plaster: 3 x 100 μg/h");
        minMax = 300;
    } else if (sumOfMorphineEquivalentsMinMax >= 750) {
        // minMax = sumOfMorphineEquivalents.getMin()/150 /24 * 1000;
        // if (minimalNumber <= 300) {
        //   listOfSuggestedFentanylPlasters.add("Plaster: 3 x 100 μg/h");
        // }
    }
    return minMax;
  }

  private setMetadonDoseRange(sumOfMorphineEquivalentsMinMax: number): number {
    let minMax = 0;
    if (sumOfMorphineEquivalentsMinMax >= 0 && sumOfMorphineEquivalentsMinMax <= 100) {
      minMax = sumOfMorphineEquivalentsMinMax / 4;
    } else if (sumOfMorphineEquivalentsMinMax >= 101 && sumOfMorphineEquivalentsMinMax <= 300) {
      minMax = sumOfMorphineEquivalentsMinMax / 6;
    } else if (sumOfMorphineEquivalentsMinMax >= 301 && sumOfMorphineEquivalentsMinMax <= 1000) {
      minMax = sumOfMorphineEquivalentsMinMax / 12;
    } else if (sumOfMorphineEquivalentsMinMax >= 1001) {
      minMax = sumOfMorphineEquivalentsMinMax / 20;
    }
    return minMax;
  }

  public calculateOpioidToConvertToReducedDoseRange(doseReduction: number, opioidEquivalent: MinMax): MinMax {
    const min = opioidEquivalent.min * ((100 - doseReduction) / 100);
    const max = opioidEquivalent.max * ((100 - doseReduction) / 100);
    return new MinMax(min, max);
  }

  public opioidToConvertToDoseWasExceeded(doseRange: MinMax, maximumDose: number): boolean {
    return doseRange.min >= maximumDose || doseRange.max >= maximumDose;
  }

}
