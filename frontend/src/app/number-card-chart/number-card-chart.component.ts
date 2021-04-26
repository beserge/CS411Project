import { Component, OnInit } from '@angular/core';
import { productSales } from '../dummydata/dummy'


@Component({
  selector: 'app-number-card-chart',
  templateUrl: './number-card-chart.component.html',
  styleUrls: ['./number-card-chart.component.css']
})
export class NumberCardChartComponent implements OnInit {

  productSales!: any;
  view: any = [700, 400];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#deaff0';

  constructor() {
    Object.assign(this, { productSales });
  }

  onSelect(event: any) {
    console.log(event);
  }

  ngOnInit(): void {
  }

}
