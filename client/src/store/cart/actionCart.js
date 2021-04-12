import {
  ADDING_TO_CART,
  DECREASE_QUANTITY,
  DELETE_FROM_CART,
  INCREASE_QUANTITY,
  RESET_CART,
  UPDATE_CART
} from "./actionTypes"
import Ajax from '../../services/Ajax'

const {deleteRequest, put} = Ajax


export const addToCart = (item, _id, isAuthenticated) => {
  if (isAuthenticated) {
    put('/cart/', _id)
  }
  return {
    type: ADDING_TO_CART,
    payload: {item}
  }
}

export const deleteFromCart = (_id, isAuth) => {
  if (isAuth) {
    deleteRequest('/cart', _id)
  }
  return {
    type: DELETE_FROM_CART,
    payload: {_id}
  }
}

export const increaseQuantity = (_id, isAuth) => {
  if (isAuth) {
    put('/cart/', _id)
  }
  return {
    type: INCREASE_QUANTITY,
    payload: {_id}
  }
}

export const decreaseQuantity = (_id, isAuth) => {
  if (isAuth) {
    deleteRequest('/cart/product', _id)
  }
  return {
    type: DECREASE_QUANTITY,
    payload: {_id}
  }
}

export const updateCart = (updatedCart) => {

  return {
    type: UPDATE_CART,
    payload: {updatedCart}
  }
}

export const resetCart = () => {

  return {
    type: RESET_CART,
  }
}

