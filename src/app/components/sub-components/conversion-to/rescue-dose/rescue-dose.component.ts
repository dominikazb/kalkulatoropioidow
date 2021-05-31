import {Component, OnInit} from '@angular/core';
import {OpioidIndices} from '../../../shared/data/opioid/OpioidIndices';
import {ResultsService} from '../../../shared/services/results/results.service';
import {ContentService} from '../../../shared/services/content/content.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rescue-dose',
  templateUrl: './rescue-dose.component.html'
})
export class RescueDoseComponent implements OnInit {

  public opioidToConvertToIndex: number;
  public opioidIndices = OpioidIndices;

  constructor(public contentService: ContentService,
              private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.opioidToConvertToIndex = this.resultsService.results.opioidToConvertToIndex;
  }
}
