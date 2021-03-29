import React from 'react';
import ProductCard from "../../ProductCard";
import './styles.less';
import {Col, Row} from "antd";

const ProductBanner = ({products}) => {

    return (
        <>
            <Row className='productBanner'>
                {products.map(product => {
                    return (
                        <Col span={12} key={product.itemNo}>
                            <ProductCard product={product}/>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}

export default ProductBanner;