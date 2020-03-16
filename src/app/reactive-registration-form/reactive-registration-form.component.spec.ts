import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveRegistrationFormComponent } from './reactive-registration-form.component';

describe('ReactiveRegistrationFormComponent', () => {
  let component: ReactiveRegistrationFormComponent;
  let fixture: ComponentFixture<ReactiveRegistrationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReactiveRegistrationFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
