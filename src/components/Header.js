import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <nav>
            <div className="nav-wrapper teal">
                <Link to="/" className="brand-logo left">UBC Connect</Link>
                <ul className="right">
                    <li>Work in progress...</li>
                </ul>
            </div>
            </nav>
        )
    }
}

export default Header;