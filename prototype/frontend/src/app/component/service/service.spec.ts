import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Service } from './service';

describe('ServiceComponent', () => {
  let component: Service;
  let fixture: ComponentFixture<Service>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Service ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Service);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
