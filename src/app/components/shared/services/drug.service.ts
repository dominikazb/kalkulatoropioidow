import {DrugModel} from '../model/drug.model';
import {DRUGS} from '../data/drug.database';

export class DrugService {

  private opioidDrugs: DrugModel[] = DRUGS;

  constructor() {
  }

  public listOfDrugs(): DrugModel[] {
    return this.opioidDrugs;
  }

  public listOfDrugsWithTransdermalPlasters(): DrugModel[] {
    this.opioidDrugs.push(
      new DrugModel(2, 'buprenorphineTransdermal', 'Buprenorfina (transdermalnie)', 75, 0, 0),
      new DrugModel(5, 'fentanylTransdermal', 'Fentanyl (transdermalnie)', 100, 0, 0)
    );
    this.opioidDrugs.sort((a, b) => a.index - b.index);

    return this.opioidDrugs;
  }
}
