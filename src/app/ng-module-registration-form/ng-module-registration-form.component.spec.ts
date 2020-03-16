import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgModuleRegistrationFormComponent } from './ng-module-registration-form.component';

describe('NgModuleRegistrationFormComponent', () => {
  let component: NgModuleRegistrationFormComponent;
  let fixture: ComponentFixture<NgModuleRegistrationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgModuleRegistrationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgModuleRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
