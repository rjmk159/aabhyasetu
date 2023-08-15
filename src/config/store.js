import { applyMiddleware, createStore, compose } from 'redux';
import { combineReducers } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import appReducer, { initialState } from '../reducers/app.reducers';

const enhancers = [
  applyMiddleware(
    thunkMiddleware,
    createLogger({
      collapsed: true,
      // eslint-disable-next-line no-undef
      predicate: () => __DEV__,
    }),
  ),
];

/* eslint-disable no-undef */
const composeEnhancers =
  (__DEV__ &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
/* eslint-enable no-undef */

const enhancer = composeEnhancers(...enhancers);

const preloadedState = {
  app: initialState,

};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
};
const cartPersistConfig = {
  key: 'cart',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  app: persistReducer(appPersistConfig, appReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, preloadedState, enhancer);
