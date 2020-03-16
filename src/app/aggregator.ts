import {Error} from './error';

export interface Aggregator {
    errors: Error;
    add: (name: string, error: string[]) => void;
}
