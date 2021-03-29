import React, {useEffect} from 'react';
import RegistrationForm from '../../../components/Forms/RegistrationForm/index';
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import {showPage} from "../../../store/breadcrumbs/crumbsAction";


const Register = () => {
    const {key} = useLocation();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showPage({pageName: 'Registration', key}));
    }, [dispatch, key])

  return <RegistrationForm />;
}

export default Register