export class ResultsForDatabase {

  private firstOpioid: string;
  private firstOpioidDailyDose: number;
  private secondOpioid: string;
  private secondOpioidDailyDose: number;
  private thirdOpioid: string;
  private thirdOpioidDailyDose: number;
  private fentanylDailyDose: number;
  private buprenorphineDailyDose: number;
  private opioidToConvertTo: string;
  private doseReduction: number;

  public setFirstOpioid(firstOpioid: string, firstOpioidDailyDose: number): void {
    this.firstOpioid = firstOpioid;
    this.firstOpioidDailyDose = firstOpioidDailyDose;
  }

  public setSecondOpioid(secondOpioid: string, secondOpioidDailyDose: number): void {
    this.secondOpioid = secondOpioid;
    this.secondOpioidDailyDose = secondOpioidDailyDose;
  }

  public setThirdOpioid(thirdOpioid: string, thirdOpioidDailyDose: number): void {
    this.thirdOpioid = thirdOpioid;
    this.thirdOpioidDailyDose = thirdOpioidDailyDose;
  }

  public setFentanylDailyDose(fentanylDailyDose: number): void {
    this.fentanylDailyDose = fentanylDailyDose;
  }

  public setBuprenorphineDailyDose(buprenorphineDailyDose: number): void {
    this.buprenorphineDailyDose = buprenorphineDailyDose;
  }

  public setOpioidToConvertTo(opioidToConvertTo: string): void {
    this.opioidToConvertTo = opioidToConvertTo;
  }

  public setDoseReduction(doseReduction: number): void {
    this.doseReduction = doseReduction;
  }
}
