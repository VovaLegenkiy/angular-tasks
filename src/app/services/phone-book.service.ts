import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { getUrl } from '../utils';
import { IEntityItem } from '../i-entity-item';
import { IContact } from '../i-contact';
@Injectable({
  providedIn: 'root'
})
export class PhoneBookService {
  contacts = new BehaviorSubject<IContact[]>([]);

  constructor(private http: HttpClient) { }

  createContact(body): Observable<IEntityItem> {
    const url = getUrl('create');

    return this.http.post(url, body)
      .pipe(map(({ item }: { item: IEntityItem }) => item));
  }

  updateContact(body): Observable<IEntityItem> {
    const url = getUrl('update');

    return this.http.post(url, body)
      .pipe(map(({ item }: { item: IEntityItem }) => item));
  }

  getContacts(filter = {}): Observable<IContact[]> {
    const url = getUrl('get');

    return this.http.post(url, filter)
      .pipe(map(({ items }: { items: IEntityItem[] }) => {
        const newItems = items.map((contact: IEntityItem) => ({
          _id: contact._id,
          name: contact.name,
          phone: contact.phone,
          email: contact.email
        }));

        this.contacts.next(newItems);

        return newItems;
      }));
  }

  getContact(id): Observable<IEntityItem> {
    const url = getUrl('get', id);

    return this.http.get(url)
      .pipe(map(({ item }: { item: IEntityItem }) => item));
  }

  deleteContact(id): Observable<IEntityItem> {
    const url = getUrl('delete', id);

    return this.http.get(url)
      .pipe(map(({ item }: { item: IEntityItem }) => item));
  }

  search(value) {
    const filter = value ?
      { name: `\/${value}\/` } :
      {}

    return this.getContacts(filter);
  }
}
