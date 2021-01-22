import axios from 'axios';

export const createInstance = () => {
    const base = 'http://127.0.0.1:8000/api/';
    const timeout = 1000;

    return axios.create({
        baseURL: base,
        timeout: timeout
    });
}