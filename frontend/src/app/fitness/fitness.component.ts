import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service'
import  {Router } from '@angular/router';


@Component({
  selector: 'app-fitness',
  providers: [AuthenticationService],
  templateUrl: './fitness.component.html',
  styleUrls: ['./fitness.component.css']
})
export class FitnessComponent implements OnInit {
  public workouts=[]
  constructor(private router: Router, private auth: AuthenticationService) { }

  ngOnInit(): void {
    /*
    if(!window.localStorage.getItem('token')){
      this.router.navigate(['login']);
      return;
    }*/
    this.auth.getworkout()
      .subscribe( data => {
        console.log(data);
      });
  }
  addWorkout(){
    this.router.navigate(['add']);
  }
  editWorkout(w:any){
    this.router.navigate(['edit'])
  }
  deleteWorkout(w:any){
    this.auth.delete_workout(w);
    this.auth.getworkout()
      .subscribe( data => {
        console.log(data);
      });
  }
}
