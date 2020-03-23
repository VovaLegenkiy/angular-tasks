import { Component, OnInit } from '@angular/core';
import { PhoneBookService } from '../phone-book.service';
import { EntityItem } from '../entity-item';
import { IContact } from '../icontact';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.css']
})
export class PhoneBookComponent implements OnInit {
  searchText: string = '';
  contacts: EntityItem[];
  filteredContacts: EntityItem[];
  isLoading: boolean;

  constructor(private pbService: PhoneBookService, private msService: MessagesService) { }

  ngOnInit(): void {
    this.pbService.isLoading.subscribe(value => this.isLoading = value);
    this.getContacts();
  }

  getContacts() {
    this.pbService.getContacts()
      .subscribe((items: EntityItem[]) => {
        this.contacts = items;
        this.filteredContacts = items;
        this.pbService.setIsLoading(false);
      })
  }

  onSearch(value) {
    this.filteredContacts = this.contacts.filter((contact: IContact) => {
      const {name, email, phone} = contact;
      return this.isInclude(name, value) ||
        this.isInclude(email, value) ||
        this.isInclude(phone, value);
    })
  }

  onDelete(id) {
    this.pbService.setIsLoading(true);
    this.pbService.deleteContact(id)
      .subscribe(() => {
        this.msService.setMessage({
          type: 'success',
          text: 'User was successfuly deleted!'
        });
        this.getContacts();
      });
  }

  isInclude(str1, str2) {
    return str1.toLowerCase().includes(str2.toLowerCase());
  }

}
