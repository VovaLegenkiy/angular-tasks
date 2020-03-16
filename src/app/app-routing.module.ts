import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveRegistrationFormComponent } from './reactive-registration-form/reactive-registration-form.component';
import { NgModuleRegistrationFormComponent } from './ng-module-registration-form/ng-module-registration-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/ng-module-form', pathMatch: 'full' },
  { path: 'ng-module-form', component: NgModuleRegistrationFormComponent },
  { path: 'reactive-form', component: ReactiveRegistrationFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
