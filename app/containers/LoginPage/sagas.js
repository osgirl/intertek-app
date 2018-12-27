import ajax from 'common/ajax';
import ErrorModel from 'models/error';
import { put, takeLatest } from 'redux-saga/effects';
import { initialize } from 'containers/App/actions';
import { LOGIN } from './constants';
import { loginFail } from './actions';

function* login({ username, password }) {
    try {
        const response = yield ajax.post('/api/login', { username, password });
        sessionStorage.setItem('auth-token', JSON.stringify(response));
        yield put(initialize());
    } catch (ex) {
        const error = ErrorModel.fromException(ex);
        yield put(loginFail(error));
    }
}

function* basicInfoSaga() {
    yield takeLatest(LOGIN, login);
}

export default [
    basicInfoSaga
];
