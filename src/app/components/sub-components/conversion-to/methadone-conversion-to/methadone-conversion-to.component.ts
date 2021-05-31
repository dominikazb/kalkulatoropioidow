import {Component, OnInit} from '@angular/core';
import {Results} from '../../../shared/model/results/results';
import {MinMax} from '../../../shared/model/opioid/minMax';
import {ResultsService} from '../../../shared/services/results/results.service';
import {OpioidIndices} from '../../../shared/data/opioid/OpioidIndices';
import {ContentService} from '../../../shared/services/content/content.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'methadone-conversion-to',
  templateUrl: './methadone-conversion-to.component.html'
})
export class MethadoneConversionToComponent implements OnInit {

  // TODO: change for content service (?)
  public results: Results;
  public methadoneProposedDailyDose: MinMax;
  public methadoneProposedDailyDoseReduced: MinMax;
  public methadoneSingleDose: MinMax;
  public methadoneSingleDoseReduced: MinMax;
  public opioidIndices = OpioidIndices;

  constructor(public contentService: ContentService,
              private resultsService: ResultsService) { }

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

  private setMethadoneSingleDose(): void {
    this.methadoneSingleDose = new MinMax(this.results.sumOfMorphineEquivalents.min / 30,
      this.results.opioidToConvertToDoseRange.max / 30);
  }

  private setMethadoneSingleDoseReduced(): void {
    if (this.results.doseReduction > 0) {
      const minReduced: number = this.results.sumOfMorphineEquivalents.min * (100 - this.results.doseReduction) / 100;
      const maxReduced: number = this.results.sumOfMorphineEquivalents.max * (100 - this.results.doseReduction) / 100;
      this.methadoneSingleDoseReduced = new MinMax(minReduced / 30, maxReduced / 30);
    }
  }
}
