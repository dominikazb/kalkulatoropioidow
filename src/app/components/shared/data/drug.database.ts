import {DrugModel} from '../model/drug.model';

export const DRUGS: DrugModel[] = [
  new DrugModel(1, 'buprenorfinaTblPodjezykowe', 'Buprenorfina (tbl. podjęzykowe, s.c., i.v., i.m.)', 0, 75, 115),
  new DrugModel(3, 'dihydrokodeinaTab letki', 'Dihydrokodeina (tbl. doustne)', 0,  0.1, 0.1),
  new DrugModel(4, 'fentanylTabletki', 'Fentanyl (tbl. podjęzykowe, spray donosowy, i.v.)', 0, 100, 150),
  new DrugModel(6, 'kodeinaTabletki', 'Kodeina (w składzie złożonych tbl. doustnych)', 0, 0.1, 0.1),
  new DrugModel(7, 'metadon', 'Metadon', 0, 1, 1),
  new DrugModel(8, 'morfinaTabletki', 'Morfina (tbl. doustne)', 0, 1, 1),
  new DrugModel(9, 'morfinaSC_IV_IM', 'Morfina (s.c., i.v., i.m.)', 0, 2, 2),
  new DrugModel(10, 'oksykodon', 'Oksykodon, chlorowodorek (tbl. doustne, i.v., s.c.)', 0, 2, 2),
  new DrugModel(11, 'tapentadolTabletki', 'Tapentadol', 0, 0.3, 0.4),
  new DrugModel(12, 'tramadolTblLubKrople', 'Tramadol (tbl. doustne lub krople)', 0, 0.1, 0.2),
  new DrugModel(13, 'tramadolSC_IV', 'Tramadol (s.c. lub i.v.)', 0, 0.1, 0.1),
];
