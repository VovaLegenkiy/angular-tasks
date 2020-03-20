import { IContact } from './icontact';

export class Contact implements IContact{
    constructor(
        public name: string,
        public phone: string,
        public email: string,
    ) { }
}