import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
import { ModalService } from 'src/app/services/modal.service';
import { VIEW_LIST, DATE_FORMAT } from 'src/app/config/constants';
import { DateUtils } from 'src/app/config/utils';
import { CalendarData } from 'src/app/config/calendar-data';
import { IDay } from 'src/app/interfaces/i-day';

enum Direction {
  next = 'next',
  prev = 'prev'
}
enum View {
  day = 'day',
  week = 'week',
  month = 'month'
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  Direction = Direction;
  View = View;
  currentDate: Date = new Date();
  stringDate: string = new Date().toLocaleDateString('ua', DATE_FORMAT);
  view: string = View.day;
  viewList: string[] = VIEW_LIST;
  monthData;
  weekData;
  dayData;
  weekNumber;
  todayWeekNumber;
  today = DateUtils.todayString();
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
    this.todayWeekNumber = this.weekNumber;
    this.dayData = this.getDayData(this.currentDate);
  }

  setToday(e) {
    const today = DateUtils.today();
    
    this.update(today);
    this.weekNumber = this.todayWeekNumber;
    this.monthData = this.calendar.getMonthData(today);
    this.weekData = this.monthData[this.todayWeekNumber];
    this.dayData = this.getDayData(today);
  }

  changePeriod(view: string, direction: Direction) {
    switch (view) {
      case View.month:
        const newMonthDate = this.getNewMonth(this.currentDate, direction);

        this.monthData = this.calendar.getMonthData(newMonthDate);
        this.update(newMonthDate);
        break;
      case View.week:
        this.weekNumber = this.getNewWeekNumber(this.weekNumber, direction);

        this.weekData = this.getWeekData(this.currentDate, this.monthData, this.weekNumber, direction);
      case View.day:
        const newDate = this.getNewDay(this.currentDate, direction);

        this.dayData = this.getDayData(newDate);
        this.update(newDate);
    }
  }

  getNewDay(date: Date, direction: Direction) {
    const monthDate = date.getDate();
    const newDate = new Date(date);

    newDate.setDate(direction === Direction.next ? monthDate + 1 : monthDate - 1)

    return newDate;
  }

  getNewMonth(date: Date, direction: Direction): Date {
    return direction === Direction.next ? DateUtils.nextMonth(date) : DateUtils.prevMonth(date);
  }

  getNewWeekNumber(weekNumber: number, direction: Direction): number {
    return direction === Direction.next ? weekNumber + 1 : weekNumber - 1;
  }

  getWeekData(date: Date, monthData: Array<IDay[]>, weekNumber: number, direction: Direction): IDay[] {
    const nextWeek = monthData[weekNumber];

    if (nextWeek) {
      return monthData[weekNumber];
    }

    const newDate = this.getNewMonth(date, direction);
    const newData = this.calendar.getWeekData(newDate, monthData, weekNumber);

    this.update(newDate);
    this.weekNumber = newData.weekNumber;
    this.monthData = newData.monthData;

    return newData.monthData[newData.weekNumber];
  }

  getDayData(date: Date) {
    return this.calendar.generateDay(date);
  }

  setView(view: string): void {
    this.view = view;
  }

  onShowAddModal(date: IDay) {
    this.modal.show(date);
  }

  update(date: Date) {
    this.currentDate = date;
    this.stringDate = date.toLocaleDateString('ua', DATE_FORMAT);
  }
}
