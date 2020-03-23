import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { getUrl } from './utils';
import { EntityItem } from './entity-item';
import { IContact } from './icontact';
@Injectable({
  providedIn: 'root'
})
export class PhoneBookService {
  isLoading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  createContact(body): Observable<EntityItem> {
    const url = getUrl('create');
    this.setIsLoading(true);

    return this.http.post(url, body)
      .pipe(map(({ item }: { item: EntityItem }) => item));
  }

  updateContact(body): Observable<EntityItem> {
    const url = getUrl('update');
    this.setIsLoading(true);

    return this.http.post(url, body)
      .pipe(map(({ item }: { item: EntityItem }) => item));
  }

  getContacts(filter = {}): Observable<IContact[]> {
    const url = getUrl('get');
    this.setIsLoading(true);

    return this.http.post(url, filter)
      .pipe(map(({ items }: { items: EntityItem[] }) =>
        items.map((contact: EntityItem) => ({
          _id: contact._id,
          name: contact.name,
          phone: contact.phone,
          email: contact.email
        }))
      ));
  }

  getContact(id): Observable<EntityItem> {
    const url = getUrl('get', id);
    this.setIsLoading(true);

    return this.http.get(url)
      .pipe(map(({ item }: { item: EntityItem }) => item));
  }

  deleteContact(id): Observable<EntityItem> {
    const url = getUrl('delete', id);
    this.setIsLoading(true);

    return this.http.get(url)
      .pipe(map(({ item }: { item: EntityItem }) => item));
  }

  setIsLoading(value) {
    this.isLoading.next(value);
  }
}
