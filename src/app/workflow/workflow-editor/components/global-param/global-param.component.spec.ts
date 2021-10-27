import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalParamComponent } from './global-param.component';

describe('GlobalParamComponent', () => {
  let component: GlobalParamComponent;
  let fixture: ComponentFixture<GlobalParamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalParamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
