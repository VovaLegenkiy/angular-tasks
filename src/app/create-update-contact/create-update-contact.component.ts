import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../contact';
import { Location } from '@angular/common';
import { PhoneBookService } from '../services/phone-book.service';
import { IEntityItem } from '../i-entity-item';
import { IContact } from '../i-contact';
import { MessagesService } from '../services/messages.service';
import { Subject } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-create-update-contact',
  templateUrl: './create-update-contact.component.html',
  styleUrls: ['./create-update-contact.component.css']
})
export class CreateUpdateContactComponent implements OnInit {
  createMode: boolean = true;
  contact: Contact = new Contact('', '', '');
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  _id: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private pbService: PhoneBookService,
    private msService: MessagesService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this._id = this.route.snapshot.paramMap.get('id');

    if (this._id) {
      this.createMode = false;
      this.pbService.getContact(this._id)
        .subscribe((item: IContact) => {

          const newItem: IContact = {
            name: item.name,
            phone: item.phone,
            email: item.email
          };

          this.contact = newItem;
        })
    }
  }

  onBack() {
    this.location.back();
  }

  onCreate(e) {
    const cb = () => this.pbService.createContact(this.contact)
      .subscribe(() => {
        this.msService.setMessage({
          type: 'success',
          text: `${this.contact.name} was  successfuly created`
        });
        this.onBack();
      });

    this.chackIfContactExist(this.contact, cb);
  }

  onUpdate(e) {
    const body = {
      ...this.contact,
      _id: this._id
    }
    const cb = () => this.pbService.updateContact(body)
      .subscribe(() => {
        this.msService.setMessage({
          type: 'success',
          text: `${this.contact.name} successfuly updated`
        });
        this.onBack();
      });

    this.chackIfContactExist(body, cb);
  }

  chackIfContactExist(contact, callback) {
    this.pbService.getContacts({ name: contact.name })
      .subscribe((items: IEntityItem[]) => {

        if (items.length === 0) {
          callback(contact);
        } else {
          this.msService.setMessage({
            type: 'error',
            text: `${contact.name} is already exist`
          });
        }
      });
  }
}
