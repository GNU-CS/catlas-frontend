import axios from 'axios';

export function send(submitData, apiPath, reqMethod) {
    const base = 'http://127.0.0.1:8000/api/';

    const config = {
        url: apiPath,
        method: reqMethod,
        baseURL: base,
        data: submitData,
        timeout: 1000
    };

    axios(config)
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return error;
    });
}