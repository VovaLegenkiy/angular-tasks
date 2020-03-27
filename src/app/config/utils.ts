import * as moment from 'moment';

export class Date {
    constructor() {}

    static nextMonth(currentDate) {
        const month = currentDate.month();
        const year = currentDate.year();
        const newMonth = month + 1;
        return moment().set({year, month: newMonth, date: 1});
    }

    static prevMonth(currentDate) {
        const month = currentDate.month();
        const year = currentDate.year();
        const newMonth = month - 1;
        return moment().set({ year, month: newMonth, date: 1 });
    }

    static today() {
        return moment();
    }
}