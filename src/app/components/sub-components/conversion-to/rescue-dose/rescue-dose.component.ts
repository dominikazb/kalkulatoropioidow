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

  private opioidToConvertToIndex: number;
  public opioidIndices = OpioidIndices;

  public rescueDoseData: {1: number, 2: number, 3: number, 4: number, 5: number, 6: number, 7: number,
    8: number, 9: number, 10: number, 11: number, 12: number, 13: number
  } = rescueDoseContent;

  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.opioidToConvertToIndex = this.resultsService.results.opioidToConvertToIndex;
  }
}
