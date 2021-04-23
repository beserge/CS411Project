import { Component, OnInit } from '@angular/core';
import { MiddleService } from '../service/middle.service';
import { Router } from '@angular/router';
import { FormsModule} from '@angular/forms';
@Component({
  selector: 'app-fitness',
  templateUrl: './fitness.component.html',
  styleUrls: ['./fitness.component.css']
})
export class FitnessComponent{
  constructor(private router: Router, private apiService: MiddleService) { }

  workouts:any= [];
  ngOnInit() {
   /* if(!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }*/
    alert("running")
    this.apiService.getWorkout()
      .subscribe( data => {
        this.workouts = data;
      });
  }
  deleteWorkout(workout: any): void {
    this.apiService.deleteWorkout(workout.id)
      .subscribe( data => {
        this.workouts = this.workouts.filter((u: any) => u !== workout);
      })
  };

  editWorkout(workout: any): void {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", workout.id.toString());
    this.router.navigate(['edit']);
  };

  addWorkout(): void {
    this.router.navigate(['add']);
  };
  
}
  


