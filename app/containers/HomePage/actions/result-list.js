import {
    FETCH_ORDERS,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL
} from '../constants/result-list';

export function fetchOrders() {
    return {
        type: FETCH_ORDERS
    };
}

export function fetchOrdersSuccess(orders) {
    return {
        type: FETCH_ORDERS_SUCCESS,
        orders
    };
}

export function fetchOrdersFail(error) {
    return {
        type: FETCH_ORDERS_FAIL,
        error
    };
}
