import React from 'react'
import './popoverStyles.less'
import {Badge, Popover} from 'antd'
import {content} from './popoverBasketContent'
import {iconCart} from '../Header/img'
import {useSelector} from 'react-redux'

const PopoverBasket = () => {
    const products = useSelector(state => state.cart.products.products)
    const filteredProducts = products.filter(product => product.product.quantity !== 0)

    return (
        <Popover placement="bottom" className='popover-basket-div' content={content}
                 trigger="hover">
            <div className="cart" key="cart">
                <img className="img-cart" src={iconCart} alt="icon"/>
                <Badge className='basket-badge' count={filteredProducts.length} size="small"
                       offset={[-20, -20]}>
                </Badge>
                <span className="popover-basket-span"
                      style={{color: 'black', verticalAlign: 'super', paddingLeft: '5px'}}>Cart</span>
            </div>
        </Popover>
    )
}

export default PopoverBasket


