import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './contact';

const API_URL = 'http://localhost:8008';
const ENTITY_NAME = 'phone-book';

function getUrl(type, id = '') {
  return `${API_URL}/api/${ENTITY_NAME}/${type}/${id}`;
}

@Injectable({
  providedIn: 'root'
})
export class PhoneBookService {

  constructor(private http: HttpClient) { }

  createContact(body): Observable<any> {
    const url = getUrl('create');

    return this.http.post(url, body);
  }

  updateContact(body): Observable<any> {
    const url = getUrl('update');

    return this.http.post(url, body);
  }

  getContacts(filter): Observable<any> {
    const url = getUrl('get');

    return this.http.post(url, filter);
  }

  getContact(id): Observable<any> {
    const url = getUrl('get', id);

    return this.http.get(url);
  }

  deleteContact(id): Observable<any> {
    const url = getUrl('delete', id);

    return this.http.get(url);
  }
}
