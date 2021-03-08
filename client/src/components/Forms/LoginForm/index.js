import React, {useState} from 'react';
import './styles.less'
import {useHistory, Link} from 'react-router-dom';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import LoginService from "../../../services/LoginService";
import Preloader from "../../Preloader";
import { useDispatch, useSelector } from 'react-redux'
import {authUser} from "../../../store/user/userAction";
import jwt_decode from "jwt-decode";
import {cartMerging} from '../../../services/cartAuth'
import { showModal } from "../../../store/modal/modalAction";

const LoginForm = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const products = useSelector(state => state.cart.products.products);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const showModalRegistration = () => {
    dispatch(showModal({ status: true, type: "RegistrationForm" }));
  };

    const onFinish = (customerData) => {
        setLoading(true);

        LoginService.LoginResult(customerData)
            .then(loginResult => {
                setLoading(false);
                localStorage.setItem('token', loginResult.token);

                const decoded = jwt_decode(loginResult.token);
                delete decoded.iat;
                if (props.handleRegisterModalClose) props.handleRegisterModalClose();
                dispatch(authUser({...decoded, isAuthenticated: true}));
                if (!decoded.isAdmin) history.push('/');
                cartMerging(products, dispatch)
            })
            .catch(err => {
                const error = err.response.data;
                setLoading(false);
                setError(error.loginOrEmail || error.password);
            })
    };

    return (
        <Form
            form={form}
            name="login-form"
            initialValues={{
                remember: true
            }}
            onFinish={onFinish}
        >
            <Form.Item className='login-form-title'>
                LogIn
            </Form.Item>
            <Form.Item
                name="loginOrEmail"
                className='login-form-item-margin'
                label='Login or Email'
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username or Email!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                       placeholder="Username"
                />
            </Form.Item>
            <Form.Item
                name="password"
                className='login-form-item-margin'
                label='Password'
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    placeholder="Password"
                />
            </Form.Item>
            <Form.Item className='login-form-item-margin'>
                <Link to="/forgot-password"
                      onClick={props.handleRegisterModalClose}>Forgot password?</Link>
            </Form.Item>
            <Form.Item>
                Do not have an account?
              {props.modal
                ? <span className="login-register_modal-link"
                        onClick={showModalRegistration}> Register now!</span>
                : <Link to="/register" onClick={props.handleRegisterModalClose}> Register now!</Link>
              }

            </Form.Item>
            <Button className='login-form-button'
                    type="primary"
                    htmlType="submit"
                    style={{width: props.btnWidth}}
            >
                Log in
            </Button>
            <div className='login-form-preloader'>
                {loading ? <Preloader/> : error}
            </div>
        </Form>
    );
};

export default LoginForm