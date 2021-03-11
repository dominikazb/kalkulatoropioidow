import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Opioid} from '../../shared/model/opioid';
import {OpioidService} from '../../shared/services/opioid.service';
import {FormsService} from '../../shared/services/forms.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-conversion-to',
  templateUrl: './form-conversion-to.component.html'
})
export class FormConversionToComponent implements OnInit {

  // @ts-ignore
  @Input() parentFormGroup: FormGroup;
  public opioids: Opioid[] = [];
  public conversionToText = 'Konwersja na:';
  public doseReductionText = 'Redukcja dawki:';
  public doseReductionRange: number[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

  constructor(public formsService: FormsService,
              private drugService: OpioidService) { }

  ngOnInit(): void {
    this.opioids = this.drugService.getOpioids();
  }
}
