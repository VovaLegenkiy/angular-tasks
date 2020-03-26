import { IEvent } from './i-event';

export interface IDay {
    year: number;
    month: number;
    day: number;
    events: IEvent[]
}
