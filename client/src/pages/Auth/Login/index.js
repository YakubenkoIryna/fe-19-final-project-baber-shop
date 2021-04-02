import React, {useEffect} from 'react'
import LoginForm from "../../../components/Forms/LoginForm";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {showPage} from "../../../store/breadcrumbs/crumbsAction";
import PropTypes from 'prop-types';
import './styles.less';

const Login = () => {
  const {key} = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showPage({pageName: 'Login', key}));
  }, [dispatch, key])

  return (
    <div className='login-page-wrapper'>
      <LoginForm/>
    </div>
  )
}

Login.propTypes = {
  key: PropTypes.string,
  dispatch: PropTypes.func
}

export default Login