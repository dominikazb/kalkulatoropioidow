import {Component, Input, OnInit} from '@angular/core';
import {Results} from '../../../shared/model/results/results';
import {MinMax} from '../../../shared/model/opioid/minMax';
import {ResultsService} from '../../../shared/services/results/results.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'methadone-conversion-to',
  templateUrl: './methadone-conversion-to.component.html'
})
export class MethadoneConversionToComponent implements OnInit {

  @Input() opioidInfoData: any;
  @Input() methadoneIndex: number;

  public results: Results;
  public methadoneProposedDailyDose: MinMax;
  public methadoneProposedDailyDoseReduced: MinMax;
  public methadoneSingleDose: MinMax;
  public methadoneSingleDoseReduced: MinMax;

  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.results = this.resultsService.results;
    this.setMethadoneProposedDailyDose();
    this.setMethadoneProposedDailyDoseReduced();
    this.setMethadoneSingleDose();
    this.setMethadoneSingleDoseReduced();
  }

  private setMethadoneProposedDailyDose(): void {
    this.methadoneProposedDailyDose = new MinMax(this.results.opioidToConvertToDoseRange.min / 2,
      this.results.opioidToConvertToDoseRange.max / 2);
  }

  private setMethadoneProposedDailyDoseReduced(): void {
    if (this.results.doseReduction > 0) {
      this.methadoneProposedDailyDoseReduced = new MinMax(this.results.opioidToConvertToReducedDoseRange.min / 2,
        this.results.opioidToConvertToReducedDoseRange.max / 2);
    }
  }

  // TODO: sprawdzić czy tu ma być podzielone opioidToConvertToDoseRange/30 czy ekwiwalent morfiny/30 ?
  private setMethadoneSingleDose(): void {
    this.methadoneSingleDose = new MinMax(this.results.opioidToConvertToDoseRange.min / 30,
      this.results.opioidToConvertToDoseRange.max / 30);
  }

  private setMethadoneSingleDoseReduced(): void {
    if (this.results.doseReduction > 0) {
      this.methadoneSingleDoseReduced = new MinMax(this.results.opioidToConvertToReducedDoseRange.min / 30,
        this.results.opioidToConvertToReducedDoseRange.max / 30);
    }
  }
}
