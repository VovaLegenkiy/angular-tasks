import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  date: moment.Moment;
  currentDay: number;
  month: number;
  year: number;
  calendarData;
  eventText: string = '';
  isHide: boolean = true;
  weekDays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  dateToAdd: string;
  selectedDate;

  constructor(private calendarService: CalendarService) {
    this.date = moment();
    console.log(this.date);

    this.currentDay = this.getDay(this.date);
    this.month = this.date.month();
    this.year = this.date.year();
  }

  ngOnInit(): void {
    this.calendarData = this.generateCalendarDays();

  }

  onShowAddModal(date) {
    const { year, month, day } = date;
    const eventDate = moment([year, month, day]).format('ddd DD MMM YYYY');

    this.selectedDate = date;
    this.isHide = false;
    this.dateToAdd = eventDate;
  }

  onAddEvent() {
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

  getDay(date: moment.Moment): number {
    const day = date.day();
    // -1: to match a day to array's index
    return day === 0 ? 6 : day - 1;
  }

  getDaysInMonth(): number {
    // we increase a month to +1 and set a day to 0, 
    // 0 it's like a day before a first day in next month,
    // so we can get the last day in the month we need to now 
    return new Date(this.year, this.month + 1, 0).getDate();
  }

  generateCalendarDays() {
    let firstDate = 0;
    const firstMonthDay = this.getDay(moment([this.year, this.month, 1]));
    const lastMonthDate = this.getDaysInMonth();
    const lastMonthDay = this.getDay(moment([this.year, this.month, lastMonthDate]));
    const weeksInMonth = this.getWeeksInMonth(firstMonthDay, lastMonthDay, lastMonthDate);

    const arr = [[]];
    for (let i = 0; i < weeksInMonth; i++) {
      arr[i] = [];
      for (let j = 0; j < 7; j++) {
        const isEmptyFirstWeekField = i === 0 && j !== firstMonthDay;
        const isEmptyLastWeekField = i + 1 === weeksInMonth && j > lastMonthDay;

        if (isEmptyFirstWeekField || isEmptyLastWeekField) {
          arr[i][j] = null;
          continue;
        }
        firstDate += 1;

        arr[i][j] = {
          year: this.year,
          month: this.month,
          day: firstDate,
          events: []
        };
      }
    };

    return arr;
  }

  getWeeksInMonth(firstDay: number, lastDay: number, lastMonthDate: number): number {
    const daysInWeek = 6; // start from Monday(0);
    const emptyDaysInFirstWeek = firstDay; // e.g. monday it is a 0, so no empty days;
    const emptyDaysInLastWeek = daysInWeek - lastDay;
    const daysInMonthWithEmpty = lastMonthDate + emptyDaysInFirstWeek + emptyDaysInLastWeek;

    return Math.ceil(daysInMonthWithEmpty / 7);
  }
}
