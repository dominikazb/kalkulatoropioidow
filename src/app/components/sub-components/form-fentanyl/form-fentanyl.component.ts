import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormsService} from '../../shared/services/form/forms.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'form-fentanyl',
  templateUrl: './form-fentanyl.component.html'
})
export class FormFentanylComponent {

  // @ts-ignore
  @Input() parentFormGroup: FormGroup;
  public titleText = 'Fentanyl transdermalnie:';
  public fentanylDoses: number[] = [0, 12, 25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300];
  public unit = 'μg/h';

  constructor(public formsService: FormsService) { }
}
