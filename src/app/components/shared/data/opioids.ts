import {Opioid} from '../model/opioid';

export const OPIOIDS: Opioid[] = [
  new Opioid(1, 'Buprenorfina (tbl. podjęzykowe, s.c., i.v., i.m.)', 0, 75, 115, 4),
  new Opioid(2, 'Buprenorfina (transdermalnie)', 75, 0, 0, 140),
  new Opioid(3, 'Dihydrokodeina (tbl. doustne)', 0,  0.1, 0.1, 0),
  new Opioid(4, 'Fentanyl (tbl. podjęzykowe, spray donosowy, i.v.)', 0, 100, 150, 0),
  new Opioid(5, 'Fentanyl (transdermalnie)', 100, 0, 0, 0),
  new Opioid(6, 'Kodeina (w składzie złożonych tbl. doustnych)', 0, 0.1, 0.1, 0),
  new Opioid(7, 'Metadon', 0, 1, 1, 0),
  new Opioid(8, 'Morfina (tbl. doustne)', 0, 1, 1, 0),
  new Opioid(9, 'Morfina (s.c., i.v., i.m.)', 0, 2, 2, 0),
  new Opioid(10, 'Oksykodon, chlorowodorek (tbl. doustne, i.v., s.c.)', 0, 2, 2, 0),
  new Opioid(11, 'Tapentadol', 0, 0.3, 0.4, 0),
  new Opioid(12, 'Tramadol (tbl. doustne lub krople)', 0, 0.1, 0.2, 0),
  new Opioid(13, 'Tramadol (s.c. lub i.v.)', 0, 0.1, 0.1, 0)
];
