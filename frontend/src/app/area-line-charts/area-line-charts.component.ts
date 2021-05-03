import { Component, OnInit, Input  } from '@angular/core';
import { productSalesMulti } from './../dummydata/dummy';

export interface ChartDetails{
  'name': String,
  'value': number,
}

@Component({
  selector: 'app-area-line-charts',
  templateUrl: './area-line-charts.component.html',
  styleUrls: ['./area-line-charts.component.css']
})
export class AreaLineChartsComponent implements OnInit {

  @Input() macros: ChartDetails[]

  constructor() {
    Object.assign(this, { productSalesMulti });
  }

  productSalesMulti!: any;
  view: any = [700, 370];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Products';
  yAxisLabel: string = 'Sales';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };

  onSelect(event: any) {
    console.log(event);
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
