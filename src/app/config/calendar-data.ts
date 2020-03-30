import { IDay } from '../interfaces/i-day';
import { DateUtils } from './utils';

export class CalendarData {
    weekNumber: number;
    constructor() {

    }
    getMonthData(date: Date): Array<IDay[]> {
        return this.generateMonthDays(date);
    }

    getWeekData(date: Date, monthData: Array<IDay[]>, weekNumber: number): { monthData: Array<IDay[]>, weekNumber: number } | IDay[] {
        if (!weekNumber) {
            return monthData.find((week: IDay[]): IDay | undefined => week
                .find((day: IDay): boolean => day.isToday));
        }
        return this.generateWeekDays(date, monthData, weekNumber);
    }

    generateMonthDays(date: Date): Array<IDay[]> {
        let firstDate = 0;
        const { firstMonthWeekDay, lastMonthWeekDay, weeksInMonth, year, month } = this.getConfig(date);
        const emptyWeekData = new Array(7).fill(null);
        const emptyMonthData = new Array(weeksInMonth).fill(emptyWeekData);
        const todayString = DateUtils.todayString();

        return emptyMonthData.map((item: null[], i: number): IDay[] => {
            return item.map((value: null, j: number): IDay => {
                const isEmptyFirstWeekField = i === 0 && j < firstMonthWeekDay;
                const isEmptyLastWeekField = i + 1 === weeksInMonth && j > lastMonthWeekDay;
                let monthDate;
                let newMonth = month;
                if (isEmptyFirstWeekField) {
                    const newDate = new Date(year, month, j + 1 - firstMonthWeekDay);
                    monthDate = newDate.getDate();
                    newMonth = newDate.getMonth();
                } else if (isEmptyLastWeekField) {
                    newMonth = month + 1;
                    monthDate = new Date(year, newMonth, j - lastMonthWeekDay).getDate();
                } else {
                    monthDate = ++firstDate;
                }
                const isToday = new Date(year, newMonth, monthDate).toDateString() === todayString;

                return { date: new Date(year, newMonth, monthDate).toDateString(), monthDate, week: i, events: [], isToday };
            })
        });
    };

    generateWeekDays(date: Date, monthData: Array<IDay[]>, weekNumber: number): { monthData: Array<IDay[]>, weekNumber: number } {
        const isLastWeek = weekNumber === monthData.length;
        const newMonthData = this.generateMonthDays(date);
        const newWeekNumber = isLastWeek ? 1 : newMonthData.length - 2;

        return {
            monthData: newMonthData,
            weekNumber: newWeekNumber
        }
    }

    generateDay(date: Date): IDay {
        const monthDate = date.getDate();
        const stringDate = date.toDateString();

        return {
            date: stringDate,
            monthDate,
            events: [],
            isToday: new Date().toDateString() === stringDate
        };
    }

    getConfig(date: Date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstMonthWeekDay = this.getDay(new Date(year, month, 1));
        const lastMonthDate = this.getDaysInMonth(year, month);
        const lastMonthWeekDay = this.getDay(new Date(year, month, lastMonthDate));
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

    getDay(date: Date): number {
        const day = date.getDay();
        // -1: to match a day to array's index
        return day === 0 ? 6 : day - 1;
    }

    getDaysInMonth(year: number, month: number): number {
        // we increase a month to +1 and set a day to 0, 
        // 0 it's like a day before a first day in next month,
        // so we can get the last day in the month we need to now 
        return new Date(year, month + 1, 0).getDate();
    }

    getWeeksInMonth(daysInMonth): number {
        return Math.ceil(daysInMonth / 7);
    }
}