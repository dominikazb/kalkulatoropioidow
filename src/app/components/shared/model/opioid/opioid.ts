export class Opioid {
  public index: number;
  public description: string;
  public multiplier: number;
  public minMultiplier: number;
  public maxMultiplier: number;
  public doseLimit: number;

  constructor(index: number,
              description: string,
              multiplier: number,
              minMultiplier: number,
              maxMultiplier: number,
              doseLimit: number) {
    this.index = index;
    this.description = description;
    this.multiplier = multiplier;
    this.minMultiplier = minMultiplier;
    this.maxMultiplier = maxMultiplier;
    this.doseLimit = doseLimit;
  }
}
