import React from 'react';
import {Button, Result} from "antd";
import {Link} from "react-router-dom";
import './styles.less';

const OrderConfirmation = () => {

    return (
        <div className="order-confirmation">
            <Result
                status="success"
                title="Order has been placed!"
                extra={
                    <Link to="/">
                        <Button className='to-basket-button' type={'primary'}>Go to Homepage</Button>
                    </Link>
                }
            />
        </div>
    )
}

export default OrderConfirmation;