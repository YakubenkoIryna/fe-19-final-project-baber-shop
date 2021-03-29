import React from 'react';
import {Steps} from "antd";
import {CheckCircleOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {goToStep} from "../../../store/checkout/checkoutAction";


const {Step} = Steps;

const CheckoutNavigation = () => {

    const state = useSelector(state => state.checkout);
    const dispatch = useDispatch();

    const onChange = (current) => {
        if (current <= (state.step + 1)) {
            dispatch(goToStep(current));
        }
    }

    return (
        <Steps current={state.step} onChange={onChange}>
            <Step title="Address" icon={state.step === 0 ? <CheckCircleOutlined/> : <></>} disabled={state.step < 0}/>
            <Step title="Shipping" icon={state.step === 1 ? <CheckCircleOutlined/> : <></>} disabled={state.step < 1}/>
            <Step title="Payment" icon={state.step === 2 ? <CheckCircleOutlined/> : <></>} disabled={state.step < 2}/>
        </Steps>
    )
}

export default CheckoutNavigation;