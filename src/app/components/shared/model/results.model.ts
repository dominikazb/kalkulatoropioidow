export class ResultsModel {
  public firstOpioidIndex: number;
  public firstOpioidNumberOfDoses: number;
  public firstOpioidDose: number;
  public firstOpioidUnit: string;
  public secondOpioidIndex: number;
  public secondOpioidNumberOfDoses: number;
  public secondOpioidDose: number;
  public secondOpioidUnit: string;
  public thirdOpioidIndex: number;
  public thirdOpioidNumberOfDoses: number;
  public thirdOpioidDose: number;
  public thirdOpioidUnit: string;
  public fentanylDose: number;
  public buprenorphineDose: number;
  public opioidToConvertTo: number;
  public doseReduction: number;

  constructor(firstOpioidIndex: number,
              firstOpioidNumberOfDoses: number,
              firstOpioidDose: number,
              firstOpioidUnit: string,
              secondOpioidIndex: number,
              secondOpioidNumberOfDoses: number,
              secondOpioidDose: number,
              secondOpioidUnit: string,
              thirdOpioidIndex: number,
              thirdOpioidNumberOfDoses: number,
              thirdOpioidDose: number,
              thirdOpioidUnit: string,
              fentanylDose: number,
              buprenorphineDose: number,
              opioidToConvertTo: number,
              doseReduction: number) {
    this.firstOpioidIndex = firstOpioidIndex;
    this.firstOpioidNumberOfDoses = firstOpioidNumberOfDoses;
    this.firstOpioidDose = firstOpioidDose;
    this.firstOpioidUnit = firstOpioidUnit;
    this.secondOpioidIndex = secondOpioidIndex;
    this.secondOpioidNumberOfDoses = secondOpioidNumberOfDoses;
    this.secondOpioidDose = secondOpioidDose;
    this.secondOpioidUnit = secondOpioidUnit;
    this.thirdOpioidIndex = thirdOpioidIndex;
    this.thirdOpioidNumberOfDoses = thirdOpioidNumberOfDoses;
    this.thirdOpioidDose = thirdOpioidDose;
    this.thirdOpioidUnit = thirdOpioidUnit;
    this.fentanylDose = fentanylDose;
    this.buprenorphineDose = buprenorphineDose;
    this.opioidToConvertTo = opioidToConvertTo;
    this.doseReduction = doseReduction;
  }
}
