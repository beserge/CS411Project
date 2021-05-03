import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { tap, first } from 'rxjs/operators'

export interface ChartDetails{
  'name': String,
  'value': number,
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  meals: ChartDetails[]=[]
  activeEntries: any[] = []
  fitness: ChartDetails[]=[]

  barflag: boolean = false
  piflag: boolean = false

  findItem(arr: ChartDetails[], name: String): number{
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]['name'] === name){
        return i
      }
    }
    return -1
  }

  constructor(private auth: AuthenticationService) {   
    //meal data
    this.auth.get_meal().pipe(tap((response: any) =>
    {
      console.log('meal res', (response))

      for (var i = 0; i < response.length; i++){
        var model = <ChartDetails>{}
        model.name=response[i]['name']
        model.value=response[i]['calories']


        let mealIndex = this.findItem(this.meals, model.name)
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
    }), first()).toPromise().then(() => { this.barflag = true })

    //fitness data
    this.auth.getworkout().pipe(tap((response: any) =>
    {
      console.log('fit res', response)

      for (var i = 0; i < response.length; i++){
        var model = <ChartDetails>{}
        model.name = (response[i]['isCycling'] ? 'Cycling' : 'Running')
        model.value = response[i]['duration']

        let fitIndex = this.findItem(this.fitness, model.name)
        if(fitIndex == -1){
          //meal doesn't exist yet
          this.fitness.push(model)
        }
        else{
          this.fitness[fitIndex]['value'] += model.value
        }
      }
      // for(var i=0; i < this.fitness.length; i++)
      // {
      //   this.activeEntries.push(this.fitness[i]['name'])
      // }
      console.log('fitness', this.fitness)  
    }), first()).toPromise().then(() => { this.piflag = true })
  }


}



