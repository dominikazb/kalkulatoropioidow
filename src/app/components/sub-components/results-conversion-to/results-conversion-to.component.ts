import {Component, Input, OnInit} from '@angular/core';
import {Results} from '../../shared/model/results/results';
import {ResultsService} from '../../shared/services/results/results.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'results-conversion-to',
  templateUrl: './results-conversion-to.component.html'
})
export class ResultsConversionToComponent implements OnInit {

  @Input() opioidInfoData: any;

  public results: Results;

  constructor(public resultsService: ResultsService) {
  }

  ngOnInit(): void {
    this.results = this.resultsService.getResults();
  }
}
