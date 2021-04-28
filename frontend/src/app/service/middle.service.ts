import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Config } from '../config/config';
import { AuthenticationService } from '../authentication.service'

@Injectable({
  providedIn: 'root'
})
export class MiddleService {
    constructor(private http: HttpClient, private auth: AuthenticationService) { }
  
    doSubmit(wholedata:any): Observable<any> {
      let datastr = new URLSearchParams(wholedata).toString()
      console.log(Config.baseURL+Config.texturl_reg+datastr)
      return this.http.post(Config.baseURL+Config.texturl_reg+datastr,
        {observe:'body', responseType:'json'})
    }
    Submitmeal(foodinfo:any): Observable<any>  {
      return this.http.get(Config.baseURL+Config.texturl_search+foodinfo,
        {observe:'body', responseType:'json'})
    }
    GetMeal(): Observable<any>  {
      return this.http.get(Config.baseURL+Config.texturl_meal,
        {observe:'body', responseType:'json', headers: { Authorization: `Bearer ${this.auth.getToken()}` }})
    }
    Back_meal(nuinfo:any): Observable<any>  {
      return this.http.post(Config.baseURL+Config.texturl_meal+nuinfo,
        {observe:'body', responseType:'text'})
    }


    Add_workout(inputstring:any){
      return this.http.post(Config.baseURL+'fitness?'+inputstring,
      {observe:'body', responseType:'text'})
    }
    
    getWorkout(){
      return this.http.get(Config.baseURL+'fitness',
      {observe:'body', responseType:'text'})
    }
    deleteWorkout(id:any){return this.http.delete(Config.baseURL+'fitness',
    {observe:'body', responseType:'text'})
    }

    editWorkout(value:any){return this.http.post(Config.baseURL+'createurl',
    {observe:'body', responseType:'text'})
   }

}
