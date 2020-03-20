import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneBookComponent } from './phone-book/phone-book.component';
import { CreateUpdateContactComponent } from './create-update-contact/create-update-contact.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { PhoneTableComponent } from './phone-table/phone-table.component';

@NgModule({
  declarations: [
    AppComponent,
    PhoneBookComponent,
    CreateUpdateContactComponent,
    SearchInputComponent,
    PhoneTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
