import { IContact } from './i-contact';

export interface IEntityItem extends IContact{
    _entityType: string;
    _creationDate: string;
    _id: string;
}
