import {Component, Input, OnInit} from '@angular/core';
import {Results} from '../../../shared/model/results/results';
import {ResultsService} from '../../../shared/services/results/results.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'opioid-conversion-to',
  templateUrl: './opioid-conversion-to.component.html'
})
export class OpioidConversionToComponent implements OnInit {

  @Input() listOfProposedBuprenorphinePlasters: string[];
  public results: Results;

  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.results = this.resultsService.results;
  }
}
