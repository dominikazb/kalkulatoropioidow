import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DrugService} from '../../shared/services/drug.service';
import {DrugModel} from '../../shared/model/drug.model';

@Component({
  selector: 'form-opioid',
  templateUrl: './form-opioid.component.html',
  styleUrls: ['./form-opioid.component.css']
})
export class FormOpioidComponent implements OnInit {

  @Input() parentFormGroup: FormGroup;
  public opioids: DrugModel[];
  public numberOfDoses: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public units: string[] = ['mg', 'μg'];
  public opioidForm: FormGroup;


  constructor(private drugService: DrugService) {
    this.opioidForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.opioids = this.drugService.createListOfDrugs();
    this.buildForm();
    this.addPlaceholdersForDoseInputField();
  }

  private buildForm(): void {
    this.opioidForm = new FormGroup({
      opioid: new FormControl('-- wybierz lek --'),
      opioidNumberOfDoses: new FormControl('razy/doba'),
      opioidDose: new FormControl(null),
      opioidUnit: new FormControl('mg')
    });
  }

  private addPlaceholdersForDoseInputField(): void {








      // $(document).ready(function () {
      //   document.getElementById("firstOpioidDose").placeholder = "dawka";
      //   document.getElementById("secondOpioidDose").placeholder = "dawka";
      //   document.getElementById("thirdOpioidDose").placeholder = "dawka";
      // });

  }

}
