import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Config } from '../config/config';
@Injectable({
  providedIn: 'root'
})
export class MiddleService {
    constructor(private http: HttpClient) { }
  
    doSubmit(wholedata:any): Observable<any> {
      let datastr = new URLSearchParams(wholedata).toString()
      console.log(Config.baseURL+Config.texturl+datastr)
      return this.http.get(Config.baseURL+Config.texturl+datastr,
        {observe:'body', responseType:'json'})
    }
}

