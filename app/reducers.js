// ======================================================================================
// Combine all reducers in this file and export the combined reducers.
// If we were to do this in store.js, reducers wouldn't be hot reloadable.
// ======================================================================================

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// ======================================================================================
// All application reducers should be imported here
// ======================================================================================

import appReducer from 'containers/App/reducer';
import loginReducer from 'containers/LoginPage/reducer';
import homeReducer from 'containers/HomePage/reducer';

// ======================================================================================
// Global application state
// ======================================================================================

export default function createReducer(history) {
    return combineReducers({
        app: appReducer,
        router: connectRouter(history),
        login: loginReducer,
        home: homeReducer
    });
}
