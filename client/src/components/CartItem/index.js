import React from 'react'
import './style.less'
import { PlusCircleFilled, MinusCircleFilled, DeleteFilled } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromCart, increaseQuantity, decreaseQuantity } from '../../store/cart/actionCart'
import { Link } from 'react-router-dom'

const CartItem = (props) => {
  const dispatch = useDispatch()
  const cartQuantity = props.product.cartQuantity
  const { imageUrls, name, currentPrice, _id, itemNo, quantity } = props.product.product
  const isAuth = useSelector(state => state.user.isAuthenticated)

  console.log("---quantity----quantity---",quantity);
  return (
    <div className="cart-item-wrapper">
      <div className="cart-item_item-image-description">
        <Link to={`/product/${itemNo}`}>
        <div>
          <img className="cart-item_item-image" src={imageUrls[0].url} alt={name}/>
        </div>
        </Link>
        <div className="cart-item_item-description">
          <Link to={`/product/${itemNo}`}>
            <p className='cart-item-link'>{name}</p>
          </Link>
          {quantity === 0
            ? <p className="cart-item-available-zero">Available: 0</p>
            : <p className="cart-item-available">Available: {quantity}</p>
          }
          <p>
            Lorem ipsum dolor sit amet,
            consectetur adipisicing elit.
            Delectus doloribus explicabo veniam!

          </p>
        </div>
      </div>
      <div className="cart-item_item-handler">
        <div className="item-handler_title">
          <span>Price for ps</span>
          <span>Ps</span>
          <span>Total for Item</span>
        </div>
        <div className="item-handler_main">
          <div className="item-handler_main-price"><span className="item-handler_main-total-mobile">Price</span><span>${currentPrice}</span></div>
          <div className="item-handler_main-quantity">
            {cartQuantity === 0
              ? <MinusCircleFilled/>
              : <MinusCircleFilled onClick={() =>  dispatch(decreaseQuantity(_id,isAuth,cartQuantity))}/>
            }
            <span>{cartQuantity}</span>
            {quantity === 0
            ? <PlusCircleFilled />
            : <PlusCircleFilled onClick={() => dispatch(increaseQuantity(_id,isAuth,cartQuantity))}/>
            }
          </div>
          <div className="item-handler_main-total"><span className="item-handler_main-total-mobile">Total</span><span>${(currentPrice * cartQuantity).toFixed(2)}</span></div>
          <div className="item-handler_main-basket" onClick={() => dispatch(deleteFromCart(_id, isAuth))}>
            <DeleteFilled/>
          </div>
        </div>
        <div className="cart-item-available-mobile">
          {quantity === 0
            ? <p className="cart-item-available-zero">Available: 0</p>
            : <p className="cart-item-available">Available: {quantity}</p>
          }
          {/* <p className="cart-item-available">Available: {quantity}</p> */}
        </div>
        <div className="item-handler_main-basket-mobile" onClick={() => dispatch(deleteFromCart(_id, isAuth))}>
          <DeleteFilled/>
        </div>
      </div>
    </div>
  )
}

export default CartItem