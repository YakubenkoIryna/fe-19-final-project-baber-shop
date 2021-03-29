import * as actions from "./checkoutActionTypes";

const initialState = {
    step: 0,
    address: null,
    shipping: {price: 0},
    payment: null
}

const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.NEXT_STEP:
            return {
                ...state,
                step: state.step + 1
            }
        case actions.GO_TO_STEP:
            return {
                ...state,
                step: action.payload
            }
        case actions.SET_ADDRESS:
            return {
                ...state,
                address: action.payload
            }
        case actions.SET_SHIPPING:
            return {
                ...state,
                shipping: action.payload
            }
        case actions.SET_PAYMENT:
            return {
                ...state,
                payment: action.payload
            }
        case actions.PLACE_ORDER:
            return initialState;
        default:
            return state;
    }
}
export default checkoutReducer;