// @flow

import { combineReducers } from 'redux';
import { LOAD,
         CHOOSE_PRODUCT,
         START_SURVEY, 
         ADD_SCORES, 
         EMAIL_SUCCESS} from './actions';
import AppService from './AppService';

const data = (state = [], action) => {
    switch(action.type) {
        case LOAD:
            return [
                ...Array.from(AppService.getProducts().map(p => p.name)),
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
                desc: action.desc,
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

export default combineReducers({
    data,
    product,
    email,
    survey,
});