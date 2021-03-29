import React from 'react';
import {Link} from "react-router-dom";
import {Col, Image, Row} from "antd";
import PropTypes from 'prop-types';
import './styles.less';


const ProductsInOrder = ({products}) => {


    return (
        <>
            <Row className='userProfileOrder_tableNames'>
                <Col xs={{span: 4}}/>
                <Col xs={{span: 10}}/>
                <Col xs={{span: 3}}>Price</Col>
                <Col xs={{span: 4}}>Quantity</Col>
                <Col xs={{span: 3}}>Total</Col>
            </Row>

            {
                products.map(product => {
                    return (
                        <Link to={`/product/${product.product.itemNo}`}
                              key={product.product._id}
                              className='userProfileOrder-product'>
                            <Row>
                                <Col xs={{span: 4}} sm={{span: 4}}>
                                    <Image
                                        src={product.product.imageUrls[0].url}
                                        alt={product.product.name}
                                        width={60}
                                        height={60}
                                        preview={false}
                                    />
                                </Col>
                                <Col xs={{span: 10}}>{product.product.name}</Col>
                                <Col xs={{span: 3}}>{product.product.currentPrice}$</Col>
                                <Col xs={{span: 4}}>{product.cartQuantity}</Col>
                                <Col xs={{span: 3}}>{product.product.currentPrice * product.cartQuantity}$</Col>
                            </Row>
                        </Link>
                    )
                })
            }
        </>
    )
}

export default ProductsInOrder;

ProductsInOrder.propTypes = {
    products: PropTypes.array,
};