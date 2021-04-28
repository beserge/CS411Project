import { Component, OnInit } from '@angular/core';
import { MiddleService } from '../service/middle.service'
import { HttpClient } from '@angular/common/http';
import { AuthenticationService} from '../authentication.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MiddleService, AuthenticationService],
})

export class DashboardComponent implements OnInit{

  constructor(private service: MiddleService,
    private http: HttpClient) { }

  ngOnInit() {

    this.service.GetMeal().subscribe(
      (response: any)=>
      {
        console.log(response);
  })

  }
}

