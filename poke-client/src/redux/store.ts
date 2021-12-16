import { createStore, applyMiddleware, Store, Dispatch } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import rootReducer from './root.reducer';
import RootState from './store.type';
import rootSaga from './root.saga';

const sagaMiddleware = createSagaMiddleware();

const middleware : any = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}

export const store: Store<RootState, any> & { dispatch: Dispatch } = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

sagaMiddleware.run(rootSaga);

export const persistedStore = persistStore(store);