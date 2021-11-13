import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportProjectButtonComponent } from './export-project-button.component';

describe('ExportProjectButtonComponent', () => {
  let component: ExportProjectButtonComponent;
  let fixture: ComponentFixture<ExportProjectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportProjectButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportProjectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
