import {
  ADDING_TO_CART,
  DECREASE_QUANTITY,
  DELETE_FROM_CART,
  INCREASE_QUANTITY,
  RESET_CART,
  UPDATE_CART
} from "./actionTypes";

const initialState = {
  products: {
    products: []
  }
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDING_TO_CART:
      return {
        ...state,
        products: {products: [...state.products.products.filter(item => item.product._id !== action.payload.item.product._id), action.payload.item]}
      }
    case DELETE_FROM_CART:
      return {
        ...state,
        products: {products: [...state.products.products.filter(item => item.product._id !== action.payload._id)]}
      }
    case INCREASE_QUANTITY:
      return {
        ...state,
        products: {
          products: state.products.products.map(product =>
            product.product._id === action.payload._id
              ? {...product, cartQuantity: product.cartQuantity + 1}
              : product,
          )
        },
      };
    case DECREASE_QUANTITY:
      return {
        ...state,
        products: {
          products: state.products.products.map(product =>
            product.product._id === action.payload._id
              ? {...product, cartQuantity: product.cartQuantity - 1}
              : product,
          )
        },
      };
    case UPDATE_CART:
      return {
        ...state, products: {products: action.payload.updatedCart}
      }
    case RESET_CART:
      return initialState
    default:
      return state;
  }
};

export default cartReducer;