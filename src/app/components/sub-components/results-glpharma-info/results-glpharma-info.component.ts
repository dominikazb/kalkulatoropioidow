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

  public glpharmaData: {1: any, 2: any, 3: any, 4: any, 5: any, 6: any, 7: any,
    8: any, 9: any, 10: any, 11: any, 12: any, 13: any, 14: any, 15: any
  } = glpharmaContent;

  public opioidToConvertToIndex: number;
  public opioidIndices = OpioidIndices;

  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.opioidToConvertToIndex = this.resultsService.results.opioidToConvertToIndex;
  }

  public oneOfGlPharmaOpioidsWasChosen(): boolean {
    return this.opioidToConvertToIndex === this.opioidIndices.BuprenorphineTransdermal.valueOf() ||
      this.opioidToConvertToIndex === this.opioidIndices.FentanylTransdermal.valueOf() ||
      this.opioidToConvertToIndex === this.opioidIndices.Methadone.valueOf() ||
      this.opioidToConvertToIndex === this.opioidIndices.MorphineIV.valueOf() ||
      this.opioidToConvertToIndex === this.opioidIndices.MorphinePills.valueOf() ||
      this.opioidToConvertToIndex === this.opioidIndices.Oxycodone.valueOf();
  }
}
