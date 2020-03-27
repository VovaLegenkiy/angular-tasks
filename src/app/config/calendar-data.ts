import * as moment from 'moment';
import { IDay } from '../interfaces/i-day';

export class CalendarData {
    weekNumber: number;
    constructor() {

    }
    getMonthData(date: moment.Moment): Array<IDay[]> {
        return this.generateMonthDays(date);
    }

    getWeekData(date: moment.Moment, monthData: Array<IDay[]>, weekNumber: number): IDay[] {
        if (!weekNumber) {
            return monthData.find((week: IDay[]): IDay | undefined => week
                .find((day: IDay): boolean => day.isToday));
        }
        return this.generateWeekDays(date, monthData, weekNumber);
    }

    generateMonthDays(date: moment.Moment): Array<IDay[]> {
        let firstDate = 0;
        const { firstMonthWeekDay, lastMonthWeekDay, weeksInMonth, year, month } = this.getConfig(date);
        const emptyWeekData = new Array(7).fill(null);
        const emptyMonthData = new Array(weeksInMonth).fill(emptyWeekData);

        return emptyMonthData.map((item: null[], i: number): IDay[] => {
            return item.map((value: null, j: number): IDay => {
                const isEmptyFirstWeekField = i === 0 && j < firstMonthWeekDay;
                const isEmptyLastWeekField = i + 1 === weeksInMonth && j > lastMonthWeekDay;
                let date;
                let newMonth = month;
                if (isEmptyFirstWeekField) {
                    const newDate = moment().set({ year, month, date: j + 1 - firstMonthWeekDay });
                    date = newDate.date();
                    newMonth = newDate.month();
                } else if (isEmptyLastWeekField) {
                    newMonth = month + 1;
                    date = moment().set({ year, month: newMonth, date: j - lastMonthWeekDay }).date();
                } else {
                    date = ++firstDate;
                }
                const isToday = moment([year, newMonth, date]).calendar().split(' ')[0] === 'Today';

                return { year, month: newMonth, date, week: i, events: [], isToday };
            })
        });
    };

    generateWeekDays(date: moment.Moment, monthData: Array<IDay[]>, weekNumber: number) {
        const isLastWeek = weekNumber === monthData.length;
        const newMonthData = this.generateMonthDays(date);
        const newWeekNumber = isLastWeek ? 1 : newMonthData.length - 2;
        
        return {
            monthData: newMonthData,
            weekNumber: newWeekNumber
        }
    }

    getConfig(date: moment.Moment) {
        const year = date.year();
        const month = date.month();
        const firstMonthWeekDay = this.getDay(moment([year, month, 1]));
        const lastMonthDate = this.getDaysInMonth(year, month);
        const lastMonthWeekDay = this.getDay(moment([year, month, lastMonthDate]));
        const daysInMonth = firstMonthWeekDay + lastMonthDate;
        const weeksInMonth = this.getWeeksInMonth(daysInMonth);

        return {
            firstMonthWeekDay,
            lastMonthWeekDay,
            weeksInMonth,
            year,
            month
        }
    }

    getDay(date: moment.Moment): number {
        const day = date.day();
        // -1: to match a day to array's index
        return day === 0 ? 6 : day - 1;
    }

    getDaysInMonth(year, month): number {
        // we increase a month to +1 and set a day to 0, 
        // 0 it's like a day before a first day in next month,
        // so we can get the last day in the month we need to now 
        return moment().set({ year, 'M': month + 1, 'D': 0 }).date();
    }

    getWeeksInMonth(daysInMonth): number {
        return Math.ceil(daysInMonth / 7);
    }
}