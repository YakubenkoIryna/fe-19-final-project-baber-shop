import React, { useEffect} from "react";
import { Route} from "react-router-dom";
import { useSelector } from "react-redux";
import {useHistory} from "react-router";
import LoginService from "../../../services/LoginService";

const AdminRoutes = ({...rest }) => {
  const history = useHistory();
  const userData = useSelector(state => ({ ...state.user }));

  useEffect(() => {
    if (!LoginService.isAdminUserAuthenticated(userData)) {
      history.push('/');
    }
  }, [userData, history]);

  return <Route {...rest} />;
};

export default AdminRoutes;