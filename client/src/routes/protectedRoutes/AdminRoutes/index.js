import React, { useEffect} from "react";
import { Route} from "react-router-dom";
import { useSelector } from "react-redux";
import {useHistory} from "react-router";

const AdminRoutes = ({...rest }) => {
  const history = useHistory();
  const { exp, isAuthenticated, isAdmin } = useSelector(state => ({ ...state.user }));

  useEffect(() => {
    if (!(isAuthenticated && isAdmin && localStorage.token && exp && (exp > Date.now() / 1000))) {
      history.push('/');
    }
  }, [exp, isAuthenticated, isAdmin, history]);

  return <Route {...rest} />;
};

export default AdminRoutes;