import { combineReducers } from 'redux';
import movieReducer from './reducer_movies';

export default combineReducers({
    movies: movieReducer
});