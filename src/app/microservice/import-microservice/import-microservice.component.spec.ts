import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportMicroserviceComponent } from './import-microservice.component';

describe('ImportMicroserviceComponent', () => {
  let component: ImportMicroserviceComponent;
  let fixture: ComponentFixture<ImportMicroserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportMicroserviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportMicroserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
