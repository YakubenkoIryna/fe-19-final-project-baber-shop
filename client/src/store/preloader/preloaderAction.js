import { SET_LOADING, CANCEL_LOADING } from '../actionTypes';

export const setLoading = () => ({
    type: SET_LOADING,
    payload: true
})

export const cancelLoading = () => ({
    type: CANCEL_LOADING,
    payload: false
})