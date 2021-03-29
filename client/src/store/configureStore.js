import {createStore, compose, applyMiddleware} from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import jwt_decode from "jwt-decode";
import {authUser} from "./user/userAction";
import axios from "axios";
import { persistStore } from 'redux-persist'

const checkTokenExpirationMiddleware = store => next => action => {
    const {dispatch} = store;
    if (localStorage.getItem("token")) {
        const decoded = jwt_decode(localStorage.getItem("token"));
        if (decoded?.exp && (decoded.exp < Date.now() / 1000)) {
            localStorage.removeItem("token");
            localStorage.removeItem("persist:root");
            dispatch(authUser({isAuthenticated: false}));
        }
    }
    next(action);
};

const setAxiosHeaders = store => next => action => {

    const token = localStorage.getItem('token');

    if (token){
        axios.defaults.headers.common.Authorization = token;
    } else {
        delete axios.defaults.headers.common.Authorization;
    }
    next(action);
}


const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f;

export const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk, checkTokenExpirationMiddleware, setAxiosHeaders), devTools)
);
export const persistor = persistStore(store)

export default {store, persistor};
