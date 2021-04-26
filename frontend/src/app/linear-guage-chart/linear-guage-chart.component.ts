import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-linear-guage-chart',
  templateUrl: './linear-guage-chart.component.html',
  styleUrls: ['./linear-guage-chart.component.css']
})
export class LinearGuageChartComponent implements OnInit {

  single!: any;
  view: any = [400, 400];
  colorScheme = {
    domain: ['#aae3f5']
  };
  value: number = 43;
  previousValue: number = 70;
  units: string = 'counts';

  onSelect(event: any) {
    console.log(event);
  }

  ngOnInit(): void {
  }

}
