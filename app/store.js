import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    const middlewares = [
        sagaMiddleware,
        routerMiddleware(history)
    ];

    const enhancers = [
        applyMiddleware(...middlewares)
    ];

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = process.env.NODE_ENV !== 'production'
        && typeof window === 'object'
        && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
    /* eslint-enable */

    const store = createStore(
        createReducer(history),
        initialState,
        composeEnhancers(...enhancers)
    );

    // Extensions
    store.runSaga = sagaMiddleware.run;
    sagas.map(store.runSaga);

    // Make reducers hot reloadable, see http://mxs.is/googmo
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            import('./reducers').then((reducerModule) => {
                const createReducers = reducerModule.default;
                store.replaceReducer(createReducers());
            });
        });
    }

    return store;
}
