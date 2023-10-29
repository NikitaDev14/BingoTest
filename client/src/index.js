import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import chatReducer from './redux/chat';
import { rootSaga } from './sagas/chat';
import { App } from './App';
import './index.scss';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        chat: chatReducer,
    },
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(
    document.getElementById('root'),
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
);
