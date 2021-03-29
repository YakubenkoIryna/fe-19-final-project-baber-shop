import React, {useEffect, useState} from "react";
import Ajax from "../../../services/Ajax";
import {Button, message, Radio, Skeleton} from "antd";
import './styles.less';
import {useDispatch} from "react-redux";
import {setShipping} from "../../../store/checkout/checkoutAction";
import PropTypes from "prop-types";

const CheckoutShipping = ({disabled, onChange}) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [methods, setMethods] = useState([]);
    const [value, setValue] = useState(null);

    useEffect(() => {
        let isMounted = true;
        Ajax.get('/shipping-methods')
            .then(methods => {
                if (isMounted) {
                    methods = methods.filter(method => method.enabled);
                    setLoading(false);
                    setMethods(methods);
                    setValue(methods.filter(method => method.default).map(method => method.customId)[0]);
                }
            });
        return () => {isMounted = false};
    }, []);

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    const onRadioChange = (e) => {
        setValue(e.target.value);
    }

    const onFinish = async () => {
        if (value) {
            const price = methods.filter(m => m.customId === value)[0]?.costValue;
            dispatch(setShipping({id: value, price: price}));
            onChange();
        } else {
            message.error('Select a method or call us.');
        }
    }

    return (
        <div className="checkout-shipping">
            <h3>Shipping methods</h3>
            {loading
                ?
                <Skeleton/>
                :
                null
            }
            <div className="shipping-methods">
                <Radio.Group value={value} onChange={onRadioChange}>
                    {methods.map(method => {
                        return (
                            <Radio disabled={disabled} style={radioStyle} value={method.customId}
                                   key={method.customId}>{`${method.name} - $${method.costValue}`}</Radio>
                        )
                    })}
                </Radio.Group>
            </div>
            {!disabled
                ?
                <Button type="primary" onClick={onFinish}>
                    Submit
                </Button>
                :
                null
            }
        </div>
    )
}

CheckoutShipping.propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func
};

export default CheckoutShipping;