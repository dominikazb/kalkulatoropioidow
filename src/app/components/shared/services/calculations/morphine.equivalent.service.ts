import {MinMax} from '../../model/opioid/minMax';
import {Opioid} from '../../model/opioid/opioid';
import {OPIOIDS} from '../../data/opioid/opioids';

export class MorphineEquivalentService {

  public calculateMorphineEquivalent(drug: Opioid, dailyDose: number): MinMax {
    let min = 0;
    let max = 0;

    OPIOIDS.forEach(drugModel => {
      if (drugModel.index === drug.index) {
        min = dailyDose * drug.minMultiplier;
        max = dailyDose * drug.maxMultiplier;
      }
    });

    return new MinMax(min, max);
  }

  public calculateMorphineEquivalentForMethadone(dailyDose: number): MinMax {
    let morphineEquivalentRange: MinMax = new MinMax(0, 0);

    if (dailyDose >= 0 && dailyDose <= 25) {
      morphineEquivalentRange = new MinMax(dailyDose * 4, dailyDose * 4);
    } else if (dailyDose >= 26 && dailyDose <= 50) {
      morphineEquivalentRange = new MinMax(dailyDose * 6, dailyDose * 6);
    } else if (dailyDose >= 51 && dailyDose <= 83) {
      morphineEquivalentRange = new MinMax(dailyDose * 12, dailyDose * 12);
    } else if (dailyDose >= 84) {
      morphineEquivalentRange = new MinMax(dailyDose * 20, dailyDose * 20);
    }
    return morphineEquivalentRange;
  }

  // hydrochloride oxycodone contains 90% of oxycodone
  public calculateMorphineEquivalentForOxycodone(dailyDose: number): MinMax {
    return new MinMax(dailyDose * OPIOIDS[9].minMultiplier * 9 / 10,
                      dailyDose * OPIOIDS[9].maxMultiplier * 9 / 10);
  }

  public calculateMorphineEquivalentForFentanylPlaster(hourlyDose: number): MinMax {
    let morphineEquivalentRange: MinMax = new MinMax(0, 0);

    if (hourlyDose === 12) {
      morphineEquivalentRange = new MinMax(0, 44);
    } else if (hourlyDose === 25) {
      morphineEquivalentRange = new MinMax(45, 89);
    } else if (hourlyDose === 50) {
      morphineEquivalentRange = new MinMax(90, 149);
    } else if (hourlyDose === 75) {
      morphineEquivalentRange = new MinMax(150, 209);
    } else if (hourlyDose === 100) {
      morphineEquivalentRange = new MinMax(210, 269);
    } else if (hourlyDose === 125) {
      morphineEquivalentRange = new MinMax(270, 329);
    } else if (hourlyDose === 150) {
      morphineEquivalentRange = new MinMax(330, 389);
    } else if (hourlyDose === 175) {
      morphineEquivalentRange = new MinMax(390, 449);
    } else if (hourlyDose === 200) {
      morphineEquivalentRange = new MinMax(450, 509);
    } else if (hourlyDose === 225) {
      morphineEquivalentRange = new MinMax(510, 569);
    } else if (hourlyDose === 250) {
      morphineEquivalentRange = new MinMax(570, 629);
    } else if (hourlyDose === 275) {
      morphineEquivalentRange = new MinMax(630, 689);
    } else if (hourlyDose === 300) {
      morphineEquivalentRange = new MinMax(690, 749);
    }

    return morphineEquivalentRange;
  }

  public calculateMorphineEquivalentForBuprenorfinaPlaster(dailyDose: number): MinMax {
    return new MinMax(dailyDose * 75, dailyDose * 115);
  }

  public sumUpMorphineEquivalentRangeForAllDrugs(firstOpioidME: MinMax, secondOpioidME: MinMax,
                                                 thirdOpioidME: MinMax, fentanylME: MinMax,
                                                 buprenorphineME: MinMax): MinMax {
      const min: number = firstOpioidME.min + secondOpioidME.min + thirdOpioidME.min +
        fentanylME.min + buprenorphineME.min;

      const max: number = firstOpioidME.max + secondOpioidME.max + thirdOpioidME.max +
        fentanylME.max + buprenorphineME.max;

      return new MinMax(min, max);
  }
}
