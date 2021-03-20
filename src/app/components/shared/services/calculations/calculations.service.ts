import {Results} from '../../model/results/results';
import {Opioid} from '../../model/opioid/opioid';
import {MinMax} from '../../model/opioid/minMax';
import {MorphineEquivalentService} from './morphine.equivalent.service';
import {TotalDailyDoseService} from './total.daily.dose.service';
import {Injectable} from '@angular/core';
import {OPIOIDS} from '../../data/opioid/opioids';

@Injectable()
export class CalculationsService {

  private buprenorphineTransdermalIndex = 2;
  private fentanylTransdermalIndex = 5;
  private metadonIndex = 7;
  private oxycodoneIndex = 10;

  constructor(private totalDailyDoseService: TotalDailyDoseService,
              private morphineEquivalentService: MorphineEquivalentService) {
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

  public setSumOfMorphineEquivalents(results: Results): void {
    const sumOfMorphineEquivalents = this.morphineEquivalentService.sumUpMorphineEquivalentRangeForAllDrugs(
      results.firstOpioid.morphineEquivalent,
      results.secondOpioid.morphineEquivalent,
      results.thirdOpioid.morphineEquivalent,
      results.fentanyl.morphineEquivalent,
      results.buprenorphine.morphineEquivalent
    );
    results.setSumOfMorphineEquivalents(sumOfMorphineEquivalents);
  }

  public calculateOpioidToConvertToDoseRange(opioidToConvertToIndex: number,
                                             sumOfMorphineEquivalents: MinMax,
                                             results: Results,
                                             opioid: Opioid): MinMax {
    let min = 0;
    let max = 0;

    if (opioidToConvertToIndex === this.buprenorphineTransdermalIndex) {
      const minTemp = (sumOfMorphineEquivalents.min / 75) / 24 * 1000;
      const maxTemp = (sumOfMorphineEquivalents.max / 115) / 24 * 1000;
      min = minTemp < maxTemp ? minTemp : maxTemp;
      max = minTemp < maxTemp ? maxTemp : minTemp;
      results.setDoseForResults('μg/h');
    } else if (opioidToConvertToIndex === this.fentanylTransdermalIndex) {
      min = this.calculateFentanylDoseRange(sumOfMorphineEquivalents.min);
      max = this.calculateFentanylDoseRange(sumOfMorphineEquivalents.max);
      results.setDoseForResults('μg/h');
    } else if (opioidToConvertToIndex === this.metadonIndex) {
      min = this.setMetadonDoseRange(sumOfMorphineEquivalents.min);
      max = this.setMetadonDoseRange(sumOfMorphineEquivalents.max);
      results.setDoseForResults('mg/dzień');
    } else if (opioidToConvertToIndex === this.oxycodoneIndex) {
      min = sumOfMorphineEquivalents.min / 2 * 100 / 90;
      max = sumOfMorphineEquivalents.max / 2 * 100 / 90;
      results.setDoseForResults('mg/dzień');
    } else {
      OPIOIDS.forEach(drugModel => {
        if (drugModel.index === opioidToConvertToIndex) {
          const minTemp = sumOfMorphineEquivalents.min / opioid.minMultiplier;
          const maxTemp = sumOfMorphineEquivalents.max / opioid.maxMultiplier;
          min = minTemp < maxTemp ? minTemp : maxTemp;
          max = minTemp < maxTemp ? maxTemp : minTemp;
          results.setDoseForResults('mg/dzień');
        }
      });
    }
    return new MinMax(min, max);
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

  private calculateFentanylDoseRange(sumOfMorphineEquivalentsMinMax: number): number {
    let minMax = 0;

    if (sumOfMorphineEquivalentsMinMax >= 0 && sumOfMorphineEquivalentsMinMax <= 44) {
      minMax = 12;
    } else if (sumOfMorphineEquivalentsMinMax >= 45 && sumOfMorphineEquivalentsMinMax <= 89) {
      minMax = 25;
    } else if (sumOfMorphineEquivalentsMinMax >= 90 && sumOfMorphineEquivalentsMinMax <= 149 ) {
      minMax = 50;
    } else if (sumOfMorphineEquivalentsMinMax >= 150 && sumOfMorphineEquivalentsMinMax <= 209) {
      minMax = 75;
    } else if (sumOfMorphineEquivalentsMinMax >= 210 && sumOfMorphineEquivalentsMinMax <= 269) {
      minMax =  100;
    } else if (sumOfMorphineEquivalentsMinMax >= 270 && sumOfMorphineEquivalentsMinMax <= 329) {
      minMax = 125;
    } else if (sumOfMorphineEquivalentsMinMax >= 330 && sumOfMorphineEquivalentsMinMax <= 389) {
      minMax =  150;
    } else if (sumOfMorphineEquivalentsMinMax >= 390 && sumOfMorphineEquivalentsMinMax <= 449) {
      minMax = 175;
    } else if (sumOfMorphineEquivalentsMinMax >= 450 && sumOfMorphineEquivalentsMinMax <= 509) {
      minMax = 200;
    } else if (sumOfMorphineEquivalentsMinMax >= 510 && sumOfMorphineEquivalentsMinMax <= 569) {
      minMax = 225;
    } else if (sumOfMorphineEquivalentsMinMax >= 570 && sumOfMorphineEquivalentsMinMax <= 629) {
      minMax = 250;
    } else if (sumOfMorphineEquivalentsMinMax >= 630 && sumOfMorphineEquivalentsMinMax <= 689) {
      minMax = 275;
    } else if (sumOfMorphineEquivalentsMinMax >= 690 && sumOfMorphineEquivalentsMinMax <= 749) {
      minMax = 300;
    } else if (sumOfMorphineEquivalentsMinMax >= 750) {
      minMax = sumOfMorphineEquivalentsMinMax / 150 / 24 * 1000; // TODO: is this correct (?)
    }
    return minMax;
  }

  public getListOfProposedFentanylPlasters(opioidToConvertToDoseRange: MinMax, results: Results): string[] {
    const listOfPossiblePlasters: string[] = [];
    const fentanylPlasters = new Map();

    fentanylPlasters
      .set(25, 'Plaster 25μg/h')
      .set(50, 'Plaster: 50 μg/h')
      .set(75, 'Plaster: 75 μg/h')
      .set(100, 'Plaster: 100 μg/h')
      .set(125, 'Plaster: 25 μg/h + 100 μg/h')
      .set(150, 'Plaster: 50 μg/h + 100 μg/h')
      .set(175, 'Plaster: 75 μg/h + 100 μg/h')
      .set(200, 'Plaster: 2 x 100 μg/h')
      .set(225, 'Plaster: 2 x 100 μg/h + 25 μg/h')
      .set(250, 'Plaster: 2 x 100 μg/h + 50 μg/h')
      .set(275, 'Plaster: 2 x 100 μg/h + 75 μg/h')
      .set(300, 'Plaster: 3 x 100 μg/h');

    fentanylPlasters.forEach((key, value) => {
      if (results.opioidToConvertToIndex === this.fentanylTransdermalIndex) {

        const plasterValue: number = value;
        const fentanylPlasterMinus25 =
          opioidToConvertToDoseRange.min - (opioidToConvertToDoseRange.min * 25 / 100);
        const fentanylPlasterPlus25 =
          opioidToConvertToDoseRange.max + (opioidToConvertToDoseRange.max * 25 / 100);

        if (plasterValue >= fentanylPlasterMinus25 && plasterValue <= fentanylPlasterPlus25) {
          listOfPossiblePlasters.push(key);
        }
      }
    });

    return listOfPossiblePlasters;
  }

  public getListOfProposedBuprenorphinePlasters(opioidToConvertToDoseRange: MinMax, results: Results): string[] {
    const listOfPossiblePlasters: string[] = [];
    const buprenorphinePlasters = new Map();

    buprenorphinePlasters
      .set(17.5, 'Plaster: 17.5μg/h (pół plastra 35 μg/h)')
      .set(26.25, 'Plaster: 26.25μg/h (pół plastra 52.5 μg/h)')
      .set(35, 'Plaster: 35μg/h')
      .set(52.5, 'Plaster: 52.5μg/h')
      .set(70, 'Plaster: 70μg/h')
      .set(87.5, 'Plaster: 87.5μg/h (plaster 52.5 μg/h + plaster 35.5 μg/h)')
      .set(105, 'Plaster: 105μg/h (2 x plaster 52.5 μg/h)')
      .set(122.5, 'Plaster: 122.5μg/h (plaster 70 μg/h + plaster 52.5 μg/h)')
      .set(140, 'Plaster: 140μg/h (2 x plaster 70 μg/h)');

    buprenorphinePlasters.forEach((key, value) => {
      if (results.opioidToConvertToIndex === this.buprenorphineTransdermalIndex) {

        const plasterValue: number = value;
        const buprenorphinePlasterMinus15 =
          opioidToConvertToDoseRange.min - (opioidToConvertToDoseRange.min * 15 / 100);
        const buprenorphinePlasterPlus15 =
          opioidToConvertToDoseRange.max + (opioidToConvertToDoseRange.max * 15 / 100);

        if (plasterValue >= buprenorphinePlasterMinus15 && plasterValue <= buprenorphinePlasterPlus15) {
          listOfPossiblePlasters.push(key);
        }
      }
    });

    return listOfPossiblePlasters;
  }
}
