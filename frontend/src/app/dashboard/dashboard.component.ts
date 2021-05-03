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
  macros: ChartDetails[]=[]

  barflag: boolean = false
  piflag: boolean = false
  lineflag: boolean = false

  findItem(arr: ChartDetails[], name: String): number{
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]['name'] === name){
        return i
      }
    }
    return -1
  }

  //this code badly needs refactoring!
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
      console.log('fitness', this.fitness)  
    }), first()).toPromise().then(() => { this.piflag = true })

    //macronutrient data
    this.auth.get_meal().pipe(tap((response: any) =>
    {
      console.log('macro res', (response))

      //set up all the macros
      this.macros.push({ name: 'Carbs', value: 0 })
      this.macros.push({ name: 'Proteins', value: 0 })
      this.macros.push({ name: 'Fats', value: 0 })

      for (var i = 0; i < response.length; i++){
        let macroIndex = this.findItem(this.macros, 'Carbs')
        this.macros[macroIndex]['value'] += response[i]['carbohydrates_total_g']

        macroIndex = this.findItem(this.macros, 'Proteins')
        this.macros[macroIndex]['value'] += response[i]['protein_g']

        macroIndex = this.findItem(this.macros, 'Fats')
        this.macros[macroIndex]['value'] += response[i]['fat_total_g']
      }
      console.log('macros', this.macros)  
    }), first()).toPromise().then(() => { this.lineflag = true })
  }


}



