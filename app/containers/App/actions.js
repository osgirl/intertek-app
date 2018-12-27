import {
    LOGOUT,
    INITIALIZE,
    INITIALIZE_SUCCESS,
    INITIALIZE_FAIL
} from './constants';

export function logout() {
    return {
        type: LOGOUT
    };
}

export function initialize() {
    return {
        type: INITIALIZE
    };
}

export function initializeSuccess(user) {
    return {
        type: INITIALIZE_SUCCESS,
        user
    };
}

export function initializeFail() {
    return {
        type: INITIALIZE_FAIL
    };
}
