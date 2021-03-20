import {Component, Input, OnInit} from '@angular/core';
import {ResultsService} from '../../shared/services/results/results.service';
import {Results} from '../../shared/model/results/results';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'results-opioid-info',
  templateUrl: './results-opioid-info.component.html'
})
export class ResultsOpioidInfoComponent implements OnInit{

  @Input() opioidInfoData: any;
  public opioidsToShow: number[] = [];

  public fentanylTransdermalIndex = 5;
  public methadoneIndex = 7;

  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.opioidsToShow = this.getListOfChosenOpioidsFromResuls(this.resultsService.results);
  }

  private getListOfChosenOpioidsFromResuls(results: Results): number[] {
    const opioidsToShow: number[] = [];

    opioidsToShow.push(results.firstOpioid.opioid.index);
    opioidsToShow.push(results.secondOpioid.opioid.index);
    opioidsToShow.push(results.thirdOpioid.opioid.index);
    opioidsToShow.push(results.opioidToConvertTo.index);
    if (results.fentanyl.dose > 0) {
      opioidsToShow.push(results.fentanyl.opioid.index);
    }
    if (results.buprenorphine.dose > 0) {
      opioidsToShow.push(results.buprenorphine.opioid.index);
    }

    const opioidsFiltered =
      opioidsToShow
        .filter((value, index) => opioidsToShow.indexOf(value) === index)
        .filter(value => value !== 0 && value !== 9);
    return opioidsFiltered;
  }
}
