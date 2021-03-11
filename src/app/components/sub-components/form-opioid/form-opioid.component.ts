import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {OpioidService} from '../../shared/services/opioid.service';
import {Opioid} from '../../shared/model/opioid';
import {FormsService} from '../../shared/services/forms.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-opioid',
  templateUrl: './form-opioid.component.html'
})
export class FormOpioidComponent implements OnInit {

  @Input() name: string;
  // @ts-ignore
  @Input() parentFormGroup: FormGroup;
  public opioids: Opioid[] = [];
  public numberOfDoses: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public units: string[] = ['mg', 'μg'];


  constructor(public formsService: FormsService,
              private drugService: OpioidService) {
  }

  ngOnInit(): void {
    this.opioids = this.drugService.getOpioidsWithoutPlasters();
  }
}
