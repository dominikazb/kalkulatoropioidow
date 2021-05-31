import {Component, OnInit} from '@angular/core';
import {ResultsService} from '../../shared/services/results/results.service';
import {ContentService} from '../../shared/services/content/content.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'kidney-failure',
  templateUrl: './kidney-failure.component.html'
})
export class KidneyFailureComponent implements OnInit {

  public kidneyCheckboxWasChecked: boolean;

  constructor(public contentService: ContentService,
              private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.checkIfKidneyCheckboxWasChecked();
  }

  private checkIfKidneyCheckboxWasChecked(): void {
    this.kidneyCheckboxWasChecked = this.resultsService.results.kidneyCheckbox;
  }

  public opioidToConvertToWasChosen(): boolean {
    return !Number.isNaN(this.resultsService.results.opioidToConvertToIndex) && this.resultsService.results.opioidToConvertToIndex !== 0;
  }
}
