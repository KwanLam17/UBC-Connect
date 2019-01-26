import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Landing from '../components/Landing';

import Header from './Header';

const App = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path="/" component={Landing}/>
                </div>
            </BrowserRouter>
        </div>
    );
};



export default hot(module)(App)