import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent  implements OnInit{
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  ngOnInit(){
    //hide the sidebar
      let sb_opened_dom = document.getElementById("sb_opened")
      let sb_button_dom = document.getElementById("sb_button")
      
      if(sb_opened_dom){
        sb_opened_dom.hidden = true
      }
      if(sb_button_dom){
        sb_button_dom.hidden = true
      }
  }

  constructor(private auth: AuthenticationService, private router: Router) {}

  doSubmit(){
    let mail:any = document.getElementById("email")
    this.credentials.email = mail.value

    let pass:any = document.getElementById("pass")
    this.credentials.password = pass.value

    this.auth.login(this.credentials).subscribe(() => {
      window.location.href = "http://localhost:4200/dashboard";
    }, (err: any) => {
      console.error(err);
    }); 

  }
}