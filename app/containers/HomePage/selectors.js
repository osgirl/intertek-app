import { createSelector } from 'reselect';
import { makeSelectUrlBase, makeSelectUrlParams } from 'containers/App/selectors';

const selectHome = (state) => state.home;

export const makeSelectFilters = () => createSelector(
    makeSelectUrlBase(),
    makeSelectUrlParams(),

    (urlBase, urlParams) => ({
        urlBase,
        urlParams
    })
);

export const makeSelectResultList = () => createSelector(
    selectHome,
    makeSelectUrlBase(),
    makeSelectUrlParams(),

    (home, urlBase, urlParams) => ({
        ...home,
        urlBase,
        urlParams
    })
);
