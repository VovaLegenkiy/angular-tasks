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
import { NotificationComponent } from './notification/notification.component';
import { httpInterceptorProviders } from './interceptors';
import { LoaderService } from './services/loader.service';
import { LoaderComponent } from './loader/loader.component';
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
