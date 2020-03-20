import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../contact';
import { Location } from '@angular/common';
import { PhoneBookService } from '../phone-book.service';
import { EntityItem } from '../entity-item';
import { IContact } from '../icontact';

@Component({
  selector: 'app-create-update-contact',
  templateUrl: './create-update-contact.component.html',
  styleUrls: ['./create-update-contact.component.css']
})
export class CreateUpdateContactComponent implements OnInit {
  createMode: boolean = true;
  contact: Contact = new Contact('', '', '');
  isLoading: boolean = false;
  _id: string;

  constructor(private route: ActivatedRoute, private location: Location, private pbService: PhoneBookService) { }

  ngOnInit(): void {
    this._id = this.route.snapshot.paramMap.get('id');

    if (this._id) {
      this.createMode = false;
      this.isLoading = true;
      this.pbService.getContact(this._id)
        .subscribe(({ item }: { item: IContact }) => {
          this.isLoading = false;
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
    this.pbService.getContacts({ name: this.contact.name })
      .subscribe(({ items }: { items: EntityItem[] }) => {
        if (items.length === 0) {
          this.pbService.createContact(this.contact).subscribe(() => this.onBack());
        } else {
          console.log('User already exist');
        }
      });
  }

  onUpdate(e) {
    const body = {
      ...this.contact,
      _id: this._id
    }
    this.pbService.updateContact(body)
      .subscribe(() => this.onBack());
  }

}
