@Controller
public class HomeController {


  @PostMapping("/")
  public String goResults(@ModelAttribute("drugsResult") DrugsResult drugsResult, Model model) {



    // buprenorfinaTblPodjezykowe
    if(opioidToConvertTo.equals("Buprenorfina (tbl. podjęzykowe, s.c., i.v., i.m.)")) {
      showResultsAfterCalulation = "yes";
      resultsOpioidName = "buprenorfinaTabletki";
      opioidEquivalentDoseRange = new MinMax(sumOfMorphineEquivalents.getMin()/115, sumOfMorphineEquivalents.getMax()/75);


      String buprenorfinaTblGreaterThan4mg = "nie";
      if(opioidEquivalentDoseRange.getMin() > 4 || opioidEquivalentDoseRange.getMax() > 4) {
        buprenorfinaTblGreaterThan4mg = "tak";
      }

      if(doseReduction > 0) {
        doseReduction_drug = "buprenorfina_reduced";
        opioidEquivalentDoseRangeAfterReduction = new MinMax(opioidEquivalentDoseRange.getMin() * (100-doseReduction)/100,
          opioidEquivalentDoseRange.getMax() * (100-doseReduction)/100);

        if(opioidEquivalentDoseRangeAfterReduction.getMin() > 4 || opioidEquivalentDoseRangeAfterReduction.getMax() > 4) {
          buprenorfinaTblGreaterThan4mg = "tak";
        } else {
          buprenorfinaTblGreaterThan4mg = "nie";
        }


        model.addAttribute("doseReduction", doseReduction);
        model.addAttribute("doseReduction_drug", doseReduction_drug);
        model.addAttribute("opioidEquivalentDoseRangeAfterReduction", opioidEquivalentDoseRangeAfterReduction);
      }


      model.addAttribute("buprenorfinaTblGreaterThan4mg", buprenorfinaTblGreaterThan4mg);
      model.addAttribute("resultsOpioidName", resultsOpioidName);
      model.addAttribute("opioidEquivalentDoseRange", opioidEquivalentDoseRange);
    }


    //dihydrokodeinaTabletki
    if(opioidToConvertTo.equals("Dihydrokodeina (tbl. doustne)")) {
      showResultsAfterCalulation = "yes";
      resultsOpioidName = "dihydrokodeinaTabletki";
      opioidEquivalentDoseRange = new MinMax(sumOfMorphineEquivalents.getMin()/0.1,
        sumOfMorphineEquivalents.getMax()/0.1);

      String dihydrokodeinaTblGreaterThan240mg = "nie";
      if(opioidEquivalentDoseRange.getMin() > 240 || opioidEquivalentDoseRange.getMax() > 240) {
        dihydrokodeinaTblGreaterThan240mg = "tak";
      }

      if(doseReduction > 0) {
        doseReduction_drug = "dihydrokodeina_reduced";
        opioidEquivalentDoseRangeAfterReduction = new MinMax(opioidEquivalentDoseRange.getMin() * (100-doseReduction)/100,
          opioidEquivalentDoseRange.getMax() * (100-doseReduction)/100);

        if(opioidEquivalentDoseRangeAfterReduction.getMin() > 240 || opioidEquivalentDoseRangeAfterReduction.getMax() > 240) {
          dihydrokodeinaTblGreaterThan240mg = "tak";
        } else {
          dihydrokodeinaTblGreaterThan240mg = "nie";
        }


        model.addAttribute("doseReduction", doseReduction);
        model.addAttribute("doseReduction_drug", doseReduction_drug);
        model.addAttribute("opioidEquivalentDoseRangeAfterReduction", opioidEquivalentDoseRangeAfterReduction);
      }


      model.addAttribute("dihydrokodeinaTblGreaterThan240mg", dihydrokodeinaTblGreaterThan240mg);
      model.addAttribute("resultsOpioidName", resultsOpioidName);
      model.addAttribute("opioidEquivalentDoseRange", opioidEquivalentDoseRange);
    }

    //fentanylTabletki
    if(opioidToConvertTo.equals("Fentanyl (tbl. podjęzykowe, spray donosowy, i.v.)")) {
      resultsOpioidName = "fentanylTabletki";
      opioidEquivalentDoseRange = new MinMax(sumOfMorphineEquivalents.getMin()/100,
        sumOfMorphineEquivalents.getMax()/150);

      if(doseReduction > 0) {
        doseReduction_drug = "fentanyl_tbl_reduced";
        opioidEquivalentDoseRangeAfterReduction = new MinMax(opioidEquivalentDoseRange.getMin() * (100-doseReduction)/100,
          opioidEquivalentDoseRange.getMax() * (100-doseReduction)/100);
        model.addAttribute("doseReduction", doseReduction);
        model.addAttribute("doseReduction_drug", doseReduction_drug);
        model.addAttribute("opioidEquivalentDoseRangeAfterReduction", opioidEquivalentDoseRangeAfterReduction);

      }

      model.addAttribute("resultsOpioidName", resultsOpioidName);
      model.addAttribute("opioidEquivalentDoseRange", opioidEquivalentDoseRange);
    }


    //kodeinaTabletki
    if(opioidToConvertTo.equals("Kodeina (w składzie złożonych tbl. doustnych)")) {
      showResultsAfterCalulation = "yes";
      resultsOpioidName = "kodeinaTabletki";
      opioidEquivalentDoseRange = new MinMax(sumOfMorphineEquivalents.getMin()/0.1,
        sumOfMorphineEquivalents.getMax()/0.1);

      String kodeinaTblGreaterThan240mg = "nie";
      if(opioidEquivalentDoseRange.getMin() > 240 || opioidEquivalentDoseRange.getMax() > 240) {
        kodeinaTblGreaterThan240mg = "tak";
      }

      if(doseReduction > 0) {
        doseReduction_drug = "kodeina_reduced";
        opioidEquivalentDoseRangeAfterReduction = new MinMax(opioidEquivalentDoseRange.getMin() * (100-doseReduction)/100,
          opioidEquivalentDoseRange.getMax() * (100-doseReduction)/100);


        if(opioidEquivalentDoseRangeAfterReduction.getMin() > 240 || opioidEquivalentDoseRangeAfterReduction.getMax() > 240) {
          kodeinaTblGreaterThan240mg = "tak";
        } else {
          kodeinaTblGreaterThan240mg = "nie";
        }


        model.addAttribute("doseReduction", doseReduction);
        model.addAttribute("doseReduction_drug", doseReduction_drug);
        model.addAttribute("opioidEquivalentDoseRangeAfterReduction", opioidEquivalentDoseRangeAfterReduction);
      }


      model.addAttribute("kodeinaTblGreaterThan240mg", kodeinaTblGreaterThan240mg);
      model.addAttribute("resultsOpioidName", resultsOpioidName);
      model.addAttribute("opioidEquivalentDoseRange", opioidEquivalentDoseRange);
    }


    //metadon
    if(opioidToConvertTo.equals("Metadon")) {
      showResultsAfterCalulation = "yes";
      resultsOpioidName = "metadonTabletki";
      model.addAttribute("resultsOpioidName", resultsOpioidName);

      //dawka dzienna
      double minimalNumber = 0;
      double maximalNumber = 0;

      if(sumOfMorphineEquivalents.getMin() >= 0 &&
        sumOfMorphineEquivalents.getMin() <= 100) {
        minimalNumber = sumOfMorphineEquivalents.getMin()/4;
      } else if (sumOfMorphineEquivalents.getMin() >= 101 &&
        sumOfMorphineEquivalents.getMin() <= 300) {
        minimalNumber = sumOfMorphineEquivalents.getMin()/6;
      } else if (sumOfMorphineEquivalents.getMin() >= 301 &&
        sumOfMorphineEquivalents.getMin() <= 1000) {
        minimalNumber = sumOfMorphineEquivalents.getMin()/12;
      } else if (sumOfMorphineEquivalents.getMin() >= 1001) {
        minimalNumber = sumOfMorphineEquivalents.getMin()/20;
      }

      if(sumOfMorphineEquivalents.getMax() >= 0 &&
        sumOfMorphineEquivalents.getMax() <= 100) {
        maximalNumber = sumOfMorphineEquivalents.getMax()/4;
      } else if (sumOfMorphineEquivalents.getMax() >= 101 &&
        sumOfMorphineEquivalents.getMax() <= 300) {
        maximalNumber = sumOfMorphineEquivalents.getMax()/6;
      } else if (sumOfMorphineEquivalents.getMax() >= 301 &&
        sumOfMorphineEquivalents.getMax() <= 1000) {
        maximalNumber = sumOfMorphineEquivalents.getMax()/12;
      } else if (sumOfMorphineEquivalents.getMax() >= 1001) {
        maximalNumber = sumOfMorphineEquivalents.getMax()/20;
      }

      opioidEquivalentDoseRange = new MinMax(minimalNumber, maximalNumber);

      if(doseReduction > 0) {
        doseReduction_drug = "metadon_reduced";
        opioidEquivalentDoseRangeAfterReduction = new MinMax(opioidEquivalentDoseRange.getMin() * (100-doseReduction)/100,
          opioidEquivalentDoseRange.getMax() * (100-doseReduction)/100);
        model.addAttribute("doseReduction", doseReduction);
        model.addAttribute("doseReduction_drug", doseReduction_drug);
        model.addAttribute("opioidEquivalentDoseRangeAfterReduction", opioidEquivalentDoseRangeAfterReduction);
      }



      //metadon should be administered every 12 hours, so the daily dose above should be divided in 2
      double firstMetadonDose = minimalNumber/2;
      double secondMetadonDose = maximalNumber/2;
      MinMax administeredMetadonDoseEvery12Hours = new MinMax(firstMetadonDose, secondMetadonDose);
      MinMax administeredMetadonDoseEvery12HoursAfterReduction;

      String dawkaMetadonuGreaterThan30mg = "nie";
      if(firstMetadonDose > 30 || secondMetadonDose > 30) {
        dawkaMetadonuGreaterThan30mg = "tak";
      }

      if(doseReduction > 0) {
        administeredMetadonDoseEvery12HoursAfterReduction =
          new MinMax(administeredMetadonDoseEvery12Hours.getMin() * (100-doseReduction)/100,
            administeredMetadonDoseEvery12Hours.getMax() * (100-doseReduction)/100);

        if(administeredMetadonDoseEvery12HoursAfterReduction.getMin() > 30 || administeredMetadonDoseEvery12HoursAfterReduction.getMax() > 30) {
          dawkaMetadonuGreaterThan30mg = "tak";
        } else {
          dawkaMetadonuGreaterThan30mg = "nie";
        }

        model.addAttribute("doseReduction", doseReduction);
        model.addAttribute("administeredMetadonDoseEvery12HoursAfterReduction", administeredMetadonDoseEvery12HoursAfterReduction);
      }





      //dawka doraźna
      MinMax metadonDawkaDorazna = new MinMax(sumOfMorphineEquivalents.getMin()/30,
        sumOfMorphineEquivalents.getMax()/30);
      MinMax metadonDawkaDoraznaAfterReduction;


      String dawkaDoraznaGreaterThan30mg = "nie";
      if(metadonDawkaDorazna.getMin() > 30 || metadonDawkaDorazna.getMax() > 30) {
        dawkaDoraznaGreaterThan30mg = "tak";
      }

      String metadondoraznie;
      if(doseReduction > 0) {
        metadondoraznie = "metadon_doraznie_reduced";
        metadonDawkaDoraznaAfterReduction = new MinMax(metadonDawkaDorazna.getMin() * (100-doseReduction)/100,
          metadonDawkaDorazna.getMax() * (100-doseReduction)/100);


        if(metadonDawkaDoraznaAfterReduction.getMin() > 30 || metadonDawkaDoraznaAfterReduction.getMax() > 30) {
          dawkaDoraznaGreaterThan30mg = "tak";
        } else {
          dawkaDoraznaGreaterThan30mg = "nie";
        }


        model.addAttribute("doseReduction", doseReduction);
        model.addAttribute("metadondoraznie", metadondoraznie);
        model.addAttribute("metadonDawkaDoraznaAfterReduction", metadonDawkaDoraznaAfterReduction);
      }


      model.addAttribute("administeredMetadonDoseEvery12Hours", administeredMetadonDoseEvery12Hours);
      model.addAttribute("dawkaMetadonuGreaterThan30mg", dawkaMetadonuGreaterThan30mg);
      model.addAttribute("opioidEquivalentDoseRange", opioidEquivalentDoseRange);
      model.addAttribute("dawkaDoraznaGreaterThan30mg", dawkaDoraznaGreaterThan30mg);
      model.addAttribute("metadonDawkaDorazna", metadonDawkaDorazna);
    }



    //morfinaTabletki
    if(opioidToConvertTo.equals("Morfina (tbl. doustne)")) {
      showResultsAfterCalulation = "yes";
      resultsOpioidName = "morfinaTabletki";
      opioidEquivalentDoseRange = new MinMax(sumOfMorphineEquivalents.getMin()/1,
        sumOfMorphineEquivalents.getMax()/1);

      if(doseReduction > 0) {
        doseReduction_drug = "morfina_reduced";
        opioidEquivalentDoseRangeAfterReduction = new MinMax(opioidEquivalentDoseRange.getMin() * (100-doseReduction)/100,
          opioidEquivalentDoseRange.getMax() * (100-doseReduction)/100);
        model.addAttribute("doseReduction", doseReduction);
        model.addAttribute("doseReduction_drug", doseReduction_drug);
        model.addAttribute("opioidEquivalentDoseRangeAfterReduction", opioidEquivalentDoseRangeAfterReduction);
      }

      model.addAttribute("resultsOpioidName", resultsOpioidName);
      model.addAttribute("opioidEquivalentDoseRange", opioidEquivalentDoseRange);
    }


    //morfinaSC_IV_IM
    if(opioidToConvertTo.equals("Morfina (s.c., i.v., i.m.)")) {
      showResultsAfterCalulation = "yes";
      resultsOpioidName = "morfinaSC_IV_IM";
      opioidEquivalentDoseRange = new MinMax(sumOfMorphineEquivalents.getMin()/2,
        sumOfMorphineEquivalents.getMax()/2);

      if(doseReduction > 0) {
        doseReduction_drug = "morfina_SC_IV_reduced";
        opioidEquivalentDoseRangeAfterReduction = new MinMax(opioidEquivalentDoseRange.getMin() * (100-doseReduction)/100,
          opioidEquivalentDoseRange.getMax() * (100-doseReduction)/100);
        model.addAttribute("doseReduction", doseReduction);
        model.addAttribute("doseReduction_drug", doseReduction_drug);
        model.addAttribute("opioidEquivalentDoseRangeAfterReduction", opioidEquivalentDoseRangeAfterReduction);
      }


      model.addAttribute("resultsOpioidName", resultsOpioidName);
      model.addAttribute("opioidEquivalentDoseRange", opioidEquivalentDoseRange);
    }



    //oksykodon - chlorowodorek contains 90% of oxycodon
    if(opioidToConvertTo.equals("Oksykodon, chlorowodorek (tbl. doustne, i.v., s.c.)")) {
      showResultsAfterCalulation = "yes";
      resultsOpioidName = "oksykodonTabletki";
      MinMax opioidEquivalentDoseRangeTemp = new MinMax(sumOfMorphineEquivalents.getMin()/2,
        sumOfMorphineEquivalents.getMax()/2); // TODO: czemu tu jest 2 (????)  WHAAAAT????
      opioidEquivalentDoseRange = new MinMax(opioidEquivalentDoseRangeTemp.getMin() * 10/9,
        opioidEquivalentDoseRangeTemp.getMax() * 10/9);

      if(doseReduction > 0) {
        doseReduction_drug = "oksykodon_reduced";
        opioidEquivalentDoseRangeAfterReduction = new MinMax(opioidEquivalentDoseRange.getMin() * (100-doseReduction)/100,
          opioidEquivalentDoseRange.getMax() * (100-doseReduction)/100);
        model.addAttribute("doseReduction", doseReduction);
        model.addAttribute("doseReduction_drug", doseReduction_drug);
        model.addAttribute("opioidEquivalentDoseRangeAfterReduction", opioidEquivalentDoseRangeAfterReduction);
      }

      model.addAttribute("resultsOpioidName", resultsOpioidName);
      model.addAttribute("opioidEquivalentDoseRange", opioidEquivalentDoseRange);
    }



    //tapentadolTabletki
    if(opioidToConvertTo.equals("Tapentadol")) {
      showResultsAfterCalulation = "yes";
      resultsOpioidName = "tapentadolTabletki";
      opioidEquivalentDoseRange = new MinMax(sumOfMorphineEquivalents.getMin()/0.4,
        sumOfMorphineEquivalents.getMax()/0.4);

      String tapentadolTblGreaterThan500mg = "nie";
      if(opioidEquivalentDoseRange.getMin() > 500 || opioidEquivalentDoseRange.getMax() > 500) {
        tapentadolTblGreaterThan500mg = "tak";
      }

      if(doseReduction > 0) {
        doseReduction_drug = "tapentadol_reduced";
        opioidEquivalentDoseRangeAfterReduction = new MinMax(opioidEquivalentDoseRange.getMin() * (100-doseReduction)/100,
          opioidEquivalentDoseRange.getMax() * (100-doseReduction)/100);


        if(opioidEquivalentDoseRangeAfterReduction.getMin() > 500 || opioidEquivalentDoseRangeAfterReduction.getMax() > 500) {
          tapentadolTblGreaterThan500mg = "tak";
        } else {
          tapentadolTblGreaterThan500mg = "nie";
        }

        model.addAttribute("doseReduction", doseReduction);
        model.addAttribute("doseReduction_drug", doseReduction_drug);
        model.addAttribute("opioidEquivalentDoseRangeAfterReduction", opioidEquivalentDoseRangeAfterReduction);
      }


      model.addAttribute("tapentadolTblGreaterThan500mg", tapentadolTblGreaterThan500mg);
      model.addAttribute("resultsOpioidName", resultsOpioidName);
      model.addAttribute("opioidEquivalentDoseRange", opioidEquivalentDoseRange);
    }


    //tramadolTblLubKrople
    if(opioidToConvertTo.equals("Tramadol (tbl. doustne lub krople)")) {
      showResultsAfterCalulation = "yes";
      resultsOpioidName = "tramadolTabletki";
      opioidEquivalentDoseRange = new MinMax(sumOfMorphineEquivalents.getMin()/0.2,
        sumOfMorphineEquivalents.getMax()/0.1);

      String tramadolDoseGreaterThan400mg = "nie";
      if(opioidEquivalentDoseRange.getMin() > 400 || opioidEquivalentDoseRange.getMax() > 400) {
        tramadolDoseGreaterThan400mg = "tak";
      }

      if(doseReduction > 0) {
        doseReduction_drug = "tramadol_tbl_reduced";
        opioidEquivalentDoseRangeAfterReduction = new MinMax(opioidEquivalentDoseRange.getMin() * (100-doseReduction)/100,
          opioidEquivalentDoseRange.getMax() * (100-doseReduction)/100);

        if(opioidEquivalentDoseRangeAfterReduction.getMin() > 400 || opioidEquivalentDoseRangeAfterReduction.getMax() > 400) {
          tramadolDoseGreaterThan400mg = "tak";
        } else {
          tramadolDoseGreaterThan400mg = "nie";
        }


        model.addAttribute("doseReduction", doseReduction);
        model.addAttribute("doseReduction_drug", doseReduction_drug);
        model.addAttribute("opioidEquivalentDoseRangeAfterReduction", opioidEquivalentDoseRangeAfterReduction);
      }



      model.addAttribute("tramadolDoseGreaterThan400mg", tramadolDoseGreaterThan400mg);
      model.addAttribute("resultsOpioidName", resultsOpioidName);
      model.addAttribute("opioidEquivalentDoseRange", opioidEquivalentDoseRange);
    }


    //tramadolSC_IV
    if(opioidToConvertTo.equals("Tramadol (s.c. lub i.v.)")) {
      showResultsAfterCalulation = "yes";
      resultsOpioidName = "tramadolSC_IV";
      opioidEquivalentDoseRange = new MinMax(sumOfMorphineEquivalents.getMin()/0.1,
        sumOfMorphineEquivalents.getMax()/0.1);

      String tramadolIV_SC_DoseGreaterThan400mg = "nie";
      if(opioidEquivalentDoseRange.getMin() > 400 || opioidEquivalentDoseRange.getMax() > 400) {
        tramadolIV_SC_DoseGreaterThan400mg = "tak";
      }

      if(doseReduction > 0) {
        doseReduction_drug = "tramadol_SC_IV_reduced";
        opioidEquivalentDoseRangeAfterReduction = new MinMax(opioidEquivalentDoseRange.getMin() * (100-doseReduction)/100,
          opioidEquivalentDoseRange.getMax() * (100-doseReduction)/100);



        if(opioidEquivalentDoseRangeAfterReduction.getMin() > 400 || opioidEquivalentDoseRangeAfterReduction.getMax() > 400) {
          tramadolIV_SC_DoseGreaterThan400mg = "tak";
        } else {
          tramadolIV_SC_DoseGreaterThan400mg = "nie";

        }


        model.addAttribute("doseReduction", doseReduction);
        model.addAttribute("doseReduction_drug", doseReduction_drug);
        model.addAttribute("opioidEquivalentDoseRangeAfterReduction", opioidEquivalentDoseRangeAfterReduction);
      }


      model.addAttribute("tramadolIV_SC_DoseGreaterThan400mg", tramadolIV_SC_DoseGreaterThan400mg);
      model.addAttribute("resultsOpioidName", resultsOpioidName);
      model.addAttribute("opioidEquivalentDoseRange", opioidEquivalentDoseRange);
    }






    if(opioidToConvertTo.equals("Fentanyl (transdermalnie)")) {
      showResultsAfterCalulation = "yes";

      double minimalNumber = 0;
      double maximalNumber = 0;
      String fentanlyPlastryDoseGreaterThan300ugPerHour = "nie";

      if(sumOfMorphineEquivalents.getMin() >= 0 && sumOfMorphineEquivalents.getMin() <= 44) {
        resultsOpioidName = "fentanylTransdermalnie";
        minimalNumber = 12;
      } else if(sumOfMorphineEquivalents.getMin() >= 45 && sumOfMorphineEquivalents.getMin() <= 89) {
        listOfSuggestedFentanylPlasters.add("Plaster: 25 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        minimalNumber = 25;
      } else if(sumOfMorphineEquivalents.getMin() >= 90 && sumOfMorphineEquivalents.getMin() <= 149 ) {
        listOfSuggestedFentanylPlasters.add("Plaster: 50 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        minimalNumber = 50;
      } else if(sumOfMorphineEquivalents.getMin() >= 150 && sumOfMorphineEquivalents.getMin() <= 209) {
        listOfSuggestedFentanylPlasters.add("Plaster: 75 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        minimalNumber = 75;
      } else if(sumOfMorphineEquivalents.getMin() >= 210 && sumOfMorphineEquivalents.getMin() <= 269) {
        listOfSuggestedFentanylPlasters.add("Plaster: 100 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        minimalNumber =  100;
      } else if(sumOfMorphineEquivalents.getMin() >= 270 && sumOfMorphineEquivalents.getMin() <= 329) {
        listOfSuggestedFentanylPlasters.add("Plaster: 25 μg/h + 100 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        minimalNumber = 125;
      } else if(sumOfMorphineEquivalents.getMin() >= 330 && sumOfMorphineEquivalents.getMin() <= 389) {
        listOfSuggestedFentanylPlasters.add("Plaster: 50 μg/h + 100 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        minimalNumber =  150;
      } else if(sumOfMorphineEquivalents.getMin() >= 390 && sumOfMorphineEquivalents.getMin() <= 449) {
        listOfSuggestedFentanylPlasters.add("Plaster: 75 μg/h + 100 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        minimalNumber = 175;
      } else if(sumOfMorphineEquivalents.getMin() >= 450 && sumOfMorphineEquivalents.getMin() <= 509) {
        listOfSuggestedFentanylPlasters.add("Plaster: 2 x 100 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        minimalNumber = 200;
      } else if(sumOfMorphineEquivalents.getMin() >= 510 && sumOfMorphineEquivalents.getMin() <= 569) {
        listOfSuggestedFentanylPlasters.add("Plaster: 2 x 100 μg/h + 25 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        minimalNumber = 225;
      } else if(sumOfMorphineEquivalents.getMin() >= 570 && sumOfMorphineEquivalents.getMin() <= 629) {
        listOfSuggestedFentanylPlasters.add("Plaster: 2 x 100 μg/h + 50 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        minimalNumber = 250;
      } else if(sumOfMorphineEquivalents.getMin() >= 630 && sumOfMorphineEquivalents.getMin() <= 689) {
        listOfSuggestedFentanylPlasters.add("Plaster: 2 x 100 μg/h + 75 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        minimalNumber = 275;
      } else if(sumOfMorphineEquivalents.getMin() >= 690 && sumOfMorphineEquivalents.getMin() <= 749) {
        listOfSuggestedFentanylPlasters.add("Plaster: 3 x 100 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        minimalNumber = 300;
      } else if(sumOfMorphineEquivalents.getMin() >= 750) {
        minimalNumber = sumOfMorphineEquivalents.getMin()/150 /24 * 1000;
        if(minimalNumber <= 300) {
          listOfSuggestedFentanylPlasters.add("Plaster: 3 x 100 μg/h");
        }
        fentanlyPlastryDoseGreaterThan300ugPerHour = "tak";
        resultsOpioidName = "fentanylTransdermalnie";
      }


      if(sumOfMorphineEquivalents.getMax() >= 0 && sumOfMorphineEquivalents.getMax() <= 44) {
        resultsOpioidName = "fentanylTransdermalnie";
        maximalNumber = 12;
      } else if(sumOfMorphineEquivalents.getMax() >= 45 && sumOfMorphineEquivalents.getMax() <= 89) {
        listOfSuggestedFentanylPlasters.add("Plaster: 25 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        maximalNumber = 25;
      } else if(sumOfMorphineEquivalents.getMax() >= 90 && sumOfMorphineEquivalents.getMax() <= 149 ) {
        listOfSuggestedFentanylPlasters.add("Plaster: 50 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        maximalNumber = 50;
      } else if(sumOfMorphineEquivalents.getMax() >= 150 && sumOfMorphineEquivalents.getMax() <= 209) {
        listOfSuggestedFentanylPlasters.add("Plaster: 75 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        maximalNumber = 75;
      } else if(sumOfMorphineEquivalents.getMax() >= 210 && sumOfMorphineEquivalents.getMax() <= 269) {
        listOfSuggestedFentanylPlasters.add("Plaster: 100 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        maximalNumber = 100;
      } else if(sumOfMorphineEquivalents.getMax() >= 270 && sumOfMorphineEquivalents.getMax() <= 329) {
        listOfSuggestedFentanylPlasters.add("Plaster: 25 μg/h + 100 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        maximalNumber = 125;
      } else if(sumOfMorphineEquivalents.getMax() >= 330 && sumOfMorphineEquivalents.getMax() <= 389) {
        listOfSuggestedFentanylPlasters.add("Plaster: 50 μg/h + 100 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        maximalNumber = 150;
      } else if(sumOfMorphineEquivalents.getMax() >= 390 && sumOfMorphineEquivalents.getMax() <= 449) {
        listOfSuggestedFentanylPlasters.add("Plaster: 75 μg/h + 100 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        maximalNumber = 175;
      } else if(sumOfMorphineEquivalents.getMax() >= 450 && sumOfMorphineEquivalents.getMax() <= 509) {
        listOfSuggestedFentanylPlasters.add("Plaster: 2 x 100 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        maximalNumber = 200;
      } else if(sumOfMorphineEquivalents.getMax() >= 510 && sumOfMorphineEquivalents.getMax() <= 569) {
        listOfSuggestedFentanylPlasters.add("Plaster: 2 x 100 μg/h + 25 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        maximalNumber = 225;
      } else if(sumOfMorphineEquivalents.getMax() >= 570 && sumOfMorphineEquivalents.getMax() <= 629) {
        listOfSuggestedFentanylPlasters.add("Plaster: 2 x 100 μg/h + 50 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        maximalNumber = 250;
      } else if(sumOfMorphineEquivalents.getMax() >= 630 && sumOfMorphineEquivalents.getMax() <= 689) {
        listOfSuggestedFentanylPlasters.add("Plaster: 2 x 100 μg/h + 75 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        maximalNumber = 275;
      } else if(sumOfMorphineEquivalents.getMax() >= 690 && sumOfMorphineEquivalents.getMax() <= 749) {
        listOfSuggestedFentanylPlasters.add("Plaster: 3 x 100 μg/h");
        resultsOpioidName = "fentanylTransdermalnie";
        maximalNumber = 300;
      } else if(sumOfMorphineEquivalents.getMax() >= 750) {
        maximalNumber = sumOfMorphineEquivalents.getMax()/100  /24 * 1000;
        fentanlyPlastryDoseGreaterThan300ugPerHour = "tak";
        resultsOpioidName = "fentanylTransdermalnie";
        if(maximalNumber <= 300) {
          listOfSuggestedFentanylPlasters.add("Plaster: 3 x 100 μg/h");
        }
      }
      opioidEquivalentDoseRange = new MinMax(minimalNumber, maximalNumber);


      //remove duplicate plasters from the list
      List<String> listOfSuggestedFentanylPlastersWithoutDuplicates = new ArrayList<>(
        new HashSet<>(listOfSuggestedFentanylPlasters));
      Collections.sort(listOfSuggestedFentanylPlastersWithoutDuplicates);





      // ======= dose reduction =======
      Map<Double, String> listOfSuggestedFentanylPlastersAfterReduction = new TreeMap<>();
      if(doseReduction > 0) {
        listOfSuggestedFentanylPlastersWithoutDuplicates = new ArrayList<>();
        doseReduction_drug = "fentanyl_transdermalnie_reduced";
        opioidEquivalentDoseRangeAfterReduction = new MinMax(opioidEquivalentDoseRange.getMin() * (100-doseReduction)/100,
          opioidEquivalentDoseRange.getMax() * (100-doseReduction)/100);

        if(opioidEquivalentDoseRangeAfterReduction.getMin() > 300 || opioidEquivalentDoseRangeAfterReduction.getMax() > 300) {
          fentanlyPlastryDoseGreaterThan300ugPerHour = "tak";
        } else {
          fentanlyPlastryDoseGreaterThan300ugPerHour = "nie";
          resultsOpioidName = "fentanylTransdermalnie";
        }

        model.addAttribute("doseReduction", doseReduction);
        model.addAttribute("doseReduction_drug", doseReduction_drug);
        model.addAttribute("opioidEquivalentDoseRangeAfterReduction", opioidEquivalentDoseRangeAfterReduction);
        listOfSuggestedFentanylPlastersAfterReduction =
          calculations.showWhichFentanylPlastersShouldBeShown(opioidEquivalentDoseRangeAfterReduction);
      }

      model.addAttribute("listOfSuggestedFentanylPlastersAfterReduction",
        listOfSuggestedFentanylPlastersAfterReduction);
      model.addAttribute("listOfSuggestedFentanylPlastersWithoutDuplicates",
        listOfSuggestedFentanylPlastersWithoutDuplicates);
      model.addAttribute("fentanlyPlastryDoseGreaterThan300ugPerHour",
        fentanlyPlastryDoseGreaterThan300ugPerHour);
      model.addAttribute("resultsOpioidName", resultsOpioidName);
      model.addAttribute("opioidEquivalentDoseRange", opioidEquivalentDoseRange);



    }

    if(opioidToConvertTo.equals("Buprenorfina (transdermalnie)")) {
      showResultsAfterCalulation = "yes";
      resultsOpioidName = "buprenorfinaTransdermalnie";
      double bupronerfinaEquivalentMIN = sumOfMorphineEquivalents.getMin()/115 / 24 * 1000;
      double bupronerfinaEquivalentMAX = sumOfMorphineEquivalents.getMax()/75 / 24 * 1000;
      opioidEquivalentDoseRange = new MinMax(bupronerfinaEquivalentMIN, bupronerfinaEquivalentMAX);
      Map<Double, String> listOfSuggestedBuprenorfinaPlastersWithoutDuplicates =
        calculations.showWhichBuprenorfinaPlastersShouldBeShown(opioidEquivalentDoseRange);

      String buprenorfinaPlastryDoseGreaterThan300ugPerHour = "nie";
      if(opioidEquivalentDoseRange.getMin() > 140 || opioidEquivalentDoseRange.getMax() > 140) {
        buprenorfinaPlastryDoseGreaterThan300ugPerHour = "tak";
        listOfSuggestedBuprenorfinaPlastersWithoutDuplicates = new HashMap<>();
      }


      Map<Double, String> listOfPlastersForReducedDoseOfBuprenorfina = new TreeMap<>();
      if(doseReduction > 0) {
        doseReduction_drug = "buprenorfina_transdermalnie_reduced";
        listOfSuggestedBuprenorfinaPlastersWithoutDuplicates = new TreeMap<>();
        opioidEquivalentDoseRangeAfterReduction = new MinMax(opioidEquivalentDoseRange.getMin() * (100-doseReduction)/100,
          opioidEquivalentDoseRange.getMax() * (100-doseReduction)/100);

        if(opioidEquivalentDoseRangeAfterReduction.getMin() > 140 || opioidEquivalentDoseRangeAfterReduction.getMax() > 140) {
          buprenorfinaPlastryDoseGreaterThan300ugPerHour = "tak";
        } else {
          buprenorfinaPlastryDoseGreaterThan300ugPerHour = "nie";
        }

        model.addAttribute("doseReduction", doseReduction);
        model.addAttribute("doseReduction_drug", doseReduction_drug);
        model.addAttribute("opioidEquivalentDoseRangeAfterReduction", opioidEquivalentDoseRangeAfterReduction);


        listOfPlastersForReducedDoseOfBuprenorfina =
          calculations.showWhichBuprenorfinaPlastersShouldBeShown(opioidEquivalentDoseRangeAfterReduction);
      }



      model.addAttribute("listOfPlastersForReducedDoseOfBuprenorfina",
        listOfPlastersForReducedDoseOfBuprenorfina);
      model.addAttribute("listOfSuggestedBuprenorfinaPlastersWithoutDuplicates",
        listOfSuggestedBuprenorfinaPlastersWithoutDuplicates);
      model.addAttribute("buprenorfinaPlastryDoseGreaterThan300ugPerHour",
        buprenorfinaPlastryDoseGreaterThan300ugPerHour);
      model.addAttribute("resultsOpioidName", resultsOpioidName);
      model.addAttribute("opioidEquivalentDoseRange", opioidEquivalentDoseRange);

    }



    model.addAttribute("showResultsAfterCalulation", showResultsAfterCalulation);
    model.addAttribute("drugsResults", drugsResult);

    return "results";
  }




}
