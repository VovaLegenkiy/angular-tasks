import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { formValidation } from '../validation';
@Component({
  selector: 'app-ng-module-registration-form',
  templateUrl: './ng-module-registration-form.component.html',
  styleUrls: ['./ng-module-registration-form.component.css']
})
export class NgModuleRegistrationFormComponent implements OnInit {
  user: User = new User('', '', '', null, '', '', '');
  errors = {};

  constructor() {
  }

  ngOnInit(): void {

  }

  onSubmit({ form }) {
    this.errors = formValidation(form.controls);
    console.log(form);
  }
}
