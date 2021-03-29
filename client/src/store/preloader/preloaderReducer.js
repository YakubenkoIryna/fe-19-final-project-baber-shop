import { SET_LOADING, CANCEL_LOADING } from '../actionTypes';

const initialState = {
    loading: false
}

function preloaderReducer (state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }

        case CANCEL_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}

export default preloaderReducer;