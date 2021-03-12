import {MinMax} from './minMax';

export class OpioidResults {
  public numberOfDoses: number;
  public dose: number;
  public unit: string;
  public dailyDose: number;
  public morphineEquivalent: MinMax;

  constructor(numberOfDoses: number, dose: number, unit: string) {
    this.numberOfDoses = numberOfDoses;
    this.dose = dose;
    this.unit = unit;
  }

  public setDailyDose(dailyDose: number): void {
    this.dailyDose = dailyDose;
  }

  public setMorphineEquivalent(morphineEquivalent: MinMax): void {
    this.morphineEquivalent = morphineEquivalent;
  }
}
