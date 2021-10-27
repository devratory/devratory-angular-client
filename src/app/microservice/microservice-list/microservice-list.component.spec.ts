import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroserviceListComponent } from './microservice-list.component';

describe('MicroserviceListComponent', () => {
  let component: MicroserviceListComponent;
  let fixture: ComponentFixture<MicroserviceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicroserviceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroserviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
