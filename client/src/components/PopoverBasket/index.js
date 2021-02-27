import React from 'react'
import './popoverStyles.less'
import { Popover, Badge } from 'antd'
import { Link } from 'react-router-dom'
import { content } from './popoverBasketContent'
import { iconCart } from '../Header/img'
import { useSelector } from 'react-redux'
const PopoverBasket = () => {
  const productsLength = useSelector(state => state.cart.products.products.length)

  return (
    <Popover placement="bottomRight" align={{ offset: [70, 0] }} className='popover-basket-div' content={content}
             trigger="hover">
      <Link to="/cart">
        <img className="img-cart" src={iconCart} alt="icon"/>
        <Badge className='basket-badge' count={productsLength} size="small"
               offset={[-20, -20]}>
        </Badge>
        <span className="popover-basket-span" style={{ color: 'black', verticalAlign: 'super', marginLeft:'-10px'}}>Cart</span>
      </Link>
    </Popover>
  )
}

export default PopoverBasket


