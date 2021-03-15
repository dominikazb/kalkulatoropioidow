import {FormControl, FormGroup} from '@angular/forms';
import {ResultsService} from './results.service';
import {Results} from '../model/results';
import {Injectable} from '@angular/core';
import {Opioid} from '../model/opioid';

@Injectable()
export class FormsService {

  constructor(private results: ResultsService) {}

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

  public fillFormOpioid(name: string, opioid?: Opioid): FormGroup {
    if (opioid) {
      return this.fillForm(name, opioid.index, opioid.results.numberOfDoses, opioid.results.dose, opioid.results.unit);
    } else {
      return this.fillForm(name, 0, 0, 'dawka', 'mg');
    }
  }

  private fillForm(name: string, index: number, numberOfDoses: number, dose: any, unit: any): FormGroup {
    return new FormGroup({
      [name + this.formOpioidFields.index]: new FormControl(index),
      [name + this.formOpioidFields.numberOfDoses]: new FormControl(numberOfDoses),
      [name + this.formOpioidFields.dose]: new FormControl(dose),
      [name + this.formOpioidFields.unit]: new FormControl(unit)
    });
  }

  public fillFormFentanyl(results?: Results): FormGroup {
    return this.returnFormGroup(this.formFentanylFields.fentanylDose,
      results?.fentanyl.results.dose ? results.fentanyl.results.dose : 0);
  }

  public fillFormBuprenorphine(results?: Results): FormGroup {
      return this.returnFormGroup(this.formBuprenorfineFields.buprenorphineDose,
        results?.buprenorphine.results.dose ? results.buprenorphine.results.dose : 0);
    }

  private returnFormGroup(name: string, dose: number): FormGroup {
    return new FormGroup({[name]: new FormControl(dose)});
  }

  public fillFormConversionTo(results?: Results): FormGroup {
    return new FormGroup({
      [this.formConversionToFields.opioidToCovertTo]: new FormControl(
        results?.opioidToConvertTo.index ? results.opioidToConvertTo.index : 0
      ),
      [this.formConversionToFields.doseReduction]: new FormControl(
        results?.doseReduction ? results.doseReduction : 0
      )
    });
  }
}
