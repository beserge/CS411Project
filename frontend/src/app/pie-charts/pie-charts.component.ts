import { Component, OnInit } from '@angular/core';
import { productSales, productSalesMulti } from '../dummydata/dummy';

@Component({
  selector: 'app-pie-charts',
  templateUrl: './pie-charts.component.html',
  styleUrls: ['./pie-charts.component.css']
})
export class PieChartsComponent implements OnInit {

  productSales!: any;
  productSalesMulti!: any;

  view: any = [700, 370];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  gradient: boolean = false;
  isDoughnut: boolean = true;

  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };

  constructor() { Object.assign(this, { productSales, productSalesMulti }) }

  ngOnInit(): void {
  }

  onActivate(dummydata: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(dummydata)));
  }

  onDeactivate(dummydata: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(dummydata)));
  }

  onSelect(dummydata: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(dummydata)));
  }
}
