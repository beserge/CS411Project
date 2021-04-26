import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaLineChartsComponent } from './area-line-charts.component';

describe('AreaLineChartsComponent', () => {
  let component: AreaLineChartsComponent;
  let fixture: ComponentFixture<AreaLineChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaLineChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaLineChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
