import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SearchList.css';

class SearchList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: []
        }
    }

    renderMovies() {
        return this.props.movies.map( movie => {
            const img_uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            return (
                <li key={movie.id}>
                    {movie.title}
                    <img src={img_uri} />
                </li>
            )
        })
    }

    render() {
        console.log(this.props.movies);
        if(this.props.movies == undefined){
            return (
                <div>
                    No results...
                </div>
            )
        }

        console.log(this.props.movies[0].poster_path);
        return (
            <ul>
                {this.renderMovies()}
            </ul>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.movies.results)
    return { movies: state.movies.results };
}

export default connect(mapStateToProps)(SearchList);