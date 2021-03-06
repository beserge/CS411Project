import { Component, OnInit, Input } from '@angular/core';

export interface ChartDetails{
  'name': String,
  'value': number,
}
@Component({
  selector: 'app-guage-chart',
  templateUrl: './guage-chart.component.html',
  styleUrls: ['./guage-chart.component.css']
})
export class GuageChartComponent implements OnInit {

  @Input() macros: ChartDetails[]


  view: any = [500, 400];
  legend: boolean = true;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
  }

  onSelect(dummydata: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(dummydata)));
  }

  onActivate(dummydata: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(dummydata)));
  }

  onDeactivate(dummydata: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(dummydata)));
  }

  ngOnInit(): void {
  }

}
