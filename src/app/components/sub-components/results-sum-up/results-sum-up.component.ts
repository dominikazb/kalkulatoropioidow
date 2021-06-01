import {Component, OnInit} from '@angular/core';
import {ResultsService} from '../../shared/services/results/results.service';
import {Results} from '../../shared/model/results/results';
import {OpioidResults} from '../../shared/model/results/opioid.results';
import {OpioidService} from '../../shared/services/opioid/opioid.service';
import {ContentService} from '../../shared/services/content/content.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'results-sum-up',
  templateUrl: './results-sum-up.component.html'
})
export class ResultsSumUpComponent implements OnInit {

  public opioidsForHTML: OpioidResults[] = [];
  public plastersForHTML: OpioidResults[] = [];
  public results: Results;

  // TODO: table is not striped anymore... :(

  constructor(public contentService: ContentService,
              public opioidService: OpioidService,
              private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.getResults();
    this.setOpioidsForHTML();
  }

  private getResults(): void {
    this.results = this.resultsService.getResults();
  }

  private setOpioidsForHTML(): void {
    if (this.results) {
      this.opioidsForHTML.push(this.results.firstOpioid);
      this.opioidsForHTML.push(this.results.secondOpioid);
      this.opioidsForHTML.push(this.results.thirdOpioid);
      this.plastersForHTML.push(this.results.fentanyl);
      this.plastersForHTML.push(this.results.buprenorphine);
    }
  }
}
