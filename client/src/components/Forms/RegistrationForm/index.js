import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
import { collectionItemsForm } from "./collectionItems";
import { formItemLayout2, tailFormItemLayout} from "./formLayouts"
import { showModal } from "../../../store/modal/modalAction";
import { authUser } from "../../../store/user/userAction";
import LoginService from "../../../services/LoginService";
import RegisterService from "../../../services/RegisterService";
import { ToastContainer } from "react-toastify";
import { errorRegisterToastCustom, successRegisterToastCustom } from "../../Toasters";
import jwt_decode from "jwt-decode";
import "./styles.less";

import { cartMerging } from '../../../services/cartAuth'

const RegistrationForm = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const products = useSelector(state => state.cart.products.products);
  const showModalLogin = () => {
    dispatch(showModal({status: true, type: 'LoginForm'}));
  };

  const onFinish = (values) => {
    const newCustomer = { ...values, isAdmin: false };
    const userData = {}
    RegisterService.RegisterResult(newCustomer)
      .then(savedCustomer => {
        userData.loginOrEmail = savedCustomer.email;
        userData.password = values.password;
        LoginService.LoginResult(userData)
          .then(loginResult => {
            localStorage.setItem('token', loginResult.token);
            const decoded = jwt_decode(loginResult.token);
            delete decoded.iat
            dispatch(authUser({...decoded, isAuthenticated: true}));
            cartMerging(products, dispatch)
            if (!props.modal) history.push('/');
            successRegisterToastCustom()
            if (props.handleRegisterModalClose) props.handleRegisterModalClose();
          })
          .catch(err => {
            errorRegisterToastCustom()
            console.log("login error",err);
            const error = err.response.data;
            console.log("error",error);
          })
      })
      .catch(err => {
        errorRegisterToastCustom()
        console.log("Registration error");
        const error = err.response.data;
        console.log("error",error);
        console.log(err);
      });
  };


  return (
    <>
      <Form
        {...formItemLayout2}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          phone: "+380"
        }}

        scrollToFirstError
      >
        <Form.Item className='registration-form-title' {...tailFormItemLayout}>
          Register
        </Form.Item>
        {collectionItemsForm.map(formItem =>
          <Form.Item name={formItem.name}
                     label={formItem.label}
                     rules={formItem.rules}
                     key={formItem.name}>
            {formItem.name === "password"
              ? <Input.Password maxLength={formItem.maxLength} placeholder={formItem.label} />
              : <Input maxLength={formItem.maxLength} placeholder={formItem.label} onKeyPress={formItem.onKeyPress}/>
            }
          </Form.Item>
        )}
        <Form.Item {...tailFormItemLayout}>
          <Button className='registration-button' type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          Already registered?
          {props.modal
          ? <span className="login-register_modal-link" onClick={showModalLogin}> Login now</span>
          : <Link to="/login"> Login now</Link>
          }
        </Form.Item>
        <ToastContainer/>
      </Form>
    </>
  );
};

export default RegistrationForm;

