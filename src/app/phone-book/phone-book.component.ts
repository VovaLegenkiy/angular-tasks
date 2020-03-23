import { Component, OnInit } from '@angular/core';
import { PhoneBookService } from '../services/phone-book.service';
import { IEntityItem } from '../i-entity-item';
import { IContact } from '../i-contact';
import { MessagesService } from '../services/messages.service';
import { Subject } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.css']
})
export class PhoneBookComponent implements OnInit {
  searchText: string = '';
  contacts: IEntityItem[];
  filteredContacts: IEntityItem[];
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private pbService: PhoneBookService,
    private msService: MessagesService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.getContacts();
    this.pbService.contacts.subscribe((data: IEntityItem[]) => {
      return this.filteredContacts = data;
    });
  }

  getContacts() {
    this.pbService.getContacts()
      .subscribe((items: IEntityItem[]) => {
        this.contacts = items;
        this.filteredContacts = items;
      })
  }

  onSearch(value) {
    this.filteredContacts = this.contacts.filter((contact: IContact) => {
      const { name, email, phone } = contact;
      return this.isInclude(name, value) ||
        this.isInclude(email, value) ||
        this.isInclude(phone, value);
    })
  }

  onDelete(contact) {
    this.pbService.deleteContact(contact._id)
      .subscribe(() => {
        this.msService.setMessage({
          type: 'success',
          text: `${contact.name} was successfuly deleted!`
        });
        this.getContacts();
      });
  }

  isInclude(str1, str2) {
    return str1.toLowerCase().includes(str2.toLowerCase());
  }

}
