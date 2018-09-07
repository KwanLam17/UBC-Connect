import React, { Component } from 'react';

import Searchbar from './SearchBar';
import SearchList from './SearchList';

class Movies extends Component {
    render() {
        return (
            <div>
                <Searchbar />
                <SearchList />
            </div>
        )
    }
}

export default Movies;