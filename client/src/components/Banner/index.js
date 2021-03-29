import React, {useEffect, useState} from "react";
import CategoryBanner from "./CategoryBanner";
import ProductBanner from "./ProductsBanner";
import {Col, Row} from "antd";
import "./styles.less";
import CategoryService from "../../services/CategoryService";
import ProductService from "../../services/ProductService";

const Banner = ({title, config}) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        switch (config) {
            case 'cp': {
                CategoryService.getRandomCategories(1)
                    .then(cats => {
                        setCategories(cats || [])
                    });
                break;
            }
            case 'cc': {
                CategoryService.getRandomCategories(2)
                    .then(cats => setCategories(cats || []));
                break;
            }
            default: {
                //
            }
        }
        return () => setCategories([]);
    }, [config]);

    useEffect(() => {
        if (config === 'cp' && categories && categories.length > 0) {
            ProductService.getProductsForBanner(categories[0])
                .then(products => setProducts(products || []));
        }
        return () => setProducts([]);
    }, [config, categories]);

    return (
        <div className="banners">
            <p className="banners-title">
                {title}
            </p>
            <div className="banners-wrapper">
                <Row>
                    {categories.map(cat => {
                        return (
                            <Col xs={{span: 24}} md={{span: 12}} key={cat.id}>
                                <CategoryBanner category={cat}/>
                            </Col>
                        )
                    })}
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <ProductBanner products={products}/>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Banner;