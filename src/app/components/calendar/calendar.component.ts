import { Component, OnInit, TemplateRef, SimpleChanges } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import * as moment from 'moment';
import { ModalService } from 'src/app/services/modal.service';
import { VIEW_LIST, DATE_FORMAT } from '../../config/constants';
import { Date } from '../../config/utils';
import { CalendarData } from 'src/app/config/calendar-data';
import { generate } from 'rxjs';
import { IDay } from 'src/app/interfaces/i-day';

enum Direction {
  next = 'next',
  prev = 'prev'
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  currentDate: moment.Moment = moment();
  stringDate: string = moment().format(DATE_FORMAT);
  view: string = 'week';
  selectedDate: IDay;
  viewList: string[] = VIEW_LIST;
  monthData;
  weekData;
  weekNumber;
  today;
  calendar;

  constructor(
    private calendarService: CalendarService,
    private modal: ModalService,
  ) {
  }

  ngOnInit(): void {
    this.calendar = new CalendarData();
    this.monthData = this.calendar.getMonthData(this.currentDate);
    this.weekData = this.calendar.getWeekData(this.currentDate, this.monthData, this.weekNumber);
    this.weekNumber = this.weekData[0].week;
  }

  ngOnChanges() {
  }

  setToday(e) {
    this.update(Date.today());
  }

  changePeriod(view: string, direction: Direction) {
    switch (view) {
      case 'month':
        const newMonthDate = this.getNewMonth(this.currentDate, direction);

        this.monthData = this.calendar.getMonthData(newMonthDate);
        this.update(newMonthDate);
        break;
      case 'week':
        this.weekNumber = this.getNewWeekNumber(this.weekNumber, direction);

        this.weekData = this.getWeekData(this.currentDate, this.monthData, this.weekNumber, direction);
      case 'day':
    }
  }

  getNewMonth(date: moment.Moment, direction: Direction): moment.Moment {
    return direction === Direction.next ? Date.nextMonth(date) : Date.prevMonth(date);
  }

  getNewWeekNumber(weekNumber: number, direction: Direction): number {
    return direction === Direction.next ? weekNumber + 1 : weekNumber - 1;
  }

  getWeekData(date: moment.Moment, monthData: Array<IDay[]>, weekNumber: number, direction: Direction): IDay[] {
    const currentWeek = monthData[weekNumber];
    if (currentWeek) {
      return monthData[weekNumber];
    }
    const newDate = this.getNewMonth(date, direction);
    this.update(newDate);

    const newData = this.calendar.getWeekData(newDate, monthData, weekNumber);

    this.weekNumber = newData.weekNumber;
    this.monthData = newData.monthData;

    return newData.monthData[newData.weekNumber];
  }

  setView(view: string): void {
    this.view = view;
  }

  onShowAddModal(date: IDay) {
    const { year: y, month: m, date: d } = date;
    const eventDate = moment([y, m, d]).format(DATE_FORMAT);

    this.modal.show();
    this.selectedDate = date;
  }

  update(date: moment.Moment) {
    this.currentDate = date;
    this.stringDate = date.format(DATE_FORMAT);
  }
}
