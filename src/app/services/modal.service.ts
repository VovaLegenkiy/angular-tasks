import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDay } from '../interfaces/i-day';
import { MODAL_TITLE_FORMAT } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isShow = new BehaviorSubject<boolean>(false);
  dateString = new BehaviorSubject<string>('');
  date: IDay;
  constructor() { }

  show(date) {
    this.isShow.next(true);
    this.date = date;
    this.dateString.next(new Date(date.date).toLocaleDateString('ua', MODAL_TITLE_FORMAT));
  }

  close() {
    this.isShow.next(false);
  }
}
