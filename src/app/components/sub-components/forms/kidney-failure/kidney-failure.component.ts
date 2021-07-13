import {Component, OnInit} from '@angular/core';
import {ResultsService} from '../../../shared/services/results/results.service';
import {ContentService} from '../../../shared/services/content/content.service';
import {OpioidService} from '../../../shared/services/opioid/opioid.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'kidney-failure',
  templateUrl: './kidney-failure.component.html'
})
export class KidneyFailureComponent implements OnInit {

  public kidneyCheckboxWasChecked: boolean;

  constructor(public contentService: ContentService,
              public opioidService: OpioidService,
              public resultsService: ResultsService) { }

  ngOnInit(): void {
    this.checkIfKidneyCheckboxWasChecked();
  }

  private checkIfKidneyCheckboxWasChecked(): void {
    this.kidneyCheckboxWasChecked = this.resultsService.results.kidneyCheckbox;
  }
}
