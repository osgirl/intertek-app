import appSaga from 'containers/App/sagas';
import loginSaga from 'containers/LoginPage/sagas';
import homeSaga from 'containers/HomePage/sagas';

export default [
    ...appSaga,
    ...loginSaga,
    ...homeSaga
];
