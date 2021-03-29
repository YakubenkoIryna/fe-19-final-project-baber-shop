import React from 'react'
import {Route, Switch} from "react-router-dom";
import UserInformation from "../components/Profile/UserInformation";
import UserOrders from "../components/Profile/UserOrders";
import UserFavourites from "../components/Profile/UserFavourites";
import ChangePassword from "../components/Profile/ChangePassword";


const ProfileRoutes = () => {
    return (
        <Switch>
            <Route exact path={'/profile'} component={UserInformation}/>
            <Route exact path={'/profile/orders'} component={UserOrders}/>
            <Route exact path={'/profile/favourites'} component={UserFavourites}/>
            <Route exact path={'/profile/change-password'} component={ChangePassword}/>
        </Switch>
    )
}
export default ProfileRoutes;
