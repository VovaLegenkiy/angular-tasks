import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMessage } from '../interfaces/i-message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  message = new BehaviorSubject<IMessage>({
    type: '',
    text: ''
  });
  constructor() { }

  setMessage(message: IMessage) {
    this.message.next(message);
  }

  clearMessage() {
    this.message.next({
      type: '',
      text: ''
    });
  }
}
