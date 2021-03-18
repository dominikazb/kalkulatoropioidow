import {Opioid} from '../../model/opioid/opioid';
import {OPIOIDS} from '../../data/opioid/opioids';
import {Results} from '../../model/results/results';
import {OpioidResults} from '../../model/results/opioid.results';

export class OpioidService {

  public getOpioid(index: number): Opioid {
    let opioid: Opioid = new Opioid(0, '', 0, 0, 0, 0);
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

  public oneOfOpioidsWasChosen(results: Results): boolean {
    return results.firstOpioid && this.opioidWasChosen(results.firstOpioid) ||
      results.secondOpioid && this.opioidWasChosen(results.secondOpioid) ||
      results.thirdOpioid && this.opioidWasChosen(results.thirdOpioid) ||
      results.fentanyl && this.plasterWasChosen(results.fentanyl) ||
      results.buprenorphine && this.plasterWasChosen(results.buprenorphine);
  }

  public opioidWasChosen(opioidResults: OpioidResults): boolean {
    return opioidResults.opioid.index !== 0 && opioidResults.numberOfDoses !== 0 && opioidResults.dose !== 0;
  }

  public plasterWasChosen(opioidResults: OpioidResults): boolean {
    return opioidResults.dose !== 0;
  }
}
