import axios from 'axios';
import { stringify } from 'qs';
import { tryParseJson } from './util';

function forwardTo(location) {
    window.location.href = location;
}

function fetchAuthInfo() {
    const json = sessionStorage.getItem('auth-token');
    const data = tryParseJson(json) || {};

    return {
        token: data.token
    };
}

function handleError(error, redirectOnUnauthorized = true) {
    let response = {};

    if (redirectOnUnauthorized && error.status === 401) {
        sessionStorage.removeItem('auth-token');
        forwardTo('/logged-out');
    }

    if (error.response) {
        response = {
            status: error.response.status,
            statusText: error.response.statusText,
            ...error.response.data
        };
    }

    return Promise.reject(response);
}

function createRequest(url, data, type, customHeaders = {}) {
    const info = fetchAuthInfo();
    const absoluteUrl = API_BASE_URL + url;

    const headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...customHeaders
    };

    if (info && info.token) {
        headers.Authorization = `Bearer ${info.token}`;
    }

    return {
        url: absoluteUrl,
        headers,
        method: type,
        data
    };
}

function get(url, data = {}, redirectOnUnauthorized = true) {
    const request = Object.assign({}, createRequest(url, null, 'GET'), {
        params: data,
        paramsSerializer: (params) => stringify(params, { allowDots: true, skipNulls: true })
    });
    return axios(request)
        .then((response) => response.data)
        .catch((error) => handleError(error, redirectOnUnauthorized));
}

function post(url, data = null) {
    return axios(createRequest(url, data, 'POST'))
        .then((response) => response.data)
        .catch(handleError);
}

function put(url, data = null) {
    return axios(createRequest(url, data, 'PUT'))
        .then((response) => response.data)
        .catch(handleError);
}

function del(url, data = null) {
    return axios(createRequest(url, data, 'DELETE'))
        .then((response) => response.data)
        .catch(handleError);
}

export default {
    get,
    post,
    put,
    del
};
