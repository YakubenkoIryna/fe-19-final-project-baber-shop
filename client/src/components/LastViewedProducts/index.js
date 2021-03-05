import React from 'react'
import { useSelector } from 'react-redux'
import { lastProductsSelector } from '../../store/lastViewedProducts/lastProductsSelectors'
import ProductCard from '../ProductCard'
import {Carousel, Col, Row} from "antd";
import './styles.less'


const LastViewedProducts = () => {
    const products = useSelector(lastProductsSelector)


    return (

        <> <h3 className="last-viewed_title"> Last viewed products</h3>
            <div className="last-viewed-div" >
                <Carousel >
                <Row gutter={24} justify={'center'}  className="last-viewed-box">
                {products.map(product => {
                    return (
                        <Col span={6} className='last-viewed-item' key={product.itemNo}>
                            <ProductCard key={product.itemNo} product={product}/>
                        </Col>
                    )
                })}
                </Row>
                </Carousel>
            </div>
        </>
    )
}

export default LastViewedProducts