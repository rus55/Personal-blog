import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from'react-redux';
import store, { history } from './store';
import Main from './components/Main';
import { ConnectedRouter } from 'connected-react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Main />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);

/*
    redux
    react-redux
    redux-logger
    redux-thunk
    connected-react-router
    history (Обязательно версии 4! https://www.npmjs.com/package/history)
 */
