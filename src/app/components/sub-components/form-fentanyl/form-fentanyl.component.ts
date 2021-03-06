import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'form-fentanyl',
  templateUrl: './form-fentanyl.component.html',
  styleUrls: ['./form-fentanyl.component.css']
})
export class FormFentanylComponent implements OnInit {

  @Input() parentFormGroup: FormGroup;
  public fentanylDoses: number[] = [0, 12, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300];
  public opioidForm: FormGroup;


  constructor() {
    this.opioidForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.opioidForm = new FormGroup({
      fentanylDose: new FormControl(null)
    });
  }

}
