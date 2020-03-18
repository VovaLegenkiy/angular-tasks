import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { getAge } from '../template-validation';
import { patterns } from '../patterns';

@Component({
  selector: 'app-reactive-registration-form',
  templateUrl: './reactive-registration-form.component.html',
  styleUrls: ['./reactive-registration-form.component.css']
})
export class ReactiveRegistrationFormComponent implements OnInit {

  reactiveForm: FormGroup;

  constructor() {
    this.reactiveForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required, Validators.pattern(patterns.name)]),
      'lastName': new FormControl('', [Validators.required, Validators.pattern(patterns.name)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phone': new FormControl(null, [Validators.required, Validators.pattern(patterns.phone)]),
      'birthday': new FormControl('', [Validators.required, this.birthdayValidator]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(patterns.password)]),
      'rePassword': new FormControl('', [Validators.required]),

    }, { updateOn: 'submit', validators: this.mustMatch });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.reactiveForm.markAllAsTouched();
    console.log(this.reactiveForm.controls);

  }

  birthdayValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      const age = getAge(control.value);

      return age < 18 ? { 'lessThenEighteen': true } : null
    }

    return null;
  }

  mustMatch(c: AbstractControl): { [s: string]: boolean } {

    const password = c.get('password');
    const rePassword = c.get('rePassword');

    if (password.value !== rePassword.value) {
      password.setErrors({ 'mismatch': true });
      rePassword.setErrors({ 'mismatch': true });
    } else {
      password.setErrors(null);
      rePassword.setErrors(null);
    }

    return null;
  }

  get firstName() { return this.reactiveForm.get('firstName') }
  get lastName() { return this.reactiveForm.get('lastName') }
  get email() { return this.reactiveForm.get('email') }
  get phone() { return this.reactiveForm.get('phone') }
  get birthday() { return this.reactiveForm.get('birthday') }
  get password() { return this.reactiveForm.get('password') }
  get rePassword() { return this.reactiveForm.get('rePassword') }
}
