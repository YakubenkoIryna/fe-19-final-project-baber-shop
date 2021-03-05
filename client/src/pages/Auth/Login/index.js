import React, {useEffect} from 'react'
import './styles.less'
import LoginForm from "../../../components/Forms/LoginForm";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {showPage} from "../../../store/breadcrumbs/crumbsAction";

const Login = () => {
    const {key} = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showPage({pageName: 'Login', key}));
    }, [dispatch, key])

    return (
        <div className='login-page-wrapper'>
            <LoginForm />
        </div>
    )
}

export default Login