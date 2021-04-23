import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MiddleService } from '../service/middle.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  doSubmit(){
    let mail:any = document.getElementById("email")
    let email = mail.value
    console.log(email)

    let pass:any = document.getElementById("pass")
    let password = pass.value
    console.log(password)
  }
}