import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WEEK_DAYS } from 'src/app/config/constants';
import { CalendarData } from 'src/app/config/calendar-data';
import { IDay } from 'src/app/interfaces/i-day';
@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit {
  @Input() dayData: IDay;
  @Output() onShowModal = new EventEmitter();
  calendar: CalendarData;
  weekDay: string;

  constructor() {
    this.calendar = new CalendarData();
  }

  ngOnInit(): void {
    const date = new Date(this.dayData.date);
    this.weekDay = date.toLocaleDateString('ua', { weekday: 'long' });
  }

  onShowAddModal(date: IDay) {
    this.onShowModal.emit(date);
  }

}
