import React from "react";
import "./styles.less";
import {Col, Row} from "antd";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {nextStep, placeOrder} from "../../../store/checkout/checkoutAction";
import PropTypes from "prop-types";

const CheckoutSteps = ({children, onFinish}) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.checkout);
    const history = useHistory();

    const onStepChange = () => {
        const steps = children.length;
        const newStep = state.step + 1;
        if (newStep < steps) {
            dispatch(nextStep());
        } else {
            dispatch(placeOrder(onFinish, history));
        }
    }

    return (
        <Row className="checkout-steps" gutter={20}>
            {children.map((child, index) => {
                const Component = child.type;
                return (
                    <Col xs={{span: 24}} sm={{span: 24}} md={{span: 24}} lg={{span: 24}} xl={{span: 8}} key={index}
                         disabled={state.step !== index}>
                        <div className="checkout-step" disabled={state.step !== index}>
                            <Component {...child.props} disabled={state.step !== index} onChange={onStepChange}/>
                        </div>
                    </Col>
                )
            })}
        </Row>
    )
}

CheckoutSteps.propTypes = {
    onFinish: PropTypes.func.isRequired
};

export default CheckoutSteps;