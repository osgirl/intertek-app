import { createSelector } from 'reselect';
import { makeSelectInitialization } from 'containers/App/selectors';

const selectLogin = (state) => state.login;

export const makeSelectLogin = () => createSelector(
    selectLogin,
    makeSelectInitialization(),
    (login, app) => ({ ...login, app })
);
