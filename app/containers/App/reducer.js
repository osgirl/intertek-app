import {
    LOGOUT,
    INITIALIZE,
    INITIALIZE_SUCCESS,
    INITIALIZE_FAIL
} from './constants';

const initialState = {
    isInitialized: false,
    isInitInProgress: false,

    user: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        isAuthenticated: false
    }
};

function handleInitialize(state) {
    return {
        ...state,
        isInitInProgress: true
    };
}

function handleInitializeSuccess(state, { user }) {
    return {
        ...state,
        isInitialized: true,
        isInitInProgress: false,

        user: {
            ...state.user,
            ...user,
            isAuthenticated: true
        }
    };
}

function handleInitializeFail(state) {
    return {
        ...state,
        isInitialized: true,
        isInitInProgress: false,
        user: { ...state.user, isAuthenticated: false }
    };
}

export function handleLogout(state) {
    sessionStorage.removeItem('auth-token');

    return {
        ...state,
        isInitialized: true,
        isInitInProgress: false,
        user: { ...initialState.user, isAuthenticated: false }
    };
}

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case INITIALIZE:
            return handleInitialize(state, action);
        case INITIALIZE_SUCCESS:
            return handleInitializeSuccess(state, action);
        case INITIALIZE_FAIL:
            return handleInitializeFail(state, action);
        case LOGOUT:
            return handleLogout(state, action);
        default:
            return state;
    }
}
