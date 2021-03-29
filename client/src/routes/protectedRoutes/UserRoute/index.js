import React from "react";
import { Route} from "react-router-dom";
import { useSelector } from "react-redux";
import {Redirect} from "react-router";

const UserRoute = ({...rest }) => {
  const { exp, isAuthenticated, isAdmin } = useSelector(state => ({ ...state.user }));

  return !(isAuthenticated && !isAdmin && localStorage.token && exp && (exp > Date.now() / 1000))
      ? <Redirect to='/login'/>
      : <Route {...rest} />
};

export default UserRoute;