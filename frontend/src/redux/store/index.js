import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import { reducer, initialState } from '../reducers';
import { configureStore } from "@reduxjs/toolkit";


const middleware = [thunk, promiseMiddleware];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    collapsed: true,
  });
  middleware.push(logger);
}

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState,
});

export default store;
