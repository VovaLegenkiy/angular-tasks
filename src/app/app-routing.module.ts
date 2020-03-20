import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhoneBookComponent } from './phone-book/phone-book.component';
import { CreateUpdateContactComponent } from './create-update-contact/create-update-contact.component';

const routes: Routes = [
  { path: '', redirectTo: 'phone-book', pathMatch: 'full' },
  { path: 'phone-book', component: PhoneBookComponent },
  { path: 'create-contact', component: CreateUpdateContactComponent },
  { path: 'update-contact/:id', component: CreateUpdateContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
