import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { tap, first } from 'rxjs/operators'

export interface MealDetails{
  'name': String,
  'value': number,
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  meals: MealDetails[]=[]
  activeEntries: any[] = []

  findItem(name: String): number{
    for (var i=0; i < this.meals.length; i++) {
      if (this.meals[i]['name'] === name){
        return i
      }
    }
    return -1
  }

  constructor(private auth: AuthenticationService) {   
    this.auth.get_meal().pipe(tap((response: any) =>
    {
      console.log(response)

      for (var i = 0; i < response.length; i++){
        var model = <MealDetails>{}
        model.name=response[i]['name']
        model.value=response[i]['calories']


        let mealIndex = this.findItem(model.name)
        if(mealIndex == -1){
          //meal doesn't exist yet
          this.meals.push(model)
        }
        else{
          this.meals[mealIndex]['value'] += model.value
        }
      }
      for(var i=0; i < this.meals.length; i++)
      {
        this.activeEntries.push(this.meals[i]['name'])
      }
      console.log('active entries', this.activeEntries)
      console.log('meals', this.meals)  
    }), first()).toPromise().finally()

  }


}



