import {Component, Input, OnInit} from '@angular/core';
import {Results} from '../../../shared/model/results/results';
import {ResultsService} from '../../../shared/services/results/results.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'plaster-list',
  templateUrl: './plaster-list.component.html'
})
export class PlasterListComponent implements OnInit {

  @Input() listOfProposedPlasters: string[];

  public results: Results;

  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.results = this.resultsService.results;
  }
}
