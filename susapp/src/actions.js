// @flow

/*
 * App-wide actions for Redux.
 */

export const LOAD = 'LOAD';
export const CHOOSE_PRODUCT = 'CHOOSE_PRODUCT';
export const START_SURVEY = 'START_SURVEY';
export const ADD_SCORES = 'ADD_SCORES';
export const EMAIL_SUCCESS = 'EMAIL_SUCCESS';
// export const SET_FILTER = 'SET_FILTER';

export const load = () => {
    return {
        type: LOAD,
    }
}

export const chooseProduct = (name, desc, system) => {
    return {
        type: CHOOSE_PRODUCT,
        name,
        desc,
        system,
    }
}

export const startSurvey = (id, notes) => {
    return {
        type: START_SURVEY,
        id,
        notes,
    }
}

export const addScores = scores => {
    return {
        type: ADD_SCORES,
        scores,
    }
}

export const emailSuccess = success => {
    return {
        type: EMAIL_SUCCESS,
        success,
    }
}

// export const setFilter = filter => {
//     return {
//         type: SET_FILTER,
//         filter,
//     }
// }