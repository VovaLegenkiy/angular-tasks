import { IContact } from './icontact';

export interface EntityItem extends IContact{
    _entityType: string;
    _creationDate: string;
    _id: string;
}
