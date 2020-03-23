import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MessagesService } from '../services/messages.service';
import { IMessage } from '../i-message';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  message: IMessage;
  isHide: boolean = true;

  constructor(private messageService: MessagesService) { }

  ngOnInit(): void {
    this.messageService.message.subscribe(message => {
      this.message = message;
      this.isHide = !message.text && !message.type;
      
    });
  }

  onClose() {
    this.isHide = true;
    this.messageService.clearMessage();
  }
}
