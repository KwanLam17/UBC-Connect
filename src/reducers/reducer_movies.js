import { FETCH_MOVIE } from '../actions/index';

export default function(state = [], action) {

    if (action.error) {
        return state;
    }

    switch(action.type) {
        case FETCH_MOVIE:
            console.log('Action received' , action.payload.data.results);
            return action.payload.data; 
    }

    return state;
}