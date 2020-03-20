import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveRegistrationFormComponent } from './reactive-registration-form/reactive-registration-form.component';
import { NgModuleRegistrationFormComponent } from './ng-module-registration-form/ng-module-registration-form.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormErrorComponent } from './form-error/form-error.component';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveRegistrationFormComponent,
    NgModuleRegistrationFormComponent,
    NavigationComponent,
    FormErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
