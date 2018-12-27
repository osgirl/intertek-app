// Needed for redux-saga es6 generator support for older browsers
import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import createHistory from 'history/createBrowserHistory';
import { library } from '@fortawesome/fontawesome-svg-core';

import {
    faPlus,
    faUser,
    faSync,
    faTimes,
    faCaretDown,
    faCaretUp,
    faInfoCircle,
    faExclamationCircle,
    faExclamationTriangle,
    faHourglassStart,
    faHourglassHalf,
    faCheck,
    faChevronLeft,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';

// We need to import our css files in javascript because that's how webpack works
// These will be extracted to a separate file in production
import 'sass/bundles/styles.scss';

// Import root app
import App from 'containers/App';

// Import selector for `syncHistoryWithStore`
import configureStore from './store';

// Create fontawesome icon library
library.add(
    faPlus,
    faSync,
    faTimes,
    faCaretDown,
    faCaretUp,
    faInfoCircle,
    faExclamationCircle,
    faExclamationTriangle,
    faUser,
    faHourglassHalf,
    faHourglassStart,
    faCheck,
    faChevronLeft,
    faChevronRight
);

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);
