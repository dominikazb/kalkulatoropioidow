import {Opioid} from '../opioid/opioid';
import {MinMax} from '../opioid/minMax';
import {OpioidResults} from './opioid.results';

export class Results {
  public firstOpioid: OpioidResults;
  public secondOpioid: OpioidResults;
  public thirdOpioid: OpioidResults;
  public fentanyl: OpioidResults;
  public buprenorphine: OpioidResults;
  public opioidToConvertToIndex: number;
  public opioidToConvertTo: Opioid;
  public doseReduction: number;

  public sumOfMorphineEquivalents: MinMax;
  public opioidToConvertToDoseRange: MinMax;
  public opioidToConvertToReducedDoseRange: MinMax;
  public opioidToConvertToDoseExceeded: boolean;

  public doseForResults: string;

  constructor() { }

  public setFirstOpioid(firstOpioid: OpioidResults): void {
    this.firstOpioid = firstOpioid;
  }

  public setSecondOpioid(secondOpioid: OpioidResults): void {
    this.secondOpioid = secondOpioid;
  }

  public setThirdOpioid(thirdOpioid: OpioidResults): void {
    this.thirdOpioid = thirdOpioid;
  }

  public setFentanyl(fentanyl: OpioidResults): void {
    this.fentanyl = fentanyl;
  }

  public setBuprenorphine(buprenorphine: OpioidResults): void {
    this.buprenorphine = buprenorphine;
  }

  public setSumOfMorphineEquivalents(sum: MinMax): void {
    this.sumOfMorphineEquivalents = sum;
  }

  public setOpioidToConvertToIndex(index: number): void {
    this.opioidToConvertToIndex = index;
  }

  public setOpioidToConvertTo(opioidToConvertTo: Opioid): void {
    this.opioidToConvertTo = opioidToConvertTo;
  }

  public setDoseReduction(doseReduction: number): void {
    this.doseReduction = doseReduction;
  }

  public setOpioidToConvertToDoseRange(doseRange: MinMax): void {
    this.opioidToConvertToDoseRange = doseRange;
  }

  public setOpioidToConvertToReducedDoseRange(reducedDoseRange: MinMax): void {
    this.opioidToConvertToReducedDoseRange = reducedDoseRange;
  }

  public setOpioidToConvertToDoseExceeded(doseExceeded: boolean): void {
    this.opioidToConvertToDoseExceeded = doseExceeded;
  }

  public setDoseForResults(dose: string): void {
    this.doseForResults = dose;
  }
}
