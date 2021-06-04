import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ResultsForDatabase} from './results.for.database';
import {Injectable} from '@angular/core';

@Injectable()
export class DatabaseService {

  // TODO: change this URL when ready
  public url = 'http://localhost:8080/opioid-results';

  defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  defaultOptions = {headers: this.defaultHeaders};

  constructor(private http: HttpClient) {}

  public saveDataToDatabase(resultsForDatabase: ResultsForDatabase): Promise<any> {
    return this.http.post(this.url, resultsForDatabase, this.defaultOptions).toPromise();
  }
}
