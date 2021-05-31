import glpharmaContent from '../../data/opioid/glpharmaContent.json';
import resultsContent from '../../data/textContent/resultsContent.json';
import opioidInfoContent from '../../data/opioid/opioidInfoContent.json';
import applicationContent from '../../data/textContent/applicationContent.json';
import rescueDoseContent from '../../data/opioid/rescueDoseContent.json';
import {Injectable} from '@angular/core';
import infoModalContent from '../../data/textContent/infoModalContent.json';

@Injectable()
export class ContentService {

  public infoModalData: {
    title: string,
    text1: string,
    consent1: string,
    consent2a: string,
    consent2link: string,
    consent2b: string,
    consent2c: string,
    consent2d: string,
    subTitle1: string,
    text2: string,
    owner1: string,
    owner2: string,
    owner3: string,
    owner4: string,
    owner5: string,
    owner6: string,
    text3: string,
    subTitle2: string,
    text4: string,
    text5: string,
    text6: string,
    text7: string,
    text8: string,
    subTitle3: string,
    text9: string,
    subTitle4: string,
    text10: string,
    btnText: string
  } = infoModalContent;

  public applicationData: {
    title: string,
    addAnotherText: string,
    fentanylText: string,
    buprenorphineText: string,
    conversionFromText: string,
    optionallyText: string,
    btnResetText: string,
    kidneyCheckbox: string,
    btnCalculateText: string
  } = applicationContent;

  public resultsTextData: {
    resultsText: string,
    opioidText: string,
    dailyDoseText: string,
    morphineEquivalentText: string,
    goBackText: string,
    noResultsText: string,
    contactText: string,
    warningText: string,
    contactTextInfo: string,
    kidneyFailureText: string
  } = resultsContent;

  public glpharmaData: {
    1: { index: string, name: string },
    2: { index: string, name: string, text1: string },
    3: { index: string, name: string },
    4: { index: string, name: string },
    5: { index: string, name: string, text1: string, text2: string, text3: string, text4: string },
    6: { index: string, name: string },
    7: { index: string, name: string },
    8: { index: string, name: string },
    9: { index: string, name: string },
    10: { index: string, name: string, text1: string, text2: string, text3: string },
    11: { index: string, name: string },
    12: { index: string, name: string },
    13: { index: string, name: string },
    14: { text1: string, text2: string, text3: string },
    15: { text: string }
    16: { buprenorphineLink: string, oxydolorLink: string, oxydolorFastLink: string, oxylaxonLink: string }
  } = glpharmaContent;

  public opioidInfoData: {
    1: { index: string, name: string, text1: string, text2: string, text3: string, text4: string, text5: string,
         doseCanBeExceeded: boolean, doseLimit: number, doseLimitUnit: string, warning: string },
    2: { index: string, name: string, text1: string, text2: string, text3: string, text4: string, text5: string,
         doseCanBeExceeded: boolean, doseLimit: number, doseLimitUnit: string, warning: string },
    3: { index: string, name: string, text1: string, text2: string, text3: string, text4: string, text5: string,
      doseCanBeExceeded: boolean, doseLimit: number, doseLimitUnit: string, warning: string },
    4: { index: string, name: string, text1: string, text2: string, text3: string, text4: string, text5: string,
         doseCanBeExceeded: boolean, doseLimit: number, doseLimitUnit: string, warning: string },
    5: { index: string, name: string, text1: string, text2: string, text3: string, text4: string, text5: string,
         index6: string, index7: string, index8: string, index9: string, index10: string, index11: string,
         index12: string, index13: string, index14: string, index15: string, index16: string, index17: string,
         doseCanBeExceeded: boolean, doseLimit: number, doseLimitUnit: string, warning: string },
    6: { index: string, name: string, text1: string, text2: string, text3: string, text4: string, text5: string,
         doseCanBeExceeded: boolean, doseLimit: number, doseLimitUnit: string, warning: string },
    7: { index: string, name: string, text1: string, text2: string, text3: string, text4: string, text5: string,
         text6: string, text7: string, text8: string, text9: string, text10: string, doseCanBeExceeded: boolean,
         doseLimit: number, doseLimitUnit: string, warning: string, methadoneDoseText1: string ,
         methadoneDoseText2: string, methadoneDoseText3: string, methadoneDoseText4: string},
    8: { index: string, name: string, text1: string, text2: string, text3: string, text4: string, text5: string,
         doseCanBeExceeded: boolean, doseLimit: number, doseLimitUnit: string, warning: string },
    9: { index: string, name: string, text1: string, text2: string, text3: string, text4: string, text5: string,
         doseCanBeExceeded: boolean, doseLimit: number, doseLimitUnit: string, warning: string },
    10: { index: string, name: string, text1: string, text2: string, text3: string, text4: string, text5: string,
          doseCanBeExceeded: boolean, doseLimit: number, doseLimitUnit: string, warning: string },
    11: { index: string, name: string, text1: string, text2: string, text3: string, text4: string, text5: string,
          doseCanBeExceeded: boolean, doseLimit: number, doseLimitUnit: string, warning: string },
    12: { index: string, name: string, text1: string, text2: string, text3: string, text4: string, text5: string,
          doseCanBeExceeded: boolean, doseLimit: number, doseLimitUnit: string, warning: string },
    13: { index: string, name: string, text1: string, text2: string, text3: string, text4: string, text5: string,
          doseCanBeExceeded: boolean, doseLimit: number, doseLimitUnit: string, warning: string },
  } = opioidInfoContent;

  public rescueDoseData: {
    1: { index: string, name: string, text1: string },
    2: { index: string, name: string, text1: string },
    3: { index: string, name: string, text1: string },
    4: { index: string, name: string, text1: string, text2: string },
    5: { index: string, name: string, text1: string, text2: string },
    6: { index: string, name: string, text1: string },
    7: { index: string, name: string, text1: string },
    8: { index: string, name: string, text1: string, text2: string, text3: string },
    9: { index: string, name: string, text1: string, text2: string, text3: string },
    10: { index: string, name: string, text1: string, text2: string, text3: string, text4: string },
    11: { index: string, name: string, text1: string },
    12: { index: string, name: string, text1: string, text2: string },
    13: { index: string, name: string, text1: string, text2: string }
  } = rescueDoseContent;
}
