export const setToLastProducts = (products) => (dispatch) =>
    dispatch({
        type: 'SET_TO_LAST_PRODUCTS',
        payload: products,
    })