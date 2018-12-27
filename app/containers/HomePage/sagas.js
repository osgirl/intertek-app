import ajax from 'common/ajax';
import { put, takeLatest } from 'redux-saga/effects';
import ErrorModel from 'models/error';
import { FETCH_ORDERS } from './constants/result-list';

import {
    fetchOrdersSuccess,
    fetchOrdersFail
} from './actions/result-list';

function* fetchOrders() {
    try {
        const orders = yield ajax.get('/api/orders');
        yield put(fetchOrdersSuccess(orders));
    } catch (ex) {
        const error = ErrorModel.fromException(ex);
        yield put(fetchOrdersFail(error));
    }
}

function* homePageSaga() {
    yield takeLatest(FETCH_ORDERS, fetchOrders);
}

export default [
    homePageSaga
];
