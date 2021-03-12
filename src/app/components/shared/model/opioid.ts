import {OpioidResults} from './opioid.results';

export class Opioid {
  public index: number;
  public description: string;
  public multiplier: number;
  public minMultiplier: number;
  public maxMultiplier: number;
  public results: OpioidResults;

  constructor(index: number,
              description: string,
              multiplier: number,
              minMultiplier: number,
              maxMultiplier: number) {
    this.index = index;
    this.description = description;
    this.multiplier = multiplier;
    this.minMultiplier = minMultiplier;
    this.maxMultiplier = maxMultiplier;
  }

  public setResults(results: OpioidResults): void {
    this.results = results;
  }
}
