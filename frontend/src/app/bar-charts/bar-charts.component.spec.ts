import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartsComponent } from './bar-charts.component';

describe('BarChartsComponent', () => {
  let component: BarChartsComponent;
  let fixture: ComponentFixture<BarChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
