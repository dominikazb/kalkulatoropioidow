import {Component, Input, OnInit} from '@angular/core';
import {ResultsService} from '../../shared/services/results/results.service';
import {Results} from '../../shared/model/results/results';
import {OpioidIndices} from '../../shared/data/opioid/OpioidIndices';
import glpharmaContent from '../../shared/data/opioid/glpharmaContent.json';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'results-opioid-info',
  templateUrl: './results-opioid-info.component.html'
})
export class ResultsOpioidInfoComponent implements OnInit{

  @Input() opioidInfoData: any;
  public opioidsToShow: number[] = [];
  public opioidIndices = OpioidIndices;
  public kidneyCheckboxWasChecked: boolean;

  public glpharmaData: {1: number, 2: number, 3: number, 4: number, 5: number, 6: number, 7: number,
    8: number, 9: number, 10: number, 11: number, 12: number, 13: number, 14: number, 15: number
  } = glpharmaContent;

  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.checkIfKidneyCheckboxWasChecked();
    this.opioidsToShow = this.getListOfChosenOpioidsFromResults(this.resultsService.results);
  }

  private checkIfKidneyCheckboxWasChecked(): void {
    this.kidneyCheckboxWasChecked = this.resultsService.results.kidneyCheckbox;
  }

  private getListOfChosenOpioidsFromResults(results: Results): number[] {
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
        .filter(value => value !== 0 && value !== this.opioidIndices.MorphinePills.valueOf());
    return opioidsFiltered;
  }
}
