// @flow

import { combineReducers } from 'redux';
import { LOAD,
         CHOOSE_PRODUCT,
         CLEAR_PRODUCT,
         SET_FILTER, 
         START_SURVEY, 
         ADD_SCORE, 
         COMPLETE_SURVEY, 
         ADD_PRODUCT} from './actions';

import AppService from './AppService';

/*
 * App-wide reducers for Redux.
 */

const data = (state = [], action) => {
    switch(action.type) {
        case LOAD:
            return [
                ...Array.from(AppService.getProducts()),
            ];
        default:
            return state;
    }
}

const product = (state = null, action) => {
    switch(action.type) {
        case CHOOSE_PRODUCT:
            return action.name;
        case CLEAR_PRODUCT:
            return null;
        default:
            return state;
    }
}

const survey = (state = {}, action) => {
    switch(action.type) {
        case START_SURVEY:
            return Object.assign({}, state, {
                id: action.id,
                notes: action.notes,
            });
        case ADD_SCORE: 
            return Object.assign({}, state, {
                score: action.score,
                question: action.question
            })
        default:
            return state;
    }
}

// const filter = (state = [], action) => {
//     switch (action.type) {
//         case SET_FILTER:
//             return state;
//     }
// }

// const survey = (state = [], action) => {
//     switch (action.type) {
//         case START_SURVEY:
//             return [];
//         case ADD_SCORE:
//             return state;
//         case COMPLETE_SURVEY:
//             return state;
//     }
// }

export default combineReducers({
    data,
    product,
    // filter,
    survey,
});