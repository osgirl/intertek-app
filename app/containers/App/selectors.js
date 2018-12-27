import { parse } from 'qs';
import { createSelector } from 'reselect';

const selectApp = (state) => state.app;
const selectRouter = (state) => state.router;

const selectUrlQuery = createSelector(
    selectRouter,
    (router) => router.location ? (router.location.search || '') : ''
);

export const makeSelectUser = () => createSelector(
    selectApp,
    (substate) => substate.user
);

export const makeSelectInitialization = () => createSelector(
    selectApp,
    makeSelectUser(),

    (substate, user) => ({
        user,
        isInitialized: substate.isInitialized,
        isInitInProgress: substate.isInitInProgress
    })
);

export const makeSelectUrlBase = () => (state) => {
    const routingState = state.router;
    const { location } = routingState;
    return location ? location.pathname || '' : '';
};

export const makeSelectUrlParams = () => createSelector(
    selectUrlQuery,
    (query) => parse(query, { ignoreQueryPrefix: true }) || {}
);
