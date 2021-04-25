import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MiddleService } from '../service/middle.service';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent  {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  doSubmit(){
    let mail:any = document.getElementById("email")
    this.credentials.email = mail.value

    let pass:any = document.getElementById("pass")
    this.credentials.password = pass.value

    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/home');
    }, (err: any) => {
      console.error(err);
    }); 

    // let mail:any = document.getElementById("email")
    // let email = mail.value
    // console.log(email)

    // let pass:any = document.getElementById("pass")
    // let password = pass.value
    // console.log(password)
  }
}