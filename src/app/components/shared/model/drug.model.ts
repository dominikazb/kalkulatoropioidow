export class DrugModel {
  public index: number;
  public name: string;
  public minMultiplier: number;
  public maxMultiplier: number;

  constructor(index: number, name: string, minMultiplier: number, maxMultiplier: number) {
    this.index = index;
    this.name = name;
    this.minMultiplier = minMultiplier;
    this.maxMultiplier = maxMultiplier;
  }
}
