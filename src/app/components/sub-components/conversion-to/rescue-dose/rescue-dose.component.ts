import {Component, OnInit} from '@angular/core';
import {OpioidIndices} from '../../../shared/data/opioid/OpioidIndices';
import {ResultsService} from '../../../shared/services/results/results.service';
import rescueDoseContent from '../../../shared/data/opioid/rescueDoseContent.json';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rescue-dose',
  templateUrl: './rescue-dose.component.html'
})
export class RescueDoseComponent implements OnInit {

  public opioidToConvertToIndex: number;
  public opioidIndices = OpioidIndices;

  public rescueDoseData: {1: any, 2: any, 3: any, 4: any, 5: any, 6: any, 7: any,
    8: any, 9: any, 10: any, 11: any, 12: any, 13: any
  } = rescueDoseContent;

  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.opioidToConvertToIndex = this.resultsService.results.opioidToConvertToIndex;
  }
}
