// @flow

import { combineReducers } from 'redux';
import { LOAD,
         CHOOSE_PRODUCT,
         START_SURVEY, 
         ADD_SCORES, 
         EMAIL_SUCCESS} from './actions';

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

const product = (state = {}, action) => {
    switch(action.type) {
        case CHOOSE_PRODUCT:
            return {
                name: action.name,
                system: action.system,
            };
        default:
            return state;
    }
}

const survey = (state = {}, action) => {
    switch(action.type) {
        case START_SURVEY:
            return {
                id: action.id,
                notes: action.notes,
            };
        case ADD_SCORES: 
            return Object.assign({}, state, {
                scores: action.scores,
            });
        default:
            return state;
    }
}

const email = (state = null, action) => {
    switch(action.type) {
        case EMAIL_SUCCESS:
            return action.success;
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
    email,
    survey,
});