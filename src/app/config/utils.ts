export class DateUtils {
    constructor() { }

    static nextMonth(currentDate) {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const newMonth = month + 1;
        return new Date(year, newMonth, 1);
    }

    static prevMonth(currentDate) {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const newMonth = month - 1;
        return new Date(year, newMonth, 1);
    }

    static today() {
        return new Date();
    }

    static todayString() {
        return new Date().toDateString();
    }
}