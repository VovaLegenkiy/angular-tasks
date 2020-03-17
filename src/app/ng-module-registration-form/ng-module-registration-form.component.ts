import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { formValidation } from '../template-validation';
import { Error } from '../error';
import { patterns } from '../patterns';

@Component({
  selector: 'app-ng-module-registration-form',
  templateUrl: './ng-module-registration-form.component.html',
  styleUrls: ['./ng-module-registration-form.component.css']
})
export class NgModuleRegistrationFormComponent implements OnInit {
  user: User = new User('', '', '', null, '', '', '');
  errors: Error = {};
  regExPatterns = patterns;

  constructor() {
  }

  ngOnInit(): void {

  }

  onSubmit({ form }) {
    this.errors = formValidation(form.controls);

    console.log(this.errors);
    console.log(form);
  }
}
