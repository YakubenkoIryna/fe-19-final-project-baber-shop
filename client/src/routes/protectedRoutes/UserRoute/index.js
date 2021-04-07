import React from "react";
import {Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {Redirect} from "react-router";
import LoginService from "../../../services/LoginService";

const UserRoute = ({...rest}) => {
  const userData = useSelector(state => ({...state.user}));

  return !LoginService.isRegularUserAuthenticated(userData)
    ? <Redirect to='/login'/>
    : <Route {...rest} />
};

export default UserRoute;