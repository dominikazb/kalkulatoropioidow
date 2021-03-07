export class DrugModel {
  public index: number;
  public name: string;
  public description: string;
  public multiplier: number;
  public minMultiplier: number;
  public maxMultiplier: number;

  constructor(index: number,
              name: string,
              description: string,
              multiplier: number,
              minMultiplier: number,
              maxMultiplier: number) {
    this.index = index;
    this.name = name;
    this.description = description;
    this.multiplier = multiplier;
    this.minMultiplier = minMultiplier;
    this.maxMultiplier = maxMultiplier;
  }
}
