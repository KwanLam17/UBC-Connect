import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <nav>
            <div className="nav-wrapper teal">
                <Link to="/" className="brand-logo left">K.L.</Link>
                <ul className="right">
                    <li>Work in progress...</li>
                    <li><Link to="/movies">Movie Searcher</Link></li>
                    <li><Link to="/sudoku">Sudoku</Link></li>
                </ul>
            </div>
            </nav>
        )
    }
}

export default Header;