import ajax from 'common/ajax';
import { put, takeLatest } from 'redux-saga/effects';
import { INITIALIZE } from './constants';

import {
    initializeSuccess,
    initializeFail
} from './actions';

function* initialize() {
    try {
        const user = yield ajax.get('/api/users/current');
        yield put(initializeSuccess(user));
    } catch (ex) {
        // An error occured while initializing, we will just redirect the user to login page
        // Maybe some of the potential errors could be handled more appropriately
        // But it think it is good enough for now.
        sessionStorage.removeItem('auth-token');
        yield put(initializeFail());
    }
}

function* applicationSaga() {
    yield takeLatest(INITIALIZE, initialize);
}

export default [
    applicationSaga
];
