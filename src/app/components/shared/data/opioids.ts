import {Opioid} from '../model/opioid';

export const OPIOIDS: Opioid[] = [
  new Opioid(1, 'buprenorfinaTblPodjezykowe', 'Buprenorfina (tbl. podjęzykowe, s.c., i.v., i.m.)', 0, 75, 115, 0, 0, ''),
  new Opioid(2, 'buprenorphineTransdermal', 'Buprenorfina (transdermalnie)', 75, 0, 0, 0, 0, ''),
  new Opioid(3, 'dihydrokodeinaTab letki', 'Dihydrokodeina (tbl. doustne)', 0,  0.1, 0.1, 0, 0, ''),
  new Opioid(4, 'fentanylTabletki', 'Fentanyl (tbl. podjęzykowe, spray donosowy, i.v.)', 0, 100, 150, 0, 0, ''),
  new Opioid(5, 'fentanylTransdermal', 'Fentanyl (transdermalnie)', 100, 0, 0, 0, 0, ''),
  new Opioid(6, 'kodeinaTabletki', 'Kodeina (w składzie złożonych tbl. doustnych)', 0, 0.1, 0.1, 0, 0, ''),
  new Opioid(7, 'metadon', 'Metadon', 0, 1, 1, 0, 0, ''),
  new Opioid(8, 'morfinaTabletki', 'Morfina (tbl. doustne)', 0, 1, 1, 0, 0, ''),
  new Opioid(9, 'morfinaSC_IV_IM', 'Morfina (s.c., i.v., i.m.)', 0, 2, 2, 0, 0, ''),
  new Opioid(10, 'oksykodon', 'Oksykodon, chlorowodorek (tbl. doustne, i.v., s.c.)', 0, 2, 2, 0, 0, ''),
  new Opioid(11, 'tapentadolTabletki', 'Tapentadol', 0, 0.3, 0.4, 0, 0, ''),
  new Opioid(12, 'tramadolTblLubKrople', 'Tramadol (tbl. doustne lub krople)', 0, 0.1, 0.2, 0, 0, ''),
  new Opioid(13, 'tramadolSC_IV', 'Tramadol (s.c. lub i.v.)', 0, 0.1, 0.1, 0, 0, ''),
];
