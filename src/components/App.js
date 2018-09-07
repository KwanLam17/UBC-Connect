import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Header from '../components/Header';
import Sudoku from './sudoku/Sudoku';
import Landing from '../components/Landing';
import Movies from './movies/movies';

const App = () => {
    return (
        <div className="container">
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path="/" component={Landing}/>
                    <Route path="/sudoku" component={Sudoku}/>
                    <Route path="/movies" component={Movies}/>
                </div>
            </BrowserRouter>
        </div>
    );
};



export default hot(module)(App)