// @flow

/*
 * App-wide actions for Redux.
 */

export const LOAD = 'LOAD';
export const CHOOSE_PRODUCT = 'CHOOSE_PRODUCT';
export const CLEAR_PRODUCT = 'CLEAR_PRODUCT';
export const START_SURVEY = 'START_SURVEY';
export const ADD_SCORE = 'ADD_SCORE';
export const COMPLETE_SURVEY = 'COMPLETE_SURVEY';
export const EMAIL_SUCCESS = 'EMAIL_SUCCESS';
// export const SET_FILTER = 'SET_FILTER';

export const load = () => {
    return {
        type: LOAD,
    }
}

export const chooseProduct = name => {
    return {
        type: CHOOSE_PRODUCT,
        name,
    }
}

export const clearProduct = () => {
    return {
        type: CLEAR_PRODUCT,
    }
}

export const startSurvey = (id, notes) => {
    return {
        type: START_SURVEY,
        id,
        notes,
    }
}

export const addScore = (question, score) => {
    return {
        type: ADD_SCORE,
        question,
        score,
    }
}

export const completeSurvey = (id, scores, notes) => {
    return {
        type: COMPLETE_SURVEY,
        id,
        scores,
        notes,
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