import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { IDay } from 'src/app/interfaces/i-day';
import { WEEK_DAYS } from '../../config/constants';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css']
})
export class MonthViewComponent implements OnInit {
  @Input() date: moment.Moment;
  @Output() onShowModal = new EventEmitter();
  currentDay;
  month;
  year;
  weekDays: string[] = WEEK_DAYS;
  monthData;

  constructor() {
  }

  ngOnInit(): void {
    this.currentDay = this.getDay(this.date);
    this.month = this.date.month();
    this.year = this.date.year();
    this.monthData = this.generateCalendarDays(this.year, this.month);
  }

  ngOnChanges(props: SimpleChanges) {
    const month = props.date.currentValue.month();
    const year = props.date.currentValue.year();

    this.monthData = this.generateCalendarDays(year, month);
  }

  onShowAddModal(date) {
    this.onShowModal.emit(date);
  }

  generateCalendarDays(year, month) {
    let firstDate = 0;
    const firstMonthDay = this.getDay(moment([year, month, 1]));
    const lastMonthDate = this.getDaysInMonth(year, month);
    const lastMonthDay = this.getDay(moment([year, month, lastMonthDate]));
    const daysInMonth = firstMonthDay + lastMonthDate;
    const weeksInMonth = this.getWeeksInMonth(daysInMonth);

    const arr = new Array(weeksInMonth).fill(null);
    const newArr = arr.map((item: IDay[], i: number) => {
      item = new Array(7).fill(null);
      return item.map((value: IDay, j: number): IDay => {
        const isEmptyFirstWeekField = i === 0 && j < firstMonthDay;
        const isEmptyLastWeekField = i + 1 === weeksInMonth && j > lastMonthDay;

        if (isEmptyFirstWeekField || isEmptyLastWeekField) {
          return null;
        }
        firstDate += 1;

        return {
          year: year,
          month: month,
          day: firstDate,
          events: []
        };
      })
    });

    return newArr;
  };



  getDay(date: moment.Moment): number {
    const day = date.day();
    // -1: to match a day to array's index
    return day === 0 ? 6 : day - 1;
  }

  getDaysInMonth(year, month): number {
    // we increase a month to +1 and set a day to 0, 
    // 0 it's like a day before a first day in next month,
    // so we can get the last day in the month we need to now 
    return moment().year(year).month(month + 1).date(0).date();
  }

  getWeeksInMonth(daysInMonth): number {
    return Math.ceil(daysInMonth / 7);
  }
}
