import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';

import { Spark } from './spark';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8',
  })
};

@Injectable()
export class SparkService {
  sparkUrl = 'http://kenai.cs.colostate.edu:11777/synopsis';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('SparkService');
  }

  postSpark (spark: string): Observable<string> {
    return this.http.post<string>(this.sparkUrl, spark, httpOptions)
      .pipe(
        catchError(this.handleError('postSpark', spark))
      );
  }

}
