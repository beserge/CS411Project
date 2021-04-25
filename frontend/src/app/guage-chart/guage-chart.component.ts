import { Component, OnInit } from '@angular/core';
import { productSales } from '../dummydata/dummy'

@Component({
  selector: 'app-guage-chart',
  templateUrl: './guage-chart.component.html',
  styleUrls: ['./guage-chart.component.css']
})
export class GuageChartComponent implements OnInit {

  productSales!: any;
  view: any = [500, 400];
  legend: boolean = true;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
    Object.assign(this, { productSales });
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
