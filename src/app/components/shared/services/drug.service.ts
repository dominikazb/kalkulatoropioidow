import {DrugModel} from '../model/drug.model';

export class DrugService {

  constructor() {
  }

  public createListOfDrugs(): DrugModel[] {
    const buprenorfinaTblPodjezykowe: DrugModel = new DrugModel(1, 'Buprenorfina (tbl. podjęzykowe, s.c., i.v., i.m.)', 75, 115);
    const dihydrokodeinaTabletki: DrugModel = new DrugModel(3, 'Dihydrokodeina (tbl. doustne)', 0.1, 0.1);
    const fentanylTabletki: DrugModel = new DrugModel(4, 'Fentanyl (tbl. podjęzykowe, spray donosowy, i.v.)', 100, 150);
    const kodeinaTabletki: DrugModel = new DrugModel(6, 'Kodeina (w składzie złożonych tbl. doustnych)', 0.1, 0.1);
    const metadon: DrugModel = new DrugModel(7, 'Metadon', 1, 1);
    const morfinaTabletki: DrugModel = new DrugModel(8, 'Morfina (tbl. doustne)', 1, 1);
    const morfinaSC_IV_IM: DrugModel = new DrugModel(9, 'Morfina (s.c., i.v., i.m.)', 2, 2);
    const oksykodon: DrugModel = new DrugModel(10, 'Oksykodon, chlorowodorek (tbl. doustne, i.v., s.c.)', 2, 2);
    const tapentadolTabletki: DrugModel = new DrugModel(11, 'Tapentadol', 0.3, 0.4);
    const tramadolTblLubKrople: DrugModel = new DrugModel(12, 'Tramadol (tbl. doustne lub krople)', 0.1, 0.2);
    const tramadolSC_IV: DrugModel = new DrugModel(13, 'Tramadol (s.c. lub i.v.)', 0.1, 0.1);
    const listOfOpioidDrugs: DrugModel[] = [];

    listOfOpioidDrugs.push(buprenorfinaTblPodjezykowe);
    listOfOpioidDrugs.push(dihydrokodeinaTabletki);
    listOfOpioidDrugs.push(fentanylTabletki);
    listOfOpioidDrugs.push(kodeinaTabletki);
    listOfOpioidDrugs.push(metadon);
    listOfOpioidDrugs.push(morfinaTabletki);
    listOfOpioidDrugs.push(morfinaSC_IV_IM);
    listOfOpioidDrugs.push(oksykodon);
    listOfOpioidDrugs.push(tapentadolTabletki);
    listOfOpioidDrugs.push(tramadolTblLubKrople);
    listOfOpioidDrugs.push(tramadolSC_IV);

    return listOfOpioidDrugs;
  }
}
