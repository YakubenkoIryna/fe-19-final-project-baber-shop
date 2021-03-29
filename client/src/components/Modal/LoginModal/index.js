import React from 'react';
import './styles.less'
import withModal from "../../../components/Modal/index";
import LoginForm from "../../Forms/LoginForm";

const Login = () => {
    const typeOfModal = "LoginForm";
    const ModalLogin = withModal(LoginForm, typeOfModal);

    return (
        <ModalLogin width={500} btnWidth={'100%'}/>
    )
}

export default Login