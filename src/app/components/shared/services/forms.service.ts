import {FormControl, FormGroup} from '@angular/forms';

export class FormsService {

  public formOpioidFields: any = {
    name: '.name',
    numberOfDoses: '.numberOfDoses',
    dose: '.dose',
    unit: '.unit'
  };

  public fillFormOpioid(name: string): FormGroup {
    return new FormGroup({
      [name + this.formOpioidFields.name]: new FormControl('-- wybierz lek --'),
      [name + this.formOpioidFields.numberOfDoses]: new FormControl('razy/doba'),
      [name + this.formOpioidFields.dose]: new FormControl(null),
      [name + this.formOpioidFields.unit]: new FormControl('mg')
    });
  }
}
