// for redux side
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import './index.css';
import App from './components/App';

const store = createStore(() => [], {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);