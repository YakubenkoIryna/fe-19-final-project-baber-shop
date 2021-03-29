import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Auth/Register';
import Login from '../pages/Auth/Login';
import Cart from '../pages/Cart';
import ProductList from '../pages/ProductList';
import ProductDetails from "../pages/ProductDetails";
import ErrorPage from '../pages/ErrorPage404';
import AdminCategory from '../pages/Admin/AdminCategory';
import StaticPage from "../pages/StaticPage";
import Profile from "../pages/Profile";
import UserRoute from "./protectedRoutes/UserRoute";
import UnsubscriptionPage from "../pages/UnsubscriptionPage";
import ProductPage from "../pages/ProductPage";
import OrderConfirmation from "../pages/OrderConfirmation";

const MainRoutes = () => {
    return (
        <Switch>
            <Route exact path={'/'} component={Home}/>
            <Route exact path={'/register'} component={Register}/>
            <Route exact path={'/login'} component={Login}/>
            <Route exact path={'/cart'} component={Cart}/>
            <Route exact path={'/error'} component={ErrorPage}/>
            <Route exact path={'/shop'} component={ProductList}/>
            <Route exact path={'/product-details'} component={ProductDetails}/>
            <UserRoute path={'/profile'} component={Profile}/>
            <Route exact path={'/admin/category'} component={AdminCategory}/>
            <Route exact path={'/pages/:id+'} component={StaticPage}/>
            <Route exact path={'/unsubscribe'} component={UnsubscriptionPage}/>
            <Route exact path="/product/:itemNo" component={ProductPage}/>
            <Route exact path={'/order-confirmation'} component={OrderConfirmation}/>
            <Route exact path="*" render={() => <h1>You are on the wrong page boy</h1>}/>
        </Switch>
    )
}

export default MainRoutes;



