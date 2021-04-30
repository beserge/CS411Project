import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  providers: [AuthenticationService]
})
export class LogoutComponent implements OnInit {
    constructor(private auth: AuthenticationService, private router: Router) {}

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

        this.auth.logout()
    }
}