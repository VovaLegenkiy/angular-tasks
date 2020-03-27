import { IEvent } from './i-event';

export interface IDay {
    year: number;
    month: number;
    date: number;
    week?: number;
    events?: IEvent[],
    isToday?: boolean;
}
