import {MinMax} from '../../model/minMax';
import {Opioid} from '../../model/opioid';
import {OPIOIDS} from '../../data/opioids';

export class MorphineEquivalentService {

  public calculateMorphineEquivalent(drug: Opioid, dailyDose: number): MinMax {
    let morphineEquivalentRange: MinMax;
    let min = 0;
    let max = 0;

    OPIOIDS.forEach(drugModel => {
      if (drug.index === drugModel.index) {
        min = dailyDose * drug.minMultiplier;
        max = dailyDose * drug.maxMultiplier;
      }
    });

    morphineEquivalentRange = new MinMax(min, max);
    return morphineEquivalentRange;
  }

  public calculateMorphineEquivalentForMetadon(dailyDose: number): MinMax {
    let morphineEquivalentRangeForMetadon: MinMax = new MinMax(0, 0);

    if (dailyDose >= 0 && dailyDose <= 25) {
      morphineEquivalentRangeForMetadon = new MinMax(dailyDose * 4, dailyDose * 4);
    } else if (dailyDose >= 26 && dailyDose <= 50) {
      morphineEquivalentRangeForMetadon = new MinMax(dailyDose * 6, dailyDose * 6);
    } else if (dailyDose >= 51 && dailyDose <= 83) {
      morphineEquivalentRangeForMetadon = new MinMax(dailyDose * 12, dailyDose * 12);
    } else if (dailyDose >= 84) {
      morphineEquivalentRangeForMetadon = new MinMax(dailyDose * 20, dailyDose * 20);
    }
    return morphineEquivalentRangeForMetadon;
  }


  public calculateMorphineEquivalentForFentanylPlaster(hourlyDose: number): MinMax {

    let morphineEquivalentRangeForFentanyl: MinMax = new MinMax(0, 0);

    if (hourlyDose === 12) {
      morphineEquivalentRangeForFentanyl = new MinMax(0, 44);
    } else if (hourlyDose === 25) {
      morphineEquivalentRangeForFentanyl = new MinMax(45, 89);
    } else if (hourlyDose === 50) {
      morphineEquivalentRangeForFentanyl = new MinMax(90, 149);
    } else if (hourlyDose === 75) {
      morphineEquivalentRangeForFentanyl = new MinMax(150, 209);
    } else if (hourlyDose === 100) {
      morphineEquivalentRangeForFentanyl = new MinMax(210, 269);
    } else if (hourlyDose === 125) {
      morphineEquivalentRangeForFentanyl = new MinMax(270, 329);
    } else if (hourlyDose === 150) {
      morphineEquivalentRangeForFentanyl = new MinMax(330, 389);
    } else if (hourlyDose === 175) {
      morphineEquivalentRangeForFentanyl = new MinMax(390, 449);
    } else if (hourlyDose === 200) {
      morphineEquivalentRangeForFentanyl = new MinMax(450, 509);
    } else if (hourlyDose === 225) {
      morphineEquivalentRangeForFentanyl = new MinMax(510, 569);
    } else if (hourlyDose === 250) {
      morphineEquivalentRangeForFentanyl = new MinMax(570, 629);
    } else if (hourlyDose === 275) {
      morphineEquivalentRangeForFentanyl = new MinMax(630, 689);
    } else if (hourlyDose === 300) {
      morphineEquivalentRangeForFentanyl = new MinMax(690, 749);
    }

    return morphineEquivalentRangeForFentanyl;
  }


  public calculateMorphineEquivalentForBuprenorfinaPlaster(dailyDose: number): MinMax {
    const morphineEquivalentRangeForBuprenorphine: MinMax = new MinMax(dailyDose * 75, dailyDose * 115);
    return morphineEquivalentRangeForBuprenorphine;
  }



  public sumUpMorphineEquivalentRangeForAllDrugs(firstOpioidMorphineEquivalent: MinMax, secondOpioidMorphineEquivalent: MinMax,
                                                 thirdOpioidMorphineEquivalent: MinMax, fentanylPlasterMorphineEquivalent: MinMax,
                                                 buprenorphinePlasterMorphineEquivalent: MinMax): MinMax {

      const min: number =
        firstOpioidMorphineEquivalent.min +
        secondOpioidMorphineEquivalent.min +
        thirdOpioidMorphineEquivalent.min +
        fentanylPlasterMorphineEquivalent.min +
        buprenorphinePlasterMorphineEquivalent.min;

      const max: number =
        firstOpioidMorphineEquivalent.max +
        secondOpioidMorphineEquivalent.max +
        thirdOpioidMorphineEquivalent.max +
        fentanylPlasterMorphineEquivalent.max +
        buprenorphinePlasterMorphineEquivalent.max;

      const sumOfMorphineEquivalentDoses: MinMax = new MinMax(min, max);
      return sumOfMorphineEquivalentDoses;
  }
}
