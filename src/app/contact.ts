import { IContact } from './i-contact';

export class Contact implements IContact{
    constructor(
        public name: string,
        public phone: string,
        public email: string,
    ) { }
}