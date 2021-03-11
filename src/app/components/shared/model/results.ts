import {Opioid} from './opioid';

export class Results {
  public firstOpioid: Opioid;
  public secondOpioid: Opioid;
  public thirdOpioid: Opioid;
  public fentanyl: Opioid;
  public buprenorphine: Opioid;
  public opioidToConvertTo: Opioid;
  public doseReduction: number;

  constructor(firstOpioid: Opioid,
              secondOpioid: Opioid,
              thirdOpioid: Opioid,
              fentanyl: Opioid,
              buprenorphine: Opioid,
              opioidToConvertTo: Opioid,
              doseReduction: number) {
    this.firstOpioid = firstOpioid;
    this.secondOpioid = secondOpioid;
    this.thirdOpioid = thirdOpioid;
    this.fentanyl = fentanyl;
    this.buprenorphine = buprenorphine;
    this.opioidToConvertTo = opioidToConvertTo;
    this.doseReduction = doseReduction;
  }
}
