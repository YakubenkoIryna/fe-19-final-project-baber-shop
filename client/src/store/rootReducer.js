import { combineReducers } from 'redux'
import testReducer from './test_store/testReducer'
import modalHandler from './modal/modalReducer'
import preloaderReducer from './preloader/preloaderReducer'
import userReducer from "./user/userReducer";
import cartReducer from "./cart/cartReducer";
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import checkoutReducer from "./checkout/checkoutReducer";
import lastProducts from './lastViewedProducts/lastProductsReducer'

const persistConfig ={
  key:'root',
  storage,
  whitelist: ['user','cart', 'lastProducts']
}

const rootReducer = combineReducers({
  testProduct: testReducer,
  user: userReducer,
  modalHandler: modalHandler,
  preloader: preloaderReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  lastProducts,

})

export default persistReducer(persistConfig,rootReducer)
