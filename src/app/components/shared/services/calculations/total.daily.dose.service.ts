export class TotalDailyDoseService {

  public calculateOpioidTotalDailyDose(index: number, numberOfDoses: number, dose: number, unit: string): number {
    let opioidDailyDose = 0;
    if (unit === 'mg') {
      opioidDailyDose = this.calculateTotalOpioidDailyDoseFromMgToMg(numberOfDoses, dose);
    } else if (unit === 'μg') {
      opioidDailyDose = this.calculateTotalOpioidDailyDoseFromUgToMg(numberOfDoses, dose);
    }
    return opioidDailyDose;
  }

  public calculateOpioidPlasterTotalDailyDose(opioidDosePerHour: number): number {
    return opioidDosePerHour * 24 * 0.001; // * 24 hrs and convert from μg to mg
  }

  private calculateTotalOpioidDailyDoseFromMgToMg(numberOfDoses: number, doseInMg: number): number {
    return numberOfDoses * doseInMg;
  }

  private calculateTotalOpioidDailyDoseFromUgToMg(numberOfDoses: number, doseInUg: number): number {
    return numberOfDoses * doseInUg * 0.001;
  }
}
