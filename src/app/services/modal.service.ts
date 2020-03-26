import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDay } from '../interfaces/i-day';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isShow = new BehaviorSubject<boolean>(false);
  date: IDay;
  constructor() { }

  show() {
    this.isShow.next(true);
  }

  close() {
    this.isShow.next(false);
  }

  setModalDate(date) {
    this.date = date;
  }
}
