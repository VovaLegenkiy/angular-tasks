import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:8008';
const ENTITY_NAME = 'calendar';
const getUrl = (type: string, id: string = ''): string =>
    `${API_URL}/api/${ENTITY_NAME}/${type}/${id}`

@Injectable({ providedIn: 'root' })
export class CalendarService {
    constructor(private httpClient: HttpClient) { }

    getCalendarData(filter = {}) {
        const url = getUrl('get');

        return this.httpClient.post(url, filter);
    }

    addEvent(data) {
        const url = getUrl('create');

        return this.httpClient.post(url, data);
    }

}