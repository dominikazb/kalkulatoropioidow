import {FormControl, FormGroup} from '@angular/forms';

export class FormsService {

  public formOpioidFields: any = {
    index: '.index',
    numberOfDoses: '.numberOfDoses',
    dose: '.dose',
    unit: '.unit'
  };

  public formFentanylFields: any = {
    fentanylDose: 'fentanylDose'
  };

  public formBuprenorfineFields: any = {
    buprenorphineDose: 'buprenorphineDose'
  };

  public formConversionToFields: any = {
    opioidToCovertTo: 'opioidToCovertTo',
    doseReduction: 'doseReduction'
  };

  public fillFormOpioid(name: string): FormGroup {
    return new FormGroup({
      [name + this.formOpioidFields.index]: new FormControl(0),
      [name + this.formOpioidFields.numberOfDoses]: new FormControl('razy/doba'),
      [name + this.formOpioidFields.dose]: new FormControl(null),
      [name + this.formOpioidFields.unit]: new FormControl('mg')
    });
  }

  public fillFormFentanyl(): FormGroup {
    return new FormGroup({
      [this.formFentanylFields.fentanylDose]: new FormControl(0)
    });
  }

  public fillFormBuprenorphine(): FormGroup {
    return new FormGroup({
      [this.formBuprenorfineFields.buprenorphineDose]: new FormControl(0)
    });
  }

  public fillFormConversionTo(): FormGroup {
    return new FormGroup({
      [this.formConversionToFields.opioidToCovertTo]: new FormControl(0),
      [this.formConversionToFields.doseReduction]: new FormControl(0)
    });
  }
}
