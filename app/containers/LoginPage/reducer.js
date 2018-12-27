import {
    LOGIN,
    LOGIN_FAIL,
    HIDE_ERROR
} from './constants';

const initialState = {
    error: null,
    isLoading: false
};

function handleLogin(state) {
    return {
        ...state,
        isLoading: true
    };
}

function handleLoginFail(state, { error }) {
    return {
        ...state,
        error,
        isLoading: false
    };
}

function handleHideError(state) {
    return {
        ...state,
        error: null
    };
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return handleLogin(state, action);
        case LOGIN_FAIL:
            return handleLoginFail(state, action);
        case HIDE_ERROR:
            return handleHideError(state, action);
        default:
            return state;
    }
}
