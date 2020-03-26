import { Component, OnInit, TemplateRef, SimpleChanges } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import * as moment from 'moment';
import { ModalService } from 'src/app/services/modal.service';
import { VIEW_LIST, DATE_FORMAT } from '../../config/constants';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentDate: moment.Moment = moment();
  stringDate: string = moment().format(DATE_FORMAT);
  view: string = 'month';
  selectedDate: string;
  viewList: string[] = VIEW_LIST;

  constructor(
    private calendarService: CalendarService,
    private modal: ModalService,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(props: SimpleChanges) {    
  }

  nextPeriod(view) {
    switch (view) {
      case 'month':
        const month = this.currentDate.month();
        const newDate = moment(this.currentDate.set({'month': month + 1, 'date': 1}));
        this.currentDate = newDate;
        this.setStringDate(newDate);
        break;
      case 'week':
      case 'day':
    }

  }

  prevPeriod(view) {
    switch (view) {
      case 'month':
        const month = this.currentDate.month();
        const newDate = moment(this.currentDate.set({ 'month': month - 1, 'date': 1 }));
        this.currentDate = newDate;
        this.setStringDate(newDate);
        break;
      case 'week':
      case 'day':
    }
  }
  setView(view) {
    this.view = view;
  }

  onShowAddModal(date) {
    const { year, month, day } = date;
    const eventDate = moment([year, month, day]).format(DATE_FORMAT);

    this.modal.show();
    this.selectedDate = date;
  }

  setStringDate(date) {
    this.stringDate = date.format(DATE_FORMAT);
  }
}
