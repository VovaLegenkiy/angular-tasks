import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../components/app.component';
import { PhoneBookComponent } from '../components/phone-book/phone-book.component';
import { CreateUpdateContactComponent } from '../components/create-update-contact/create-update-contact.component';
import { SearchInputComponent } from '../components/search-input/search-input.component';
import { PhoneTableComponent } from '../components/phone-table/phone-table.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { httpInterceptorProviders } from '../interceptors';
import { LoaderService } from '../services/loader.service';
import { LoaderComponent } from '../components/shared/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    PhoneBookComponent,
    CreateUpdateContactComponent,
    SearchInputComponent,
    PhoneTableComponent,
    NotificationComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [
    LoaderService, httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
