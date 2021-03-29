import * as actions from "./checkoutActionTypes"
import {message} from "antd";
import {resetCart} from "../cart/actionCart";

export const nextStep = () => dispatch => dispatch({type: actions.NEXT_STEP});
export const goToStep = current => dispatch => dispatch({type: actions.GO_TO_STEP, payload: current});
export const setAddress = address => dispatch => dispatch({type: actions.SET_ADDRESS, payload: address});
export const setShipping = shipping => dispatch => dispatch({type: actions.SET_SHIPPING, payload: shipping});
export const setPayment = payment => dispatch => dispatch({type: actions.SET_PAYMENT, payload: payment});
export const placeOrder = (createOrder, history) => async (dispatch, getState) => {
    const {checkout: state} = getState();

    const {email, phone, ...rest} = state.address;

    try {
        const order = await createOrder(email, phone, rest, state.shipping, state.payment);
        console.log(order);
        dispatch({type: actions.PLACE_ORDER});
        dispatch(resetCart());
        history.push('/order-confirmation');
    } catch (err) {
        return message.error('Order is not placed due to error: ' + err);
    }

}

