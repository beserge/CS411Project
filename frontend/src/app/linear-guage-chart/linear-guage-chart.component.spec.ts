import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearGuageChartComponent } from './linear-guage-chart.component';

describe('LinearGuageChartComponent', () => {
  let component: LinearGuageChartComponent;
  let fixture: ComponentFixture<LinearGuageChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinearGuageChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearGuageChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
