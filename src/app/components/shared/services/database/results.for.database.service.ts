import {ResultsForDatabase} from './results.for.database';
import {Results} from '../../model/results/results';

export class ResultsForDatabaseService {

  public setResultsForDatabase(results: Results): ResultsForDatabase {
    const resultsForDatabase: ResultsForDatabase = new ResultsForDatabase();

    this.setFirstOpioid(resultsForDatabase, results);
    this.setSecondOpioid(resultsForDatabase, results);
    this.setThirdOpioid(resultsForDatabase, results);
    this.setFentanylDailyDose(resultsForDatabase, results);
    this.setBuprenorphineDailyDose(resultsForDatabase, results);
    this.setOpioidToConvertTo(resultsForDatabase, results);
    this.setDoseReduction(resultsForDatabase, results);

    return resultsForDatabase;
  }

  private setFirstOpioid(resultsForDatabase: ResultsForDatabase, results: Results): void {
    if (results && results.firstOpioid.opioid.index !== 0) {
      resultsForDatabase.setFirstOpioid(results.firstOpioid.opioid.description, results.firstOpioid.dailyDose);
    } else {
      resultsForDatabase.setFirstOpioid('null', 0);
    }
  }

  private setSecondOpioid(resultsForDatabase: ResultsForDatabase, results: Results): void {
    if (results && results.secondOpioid.opioid.index !== 0) {
      resultsForDatabase.setSecondOpioid(results.secondOpioid.opioid.description, results.secondOpioid.dailyDose);
    } else {
      resultsForDatabase.setSecondOpioid('null', 0);
    }
  }

  private setThirdOpioid(resultsForDatabase: ResultsForDatabase, results: Results): void {
    if (results && results.thirdOpioid.opioid.index !== 0) {
      resultsForDatabase.setThirdOpioid(results.thirdOpioid.opioid.description, results.thirdOpioid.dailyDose);
    } else {
      resultsForDatabase.setThirdOpioid('null', 0);
    }
  }

  private setFentanylDailyDose(resultsForDatabase: ResultsForDatabase, results: Results): void {
    resultsForDatabase.setFentanylDailyDose(results.fentanyl.dailyDose !== 0 ? results.fentanyl.dailyDose : 0);
  }

  private setBuprenorphineDailyDose(resultsForDatabase: ResultsForDatabase, results: Results): void {
    resultsForDatabase.setBuprenorphineDailyDose(results.buprenorphine.dailyDose !== 0 ? results.buprenorphine.dailyDose : 0);
  }

  private setOpioidToConvertTo(resultsForDatabase: ResultsForDatabase, results: Results): void {
    if (results.opioidToConvertToIndex && !!Number.isNaN(results.opioidToConvertToIndex)) {
      if (results.opioidToConvertToIndex !== 0) {
        resultsForDatabase.setOpioidToConvertTo(results.opioidToConvertTo.description);
      }
    } else {
      resultsForDatabase.setOpioidToConvertTo('null');
    }
  }

  private setDoseReduction(resultsForDatabase: ResultsForDatabase, results: Results): void {
    if (results.doseReduction && !Number.isNaN(results.doseReduction)) {
      if (results.doseReduction !== 0) {
        resultsForDatabase.setDoseReduction(results.doseReduction);
      }
    } else {
      resultsForDatabase.setDoseReduction(0);
    }
  }
}
