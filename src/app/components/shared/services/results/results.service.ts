import {Injectable} from '@angular/core';
import {Results} from '../../model/results/results';

@Injectable()
export class ResultsService {

  public results: Results;

  public getResults(): Results {
    return this.results;
  }

  public setResults(results: Results): void {
    this.results = results;
  }
}
