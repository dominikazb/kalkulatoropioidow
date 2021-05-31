import {Component, Input, OnInit} from '@angular/core';
import {Results} from '../../../shared/model/results/results';
import {ResultsService} from '../../../shared/services/results/results.service';
import {OpioidIndices} from '../../../shared/data/opioid/OpioidIndices';
import {ContentService} from '../../../shared/services/content/content.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'plaster-list',
  templateUrl: './plaster-list.component.html'
})
export class PlasterListComponent implements OnInit {

  @Input() listOfProposedPlasters: string[];
  public opioidIndices = OpioidIndices;

  // TODO: proponowane plastry --> link nie wyświetla się ładnie

  public results: Results;

  constructor(public contentService: ContentService,
              private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.results = this.resultsService.results;
  }
}
