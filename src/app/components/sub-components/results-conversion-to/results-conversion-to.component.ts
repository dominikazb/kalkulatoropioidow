import {Component, Input, OnInit} from '@angular/core';
import {Results} from '../../shared/model/results/results';
import {ResultsService} from '../../shared/services/results/results.service';
import {MinMax} from '../../shared/model/opioid/minMax';
import {CalculationsService} from '../../shared/services/calculations/calculations.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'results-conversion-to',
  templateUrl: './results-conversion-to.component.html'
})
export class ResultsConversionToComponent implements OnInit {

  @Input() opioidInfoData: any;
  public results: Results;

  public metadonProposedDailyDose: MinMax;
  public metadonProposedDailyDoseReduced: MinMax;
  public metadonSingleDose: MinMax;
  public metadonSingleDoseReduced: MinMax;

  public metadonIndex = 7;
  public buprenorphineTransdermalIndex = 2;
  public fentanylTransdermalIndex = 5;

  public listOfProposedFentanylPlasters: string[];
  public listOfProposedBuprenorphinePlasters: string[];

  constructor(public resultsService: ResultsService,
              private calculationsService: CalculationsService) { }

  ngOnInit(): void {
    this.results = this.resultsService.getResults();
    if (this.results.opioidToConvertToIndex === this.metadonIndex) {
      this.setMetadonProposedDailyDose();
      this.setMetadonProposedDailyDoseReduced();
      this.setMetadonSingleDose();
      this.setMetadonSingleDoseReduced();
    }
    if (this.results.opioidToConvertToIndex === this.fentanylTransdermalIndex) {
      this.listOfProposedFentanylPlasters = this.setListOfProposedFentanylPlasters();
    }
    if (this.results.opioidToConvertToIndex === this.buprenorphineTransdermalIndex) {
      this.listOfProposedBuprenorphinePlasters = this.setListOfProposedBuprenorphinePlasters();
    }
  }

  private setMetadonProposedDailyDose(): void {
    this.metadonProposedDailyDose = new MinMax(this.results.opioidToConvertToDoseRange.min / 2,
      this.results.opioidToConvertToDoseRange.max / 2);
  }

  private setMetadonProposedDailyDoseReduced(): void {
    if (this.results.doseReduction > 0) {
      this.metadonProposedDailyDoseReduced = new MinMax(this.results.opioidToConvertToReducedDoseRange.min / 2,
        this.results.opioidToConvertToReducedDoseRange.max / 2);
    }
  }

  // TODO: ustawić prawidłowe liczenie dawki doraźnej
  private setMetadonSingleDose(): void {
    this.metadonSingleDose = new MinMax(this.results.opioidToConvertToDoseRange.min / 30,
      this.results.opioidToConvertToDoseRange.max / 30);
  }

  private setMetadonSingleDoseReduced(): void {
    if (this.results.doseReduction > 0) {
      this.metadonSingleDoseReduced = new MinMax(this.results.opioidToConvertToReducedDoseRange.min / 30,
        this.results.opioidToConvertToReducedDoseRange.max / 30);
    }
  }

  private setListOfProposedFentanylPlasters(): string[] {
    let fentanylPlasters: string[] = [];
    if (this.results.doseReduction === 0) {
      fentanylPlasters = this.calculationsService.getListOfProposedFentanylPlasters(this.results.opioidToConvertToDoseRange, this.results);
    } else {
      fentanylPlasters =
        this.calculationsService.getListOfProposedFentanylPlasters(this.results.opioidToConvertToDoseRange, this.results);
    }
    return fentanylPlasters.filter((value, index) => fentanylPlasters.indexOf(value) === index);
  }

  private setListOfProposedBuprenorphinePlasters(): string[] {
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
}
