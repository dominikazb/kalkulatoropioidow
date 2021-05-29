import {Component, OnInit} from '@angular/core';
import glpharmaContent from '../../shared/data/opioid/glpharmaContent.json';
import {ResultsService} from '../../shared/services/results/results.service';
import {OpioidIndices} from '../../shared/data/opioid/OpioidIndices';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'results-glpharma-info',
  templateUrl: './results-glpharma-info.component.html'
})
export class ResultsGlpharmaInfoComponent implements OnInit {

  public glpharmaData: {1: number, 2: number, 3: number, 4: number, 5: number, 6: number, 7: number,
    8: number, 9: number, 10: number, 11: number, 12: number, 13: number, 14: number, 15: number
  } = glpharmaContent;

  public fentanylTransdermalWasChosen: boolean;
  public buprenorphineTransdermalWasChosen: boolean;
  public oxycodoneWasChosen: boolean;
  private opioidToConvertToIndex: number;

  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.opioidToConvertToIndex = this.resultsService.results.opioidToConvertToIndex;
    this.checkIfFentanylTransdermalWasChosen();
    this.checkIfTramadolWasChosen();
    this.checkIfOxycodoneWasChosen();
  }

  private checkIfFentanylTransdermalWasChosen(): void {
    this.fentanylTransdermalWasChosen =
      this.opioidToConvertToIndex === OpioidIndices.FentanylTransdermal.valueOf();
  }

  private checkIfTramadolWasChosen(): void {
    this.buprenorphineTransdermalWasChosen =
      this.opioidToConvertToIndex === OpioidIndices.BuprenorphineTransdermal.valueOf();
  }

  private checkIfOxycodoneWasChosen(): void {
    this.oxycodoneWasChosen =
      this.opioidToConvertToIndex === OpioidIndices.Oxycodone.valueOf();
  }

  public oneOfGlPharmaOpioidsWasChosen(): boolean {
    return this.opioidToConvertToIndex === OpioidIndices.BuprenorphineTransdermal.valueOf() ||
      this.opioidToConvertToIndex === OpioidIndices.FentanylTransdermal.valueOf() ||
      this.opioidToConvertToIndex === OpioidIndices.Methadone.valueOf() ||
      this.opioidToConvertToIndex === OpioidIndices.MorphineIV.valueOf() ||
      this.opioidToConvertToIndex === OpioidIndices.MorphinePills.valueOf() ||
      this.opioidToConvertToIndex === OpioidIndices.Oxycodone.valueOf();
  }
}
