
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Config } from '../config/Config';
import { FoodComponent } from '../food/food.component';
@Injectable({
  providedIn: "root"
})
export class Service {

  constructor(private http: HttpClient) { }

  doSubmit(fn:any): Observable<any> {
    console.log(Config.baseURL+Config.texturl+fn)
    return this.http.get(Config.baseURL+Config.texturl+fn,
      {observe:'body', responseType:'json'})
  }
}
