import React, {useEffect} from 'react';
import RegistrationForm from '../../../components/Forms/RegistrationForm/index';
import withModal from "../../../components/Modal/index";
import {showModal} from "../../../store/modal/modalAction"
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import {showPage} from "../../../store/breadcrumbs/crumbsAction";


const Register = () => {
    const {key} = useLocation();

    const typeOfModal = "RegistrationForm";
    const ModalReg = withModal(RegistrationForm, typeOfModal)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(showPage({pageName: 'Registration', key}));
    }, [dispatch, key])

    const showModalRegistration = () => {
        dispatch(showModal({status: true, type: typeOfModal}));
    };

    return (
        <>
            <ModalReg width={1000}/>
            <RegistrationForm/>
            <button onClick={showModalRegistration}>Click me to show Register Modal</button>
        </>
    )
}

export default Register