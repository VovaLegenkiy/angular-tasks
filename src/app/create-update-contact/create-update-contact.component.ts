import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../contact';
import { Location } from '@angular/common';
import { PhoneBookService } from '../phone-book.service';
import { EntityItem } from '../entity-item';
import { IContact } from '../icontact';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-create-update-contact',
  templateUrl: './create-update-contact.component.html',
  styleUrls: ['./create-update-contact.component.css']
})
export class CreateUpdateContactComponent implements OnInit {
  createMode: boolean = true;
  contact: Contact = new Contact('', '', '');
  isLoading: boolean;
  _id: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private pbService: PhoneBookService,
    private msService: MessagesService
  ) { }

  ngOnInit(): void {
    this.pbService.isLoading
      .subscribe((value: boolean) => this.isLoading = value);

    this._id = this.route.snapshot.paramMap.get('id');

    if (this._id) {
      this.createMode = false;
      this.pbService.getContact(this._id)
        .subscribe((item: IContact) => {
          this.pbService.setIsLoading(false);

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
          text: 'Contact successfuly created'
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
          text: 'Contact successfuly updated'
        });
        this.onBack();
      });

    this.chackIfContactExist(body, cb);
  }

  chackIfContactExist(props, callback) {
    this.pbService.getContacts({ name: this.contact.name })
      .subscribe((items: EntityItem[]) => {
        this.pbService.setIsLoading(false);

        if (items.length === 0) {
          callback(props);
        } else {
          this.msService.setMessage({
            type: 'error',
            text: 'User is already exist'
          });
        }
      });
  }
}
