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

  public glpharmaData: {1: any, 2: any, 3: any, 4: any, 5: any, 6: any, 7: any,
    8: any, 9: any, 10: any, 11: any, 12: any, 13: any, 14: any, 15: any, 16: any
  } = glpharmaContent;

  public opioidInfoData: {1: any, 2: any, 3: any, 4: any, 5: any, 6: any, 7: any,
    8: any, 9: any, 10: any, 11: any, 12: any, 13: any
  } = opioidInfoContent;

  public rescueDoseData: {1: any, 2: any, 3: any, 4: any, 5: any, 6: any, 7: any,
    8: any, 9: any, 10: any, 11: any, 12: any, 13: any
  } = rescueDoseContent;
}
