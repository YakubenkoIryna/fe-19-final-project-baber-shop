import React, {useState} from 'react';
import Cards from 'react-credit-cards';
import MaskedInput from 'antd-mask-input'
import {Row, Col, Form, Input} from "antd";
import 'react-credit-cards/es/styles-compiled.css';
import "./styles.less";
import PropTypes from "prop-types";

const PaymentForm = ({disabled, form}) => {
    const [state, setState] = useState({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    });

    const handleInputFocus = (e) => {
        setState({...state, focus: e.target.name});
    }

    const handleInputChange = (e) => {
        let {name, value} = e.target;

        if (['number', 'cvc', 'expiry'].includes(name)) {
            value = value.replaceAll(/\D/ig, "");
        }

        setState({...state, [name]: value});
    }

    const layout = {
        labelCol: {
            span: 24,
        },
        wrapperCol: {
            span: 24
        },
    };

    return (
        <div id="PaymentForm">
            <Cards
                cvc={state.cvc}
                expiry={state.expiry}
                focused={state.focus}
                name={state.name}
                number={state.number}
            />
            <Form
                form={form}
                {...layout}
                name="checkout-payment"
                initialValues={{
                    remember: true,
                }}
            >
                <Form.Item
                    label='Full name'
                    name='name'
                    rules={[{required: true, message: 'Please enter your Full Name!', max: 20}]}
                >
                    <Input name='name' placeholder='Full name' disabled={disabled}
                        onChange={handleInputChange} onFocus={handleInputFocus}/>
                </Form.Item>

                <Form.Item
                    label='Card number'
                    name='number'
                    rules={[{required: true, message: 'Please enter your card number!'}]}
                >
                    <MaskedInput name='number' placeholder='Card number' disabled={disabled}
                           onChange={handleInputChange} onFocus={handleInputFocus} mask='1111-1111-1111-1111' size={20}/>
                </Form.Item>

                <Row justify='space-between'>
                    <Col span={12}>
                        <Form.Item
                            label='Valid through'
                            name='expiry'
                            validateTrigger={'onBlur'}
                            rules={[{required: true, message: 'Please enter your expiration date!'}, ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (value) {
                                        const [month, year] = value.split('/');
                                        if (+month > 12 || +month < 1 || +year < +(new Date().getFullYear().toString().slice(2))) {
                                            // eslint-disable-next-line prefer-promise-reject-errors
                                            return Promise.reject("Please enter the valid date!")
                                        }
                                    }
                                    return Promise.resolve();
                                },
                            })]}
                        >
                            <MaskedInput name='expiry' placeholder='Valid through' disabled={disabled}
                                         onChange={handleInputChange} onFocus={handleInputFocus} mask='11/11' size={5}/>
                        </Form.Item>
                    </Col>
                    <Col span={6} offset={6}>
                        <Form.Item
                            label='CVV'
                            name='cvc'
                            rules={[{required: true, message: 'Please enter your CVV code!', max: 3}]}
                        >
                            <MaskedInput name='cvc' placeholder='CVV' disabled={disabled}
                                         onChange={handleInputChange} onFocus={handleInputFocus} mask='111' size={3}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

PaymentForm.propTypes = {
    disabled: PropTypes.bool,
    form: PropTypes.object
};

export default PaymentForm;