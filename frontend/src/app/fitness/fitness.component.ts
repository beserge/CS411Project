import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service'
import  {Router } from '@angular/router';
export interface WorkoutDetails{
  id: string;
  starttime: string;
  date: string;
  type1: string;
  type2: string;
  duration: number;
}


@Component({
  selector: 'app-fitness',
  providers: [AuthenticationService],
  templateUrl: './fitness.component.html',
  styleUrls: ['./fitness.component.css']
})
export class FitnessComponent implements OnInit {
  workouts: WorkoutDetails[]=[]
  constructor(private router: Router, private auth: AuthenticationService) { }

  ngOnInit(): void {
    if(!this.auth.isLoggedIn()){
      this.router.navigate(['login']);
    }
    this.auth.getworkout()
      .subscribe( data => {
        for(var index in data){
          var model = <WorkoutDetails>{};
          model.id=data[index]['_id']
          model.starttime=data[index]['time']
          model.duration = data[index]['duration']
          model.date=JSON.stringify(data[index]['year'])+"/"+JSON.stringify(data[index]['month'])+"/"+JSON.stringify(data[index]['day'])
          if(data[index]['isCycling']==true){
            model.type1="Cycling"
          }
          else{model.type1="Running"}
          if(data[index]['isOutdoor']==true){
            model.type2='Outdoor'
          }
          else{model.type2='Indoor'}
          this.workouts.push(model)
      }
      });

  }
  addWorkout(){
    this.router.navigate(['add']);
  }

  deleteWorkout(workoutid:string){
    this.auth.delete_workout(workoutid);
    window.location.reload();
  }
}
