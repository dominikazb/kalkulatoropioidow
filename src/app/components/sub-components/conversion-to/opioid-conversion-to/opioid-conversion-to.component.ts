import {Component, Input, OnInit} from '@angular/core';
import {Results} from '../../../shared/model/results/results';
import {ResultsService} from '../../../shared/services/results/results.service';
import {OpioidIndices} from '../../../shared/data/opioid/OpioidIndices';
import {ContentService} from '../../../shared/services/content/content.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'opioid-conversion-to',
  templateUrl: './opioid-conversion-to.component.html'
})
export class OpioidConversionToComponent implements OnInit {

  @Input() listOfProposedBuprenorphinePlasters: string[];
  public opioidIndices = OpioidIndices;
  public results: Results;

  constructor(public contentService: ContentService,
              private resultsService: ResultsService,) { }

  ngOnInit(): void {
    this.results = this.resultsService.results;
  }
}
