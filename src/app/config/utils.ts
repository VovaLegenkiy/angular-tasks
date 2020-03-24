import { API_HOST, ENTITY_NAME } from './constants';

export const getUrl = (type, id = '') =>
    `${API_HOST}/api/${ENTITY_NAME}/${type}/${id}`