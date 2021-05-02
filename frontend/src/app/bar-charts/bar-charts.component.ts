import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MealComponent } from '../meal/meal.component';

export interface MealDetails{
  'name': String,
  'value': number
}

@Component({
  selector: 'app-bar-charts',
  templateUrl: './bar-charts.component.html',
  styleUrls: ['./bar-charts.component.css']
})
export class BarChartsComponent implements OnInit {

  view: any = [700, 370];

  // options
  legendTitle: string = 'Products';
  legendTitleMulti: string = 'Months';
  legendPosition: string = 'below'; // ['right', 'below']
  legend: boolean = true;

  xAxis: boolean = true;
  yAxis: boolean = true;

  yAxisLabel: string = 'Total Calories';
  xAxisLabel: string = 'Food';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  maxXAxisTickLength: number = 30;
  maxYAxisTickLength: number = 30;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;

  xAxisTicks: any = ['Genre 1', 'Genre 2', 'Genre 3', 'Genre 4', 'Genre 5', 'Genre 6', 'Genre 7']
  yAxisTicks: any = [100, 1000, 2000, 5000, 7000, 10000]

  animations: boolean = true; // animations on load

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  gradient: boolean = false;
  colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };
  schemeType: string = 'ordinal'; // 'ordinal' or 'linear'

  activeEntries: any[] = ['book']
  barPadding: number = 5
  tooltipDisabled: boolean = false;

  yScaleMax: number = 9000;

  roundEdges: boolean = false;

  constructor(private auth: AuthenticationService) { }

  meals: MealDetails[]=[]

  findItem(name: String): number{
    for (var i=0; i < this.meals.length; i++) {
      if (this.meals[i]['name'] === name){
        return i
      }
    }
    return -1
  }

  ngOnInit(): void {
    this.auth.get_meal().subscribe(
      (response: any)=>
      {
        console.log(response)

        for (var index in response){
          var model = <MealDetails>{}
          model.name=response[index]['name']
          model.value=response[index]['calories']

          let mealIndex = this.findItem(model.name)
          if(mealIndex == -1){
            //meal doesn't exist yet
            this.meals.push(model)
          }
          else{
            this.meals[mealIndex]['value'] += model.value
          }
        }
    })

    console.log('meals', this.meals)
    console.log('json meals', JSON.stringify(this.meals))
  }

  onSelect(event: any) {
    console.log(event);
  }

  onActivate(dummydata: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(dummydata)));
  }

  onDeactivate(dummydata: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(dummydata)));
  }

  formatString(input: string): string {
    return input.toUpperCase()
  }

  formatNumber(input: number): number {
    return input
  }
}

