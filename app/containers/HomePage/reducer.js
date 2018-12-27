import {
    FETCH_ORDERS,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL
} from './constants/result-list';

const initialState = {
    orders: [],
    error: null,
    isInitialized: false
};

function handleFetch(state) {
    return {
        ...state,
        isInitialized: false
    };
}

function handleFetchSuccess(state, { orders }) {
    return {
        ...state,
        orders,
        isInitialized: true
    };
}

function handleFetchFail(state, { error }) {
    return {
        ...state,
        orders: [],
        isInitialized: true,
        error
    };
}

export default function homePageReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ORDERS:
            return handleFetch(state, action);
        case FETCH_ORDERS_SUCCESS:
            return handleFetchSuccess(state, action);
        case FETCH_ORDERS_FAIL:
            return handleFetchFail(state, action);
        default:
            return state;
    }
}
