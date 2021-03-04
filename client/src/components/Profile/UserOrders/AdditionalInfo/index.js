import {Col, Divider, Row} from "antd";
import React from "react";
import PropTypes from "prop-types";
import ProductsInOrder from "../ProductsInOrder";

const AdditionalInfo = ({order}) => {
    return (
        <Row>
            <Col xs={{span: 11}}>
                <Divider orientation="left">
                    <span className='divider-text'>Delivery </span>
                    <span className='divider-text'>information</span></Divider>
                <Row className='userProfileOrder_info'>
                    <Col>
                        <Row> {order.deliveryAddress.fullName}</Row>
                        <Row> {order.mobile}</Row>
                        <Row> {order.deliveryAddress.zip}</Row>
                        <Row> {order.deliveryAddress.city}</Row>
                        <Row> {order.deliveryAddress.address}</Row>
                    </Col>
                </Row>
            </Col>
            <Col xs={{span: 11, offset: 1}}>
                <Divider orientation="left">
                    <span className='divider-text'>Payment </span>
                    <span className='divider-text'>information</span>
                </Divider>
                <Row className='userProfileOrder_info'>
                    <Col xs={{span: 12}}>Subtotal:</Col>
                    <Col xs={{span: 11, offset: 1}}
                         lg={{span: 12, offset: 0}}>{order.totalSum}$</Col>
                </Row>
                <Row className='userProfileOrder_info'>
                    <Col xs={{span: 12}}>Shipping:</Col>
                    <Col
                        xs={{span: 11, offset: 1}} lg={{
                        span: 12,
                        offset: 0
                    }}>{order.shipping.id.price ? `${order.shipping.id.price}$` : "free shipping"}</Col>
                </Row>
                <Row className='userProfileOrder_info'>
                    <Col className='total' xs={{span: 12}}>Total:</Col>
                    <Col className='total'
                         xs={{span: 11, offset: 1}} lg={{
                        span: 12,
                        offset: 0
                    }}> {(order.shipping.id.price || 0) + order.totalSum}$</Col>
                </Row>
            </Col>
        </Row>
    )
}
export default AdditionalInfo;


ProductsInOrder.propTypes = {
    order: PropTypes.array,
};