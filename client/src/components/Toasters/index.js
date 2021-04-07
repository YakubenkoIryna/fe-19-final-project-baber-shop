import React from 'react';
import {useDispatch} from "react-redux";
import {Button} from "antd";
import {toast} from "react-toastify";
import {showModal} from "../../store/modal/modalAction";
import 'react-toastify/dist/ReactToastify.css';
import "./styless.less"
import {MehOutlined} from '@ant-design/icons'

const LoginModal = () => {
  const dispatch = useDispatch();
  const showModalLogin = () => {
    dispatch(showModal({status: true, type: 'LoginForm'}));
  };

  return (
    <div className="error-registration_wrapper">
      <p>You already registered</p>
      <Button className="error-registration_button" onClick={showModalLogin}>Click to Login</Button>
    </div>
  )
}
export const successRegisterToastCustom = () => {
  toast("Registration complete", {
    position: toast.POSITION.TOP_CENTER,
    className: 'success-register-toast',
    autoClose: 3000
  });
}
export const errorRegisterToastCustom = () => {
  toast(<LoginModal/>, {
    position: toast.POSITION.TOP_CENTER,
    className: 'error-register-toast',
    autoClose: 4000
  });
}
export const absentToday = () => {
  toast(<p>we don't have more today<MehOutlined/></p>, {
    position: toast.POSITION.TOP_CENTER,
    className: 'absent-today-toast',
    autoClose: 40000
  });
}


export const errorRegisterToast = () => {
  toast.error(<LoginModal/>, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 4000
  })
}
export const successRegisterToast = () => {
  toast.success("Registration complete", {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000
  })
}
