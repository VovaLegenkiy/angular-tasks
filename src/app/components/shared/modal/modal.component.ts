import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  isShow: boolean;
  dateString: string;
  selectedDate;
  eventText: string = '';
  @Input() date = '';

  constructor(
    private modal: ModalService,
    private calendarService: CalendarService
  ) { }

  onClose() {
    this.modal.close();
  }

  ngOnInit(): void {
    this.modal.isShow
      .subscribe((val: boolean) => {
        return this.isShow = val;
      });
    this.modal.dateString
      .subscribe((date: string) => {
        return this.dateString = date;
      });
  }

  onAddEvent(e) {
    const data = {
      ...this.selectedDate,
      events: [
        ...this.selectedDate.events,
        {
          text: this.eventText
        }
      ]
    }
    this.calendarService.addEvent(data)
      .subscribe((data) => console.log(data));
  }

}
