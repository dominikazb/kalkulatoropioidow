import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DrugService} from '../../shared/services/drug.service';
import {DrugModel} from '../../shared/model/drug.model';
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
  public opioids: DrugModel[] = [];
  public numberOfDoses: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public units: string[] = ['mg', 'μg'];


  constructor(public formsService: FormsService,
              private drugService: DrugService) {
  }

  ngOnInit(): void {
    this.opioids = this.drugService.listOfDrugs();
  }
}
