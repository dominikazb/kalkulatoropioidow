import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-fentanyl',
  templateUrl: './form-fentanyl.component.html',
  styleUrls: ['./form-fentanyl.component.css']
})
export class FormFentanylComponent implements OnInit {

  // @ts-ignore
  @Input() parentFormGroup: FormGroup;
  public titleText = 'Fentanyl transdermalnie:';
  public fentanylDoses: number[] = [0, 12, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300];
  public opioidForm: FormGroup;
  public unit = 'μg/h';

  constructor() {
    this.opioidForm = new FormGroup({});
  }

  ngOnInit(): void {
  }


}
