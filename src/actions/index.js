import axios from 'axios';

const MOVIE_API_KEY = '7a5c40a1d0f6b5aa678b482c63823678';
const MOVIE_ROOT_URL = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&language=en-US&query=`;

export const FETCH_MOVIE = 'FETCH_MOVIE';

export const fetchMovie = (title) => async dispatch => {
    const url = `${MOVIE_ROOT_URL}${title}&page=1&include_adult=false`;
    const request = await axios.get(url);

    //console.log('Request:', request);
    
    dispatch({
        type: FETCH_MOVIE,
        payload: request
    });
}