import { IEvent } from './i-event';

export interface IDay {
    date: string;
    monthDate: number;
    week?: number;
    events?: IEvent[],
    isToday?: boolean;
}
