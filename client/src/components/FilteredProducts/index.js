import React, { useState, useEffect } from 'react'
import { Card, Result } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import Ajax from "../../services/Ajax";
import ProductCard from '../ProductCard'
import './styles.less';

const FilteredProducts = ({queryString}) => {
    const [loading, setLoading] = useState(false);
    const [productsPerPage, setProductsPerPage] = useState(2);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showLoading, setShow] = useState(true);

    useEffect(()=>{
        async function fetch(){
            setLoading(true);
            const data = await Ajax.get(`/products/filter?perPage=${productsPerPage}&${queryString}`);
            setFilteredProducts(data.products);
            setLoading(false);
            if (data.products.length === data.productsQuantity){
                setShow(false);
            } else {
                setShow(true)
            }
        }
        fetch()
    }, [queryString, productsPerPage])
    // console.log("filteredProducts",filteredProducts);
    // console.log("productsPerPage",productsPerPage);
    const onLoadMore = () => {
        setProductsPerPage(prevValue => prevValue + 2)
    }
    const showLoadingContainer = {
        display: showLoading ? 'flex' : 'none'
    }
    const styleNoItemsContainer = {
        justifyContent: filteredProducts.length === 0 ? 'center' : 'start'
    }
    const showNoItemsContainer = {
        display: filteredProducts.length === 0 ? 'block' : 'none'
    }

    return (
        <>
            <div className='filtered-products-container' style={styleNoItemsContainer}>
                {filteredProducts.map(item =>
                    <ProductCard key={item._id} product={item}/>
                )}
                <Card
                    className='load-more-btn'
                    bordered={true}
                    style={showLoadingContainer}
                    hoverable={true}
                    onClick={onLoadMore}
                >
                    <SyncOutlined className='load-more-spinner' spin={!!loading}/>
                    <p className='load-more-text'>Load More...</p>
                </Card>
                <div className='no-items-text-container' style={showNoItemsContainer}>
                    <Result
                        status="404"
                        title="Nothing to show"
                        subTitle="There are no items per your filters."
                    />
                </div>
            </div>
        </>

    )
}

export default FilteredProducts