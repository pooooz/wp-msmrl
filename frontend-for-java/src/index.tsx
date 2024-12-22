import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './core/reducers';
import { rootSaga } from './core/sagas';

const container = document.getElementById('root')!;
const root = createRoot(container);

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [saga]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

saga.run(rootSaga);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
