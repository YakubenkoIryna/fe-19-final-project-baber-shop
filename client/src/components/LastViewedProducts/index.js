import React from 'react'
import {useSelector} from 'react-redux'
import {lastProductsSelector} from '../../store/lastViewedProducts/lastProductsSelectors'
import ProductCard from '../ProductCard'
import './styles.less'
import Carousel from "react-elastic-carousel";

const LastViewedProducts = () => {
  const products = useSelector(lastProductsSelector)
  const breakPoints = [
    {width: 1, itemsToShow: 1},
    {width: 550, itemsToShow: 2},
    {width: 768, itemsToShow: 3},
    {width: 1200, itemsToShow: 4},
  ];

  return (
    <>
      {products.length === 1
        ? (<></>)
        : <> <h3 className="last-viewed_title"> Last viewed products</h3>
          <div className="last-viewed-div">
            <Carousel breakPoints={breakPoints}>
              {products.map(product => {
                return (
                  <div className='last-viewed-item' key={product.itemNo}>
                    <ProductCard key={product.itemNo} product={product}/>
                  </div>
                )
              })}
            </Carousel>
          </div>
        </>
      }
    </>
  )
}

export default LastViewedProducts