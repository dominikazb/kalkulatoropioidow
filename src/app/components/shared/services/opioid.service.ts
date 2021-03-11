import {Opioid} from '../model/opioid';
import {OPIOIDS} from '../data/opioids';

export class OpioidService {

  public getOpioid(index: number): Opioid {
    let opioid: Opioid = new Opioid(0, '', '', 0, 0, 0, 0, 0, '');
    OPIOIDS.forEach(opioidFromList => {
      if (opioidFromList.index === index) {
        opioid = opioidFromList;
      }
    });
    return opioid;
  }

  public getBuprenorphine(): Opioid {
    return this.getOpioid(2);
  }

  public getFentanyl(): Opioid {
    return this.getOpioid(5);
  }

  public getOpioids(): Opioid[] {
    return OPIOIDS.sort((a, b) => a.index - b.index);
  }

  public getOpioidsWithoutPlasters(): Opioid[] {
    return OPIOIDS.filter(item => item.index !== 2 && item.index !== 5);
  }
}
