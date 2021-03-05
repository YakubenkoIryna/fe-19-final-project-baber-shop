import React, {useEffect, useState} from "react";
import Ajax from "../../../services/Ajax";
import {Button, Form, message, Radio, Skeleton} from "antd";
import PaymentForm from "./PaymentForm";
import {useDispatch} from "react-redux";
import './styles.less';
import {setPayment} from "../../../store/checkout/checkoutAction";
import PropTypes from "prop-types";

const CheckoutPayment = ({disabled, onChange}) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const [methods, setMethods] = useState([]);
    const [value, setValue] = useState(null);

    useEffect(() => {
        let isMounted = true;
        Ajax.get('/payment-methods')
            .then(methods => {
                if (isMounted) {
                    methods = methods.filter(method => method.enabled);
                    setLoading(false);
                    setMethods(methods);
                    setValue(methods.filter(method => method.default).map(method => method.customId)[0]);
                }
            });
        return () => {
            isMounted = false
        };
    }, []);

    const onRadioChange = (e) => {
        setValue(e.target.value);
    }

    const onFinish = async () => {
        const values = await form.validateFields();
        if (value) {
            dispatch(setPayment({id: value, data: values}));
            onChange();
        } else {
            message.error('Select a method or call us.');
        }
    }

    const isCC = (methods.filter(method => method.customId === value)[0] || {}).paymentProcessor;

    const [form] = Form.useForm();

    return (
        <div className="checkout-payment">
            <h3>Payment methods</h3>
            {loading
                ?
                <Skeleton/>
                :
                null
            }
            <div className="payment-methods">
                <Radio.Group value={value} onChange={onRadioChange}>
                    {methods.map(method => {
                        return (
                            <Radio disabled={disabled} value={method.customId}
                                   key={method.customId}>{`${method.name}`}</Radio>
                        )
                    })}
                </Radio.Group>
            </div>
            <div className="selected-method">
                {
                    isCC
                        ? (
                            <PaymentForm disabled={disabled} form={form}/>
                        )
                        : null
                }
            </div>
            {!disabled
                ?
                <div className="payment-actions">
                    <Button type="primary" onClick={onFinish}>
                        Submit
                    </Button>
                </div>
                :
                null
            }
        </div>
    )
}

CheckoutPayment.propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func
};

export default CheckoutPayment;