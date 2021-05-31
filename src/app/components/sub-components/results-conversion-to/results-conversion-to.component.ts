import {Component, OnInit} from '@angular/core';
import {ResultsService} from '../../shared/services/results/results.service';
import {Results} from '../../shared/model/results/results';
import {CalculationsService} from '../../shared/services/calculations/calculations.service';
import {OpioidIndices} from '../../shared/data/opioid/OpioidIndices';
import {ContentService} from '../../shared/services/content/content.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'results-conversion-to',
  templateUrl: './results-conversion-to.component.html'
})
export class ResultsConversionToComponent implements OnInit {

  public results: Results;
  public opioidIndices = OpioidIndices;
  public listOfProposedFentanylPlasters: string[] = [];
  public listOfProposedBuprenorphinePlasters: string[] = [];

  constructor(public contentService: ContentService,
              public resultsService: ResultsService,
              private calculationsService: CalculationsService) { }

  ngOnInit(): void {
    this.results = this.resultsService.results;
    if (this.results.opioidToConvertToIndex === this.opioidIndices.FentanylTransdermal.valueOf()) {
      this.listOfProposedFentanylPlasters = this.getListOfProposedFentanylPlasters();
    }

    if (this.results.opioidToConvertToIndex === this.opioidIndices.BuprenorphineTransdermal.valueOf()) {
      this.listOfProposedBuprenorphinePlasters = this.getListOfProposedBuprenorphinePlasters();
    }
  }

  private getListOfProposedFentanylPlasters(): string[] {
    let fentanylPlasters: string[] = [];
    if (this.results.doseReduction === 0) {
      fentanylPlasters = this.calculationsService.getListOfProposedFentanylPlasters(this.results.opioidToConvertToDoseRange, this.results);
    } else {
      fentanylPlasters =
        this.calculationsService.getListOfProposedFentanylPlasters(this.results.opioidToConvertToReducedDoseRange, this.results);
    }
    return fentanylPlasters.filter((value, index) => fentanylPlasters.indexOf(value) === index);
  }

  private getListOfProposedBuprenorphinePlasters(): string[] {
    let buprenorphinePlasters: string[] = [];
    if (this.results.doseReduction === 0) {
      buprenorphinePlasters =
        this.calculationsService.getListOfProposedBuprenorphinePlasters(this.results.opioidToConvertToDoseRange, this.results);
    } else {
      buprenorphinePlasters =
        this.calculationsService.getListOfProposedBuprenorphinePlasters(this.results.opioidToConvertToReducedDoseRange, this.results);
    }
    return buprenorphinePlasters.filter((value, index) => buprenorphinePlasters.indexOf(value) === index);
  }

  public opioidToConvertToWasChosen(): boolean {
    return !Number.isNaN(this.results.opioidToConvertToIndex) && this.results.opioidToConvertToIndex !== 0;
  }
}
