import {Component, Input, OnInit} from '@angular/core';
import {Results} from '../../shared/model/results/results';
import {ResultsService} from '../../shared/services/results/results.service';
import {MinMax} from '../../shared/model/opioid/minMax';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'results-conversion-to',
  templateUrl: './results-conversion-to.component.html'
})
export class ResultsConversionToComponent implements OnInit {

  @Input() opioidInfoData: any;
  public results: Results;

  public metadonRealDailyDose: MinMax;
  public metadonRealDailyDoseReduced: MinMax;
  public metadonSingleDose: MinMax;
  public metadonSingleDoseReduced: MinMax;
  private metadonIndex = 7;

  constructor(public resultsService: ResultsService) { }

  ngOnInit(): void {
    this.results = this.resultsService.getResults();
    if (this.results.opioidToConvertToIndex === this.metadonIndex) {
      this.setMetadonRealDailyDose();
      this.setMetadonRealDailyDoseReduced();
      this.setMetadonSingleDose();
      this.setMetadonSingleDoseReduced();
    }
  }

  private setMetadonRealDailyDose(): void {
    this.metadonRealDailyDose = new MinMax(this.results.opioidToConvertToDoseRange.min / 2,
      this.results.opioidToConvertToDoseRange.max / 2);
  }

  private setMetadonRealDailyDoseReduced(): void {
    if (this.results.doseReduction > 0) {
      this.metadonRealDailyDoseReduced = new MinMax(this.results.opioidToConvertToReducedDoseRange.min / 2,
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
}
