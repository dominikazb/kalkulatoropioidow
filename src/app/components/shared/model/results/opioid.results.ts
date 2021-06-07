import {MinMax} from '../opioid/minMax';
import {Opioid} from '../opioid/opioid';

export class OpioidResults {
  public opioid: Opioid;
  public numberOfDoses: number;
  public dose: number;
  public unit: string;
  public dailyDose: number;
  public morphineEquivalent: MinMax;

  constructor(opioid: Opioid, numberOfDoses: number, dose: number, unit: string) {
    this.opioid = opioid;
    this.numberOfDoses = numberOfDoses;
    this.dose = dose;
    this.unit = unit ? unit : 'mg';
  }

  public setDailyDose(dailyDose: number): void {
    this.dailyDose = dailyDose ? dailyDose : 0;
  }

  public setMorphineEquivalent(morphineEquivalent: MinMax): void {
    this.morphineEquivalent = morphineEquivalent;
  }
}
