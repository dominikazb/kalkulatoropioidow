export class Opioid {
  public index: number;
  public name: string;
  public description: string;
  public multiplier: number;
  public minMultiplier: number;
  public maxMultiplier: number;
  public numberOfDoses: number;
  public dose: number;
  public unit: string;

  constructor(index: number,
              name: string,
              description: string,
              multiplier: number,
              minMultiplier: number,
              maxMultiplier: number,
              numberOfDoses: number,
              dose: number,
              unit: string) {
    this.index = index;
    this.name = name;
    this.description = description;
    this.multiplier = multiplier;
    this.minMultiplier = minMultiplier;
    this.maxMultiplier = maxMultiplier;
    this.numberOfDoses = numberOfDoses;
    this.dose = dose;
    this.unit = unit;
  }

  public setNumberOfDoses(numberOfDoses: number): void {
    this.numberOfDoses = numberOfDoses;
  }

  public setDose(dose: number): void {
    this.dose = dose;
  }

  public setUnit(unit: string): void {
    this.unit = unit;
  }
}
