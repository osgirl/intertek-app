import {
    LOGIN,
    LOGIN_FAIL,
    HIDE_ERROR
} from './constants';

export function login(username, password) {
    return {
        type: LOGIN,
        username,
        password
    };
}

export function loginFail(error) {
    return {
        type: LOGIN_FAIL,
        error
    };
}

export function hideError() {
    return {
        type: HIDE_ERROR
    };
}
