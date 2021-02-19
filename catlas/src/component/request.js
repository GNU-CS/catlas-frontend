import axios from 'axios';

export const SERVER_CLOSED = 'catlas/SERVER_CLOSED';

export const createInstance = (token = undefined) => {
    const base = 'http://127.0.0.1:8000/api/';
    const timeout = 1000;

    const option = {
        baseURL: base,
        timeout: timeout
    }

    if (token) option['headers'] = { 'Authorization': `Token ${token}` }

    return axios.create(option);
}