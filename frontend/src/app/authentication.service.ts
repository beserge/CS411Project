import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Config } from '../app/config/config';
export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

@Injectable()
export class AuthenticationService {
  private token: any = "";

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails | null {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get'|'delete', type: 'login'|'reg'|'fitness'|'meal', user?: TokenPayload, inputstring?: string): Observable<any> {
    let base;

    if (type==="login") {
      //post for login
      console.log('log_in running now')
      base = this.http.post(`http://localhost:3000/${type}`, user);
    } 
    else if (type==='reg'){
      //post for register
      console.log('reg is running now')
      base = this.http.post(`http://localhost:3000/${type}`, user);
    }
    else if (method === 'post') {
      //post for meal and fitness
      console.log('fitness or meal post is running now')
      base = this.http.post(`http://localhost:3000/${type}`, {body: inputstring}, { headers: { Authorization: `Bearer ${this.getToken()}`}});
    }
    else {
      console.log('getting something right now')
      base = this.http.get(`http://localhost:3000/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: any) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'reg', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public getworkout(): Observable<any> {
    return this.request('get','fitness');
  }
  public addworkout(workoutinfo:string): Observable<any> {
    return this.request('post','fitness',this.token,workoutinfo);
  }
  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  public delete_workout(woid:string): Observable <any> {
    return this.request('delete','fitness',this.token,woid)
  }

  public meal_post(mealinfo:string): Observable <any> {
    return this.request('post','meal',this.token,mealinfo)
  }

  doSubmit_regdata(wholedata:any): Observable<any> {
    let datastr = new URLSearchParams(wholedata).toString()
    console.log(Config.baseURL+Config.texturl_reg+datastr)
    return this.http.post(Config.baseURL+Config.texturl_reg+datastr,
      {observe:'body', responseType:'json'})
  }
  Submitcntext(foodinfo:any): Observable<any>  {
    return this.http.get(Config.baseURL+Config.texturl_search+foodinfo,
      {observe:'body', responseType:'json'})
  }

}
