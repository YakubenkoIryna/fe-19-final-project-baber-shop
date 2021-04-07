import React, {useEffect, useState} from 'react'
import './style.less'
import {DeleteFilled, MinusCircleFilled, PlusCircleFilled} from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import {decreaseQuantity, deleteFromCart, increaseQuantity} from "../../store/cart/actionCart";
import {Link} from 'react-router-dom'

const CartItem = (props) => {
  const dispatch = useDispatch()
  const cartQuantity = props.product.cartQuantity
  const {imageUrls, name, currentPrice, _id, itemNo, quantity} = props.product.product
  const isAuth = useSelector(state => state.user.isAuthenticated)
  const [realQuantity, setRealQuantity] = useState(quantity)
  useEffect(() => {
    setRealQuantity(quantity - cartQuantity)
  }, [cartQuantity, quantity])

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
          {realQuantity === 0
            ? <p className="cart-item-available available-zero">Available: 0</p>
            : <p className="cart-item-available">Available: {realQuantity}</p>
          }

          <p>
            {(props.product.product.description).slice(0, 92)}<span>...</span>
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
          <div className="item-handler_main-price"><span
            className="item-handler_main-total-mobile">Price</span><span>${currentPrice}</span></div>
          <div className="item-handler_main-quantity">
            {cartQuantity === 1
              ? <MinusCircleFilled onClick={() => dispatch(deleteFromCart(_id, isAuth))}/>
              : <MinusCircleFilled onClick={() => dispatch(decreaseQuantity(_id, isAuth, cartQuantity))}/>
            }
            {realQuantity < 0 &&
            dispatch(deleteFromCart(_id, isAuth))
            }
            <span>{cartQuantity}</span>
            {realQuantity === 0
              ? <PlusCircleFilled/>
              : <PlusCircleFilled onClick={() => dispatch(increaseQuantity(_id, isAuth, cartQuantity))}/>
            }
          </div>
          <div className="item-handler_main-total"><span
            className="item-handler_main-total-mobile">Total</span><span>${(currentPrice * cartQuantity).toFixed(2)}</span>
          </div>
          <div className="item-handler_main-basket" onClick={() => dispatch(deleteFromCart(_id, isAuth))}>
            <DeleteFilled/>
          </div>
        </div>
        <div className="cart-item-available-mobile">
          {realQuantity === 0
            ? <p className="cart-item-available-zero">Available: 0</p>
            : <p className="cart-item-available">Available: {realQuantity}</p>
          }
        </div>
        <div className="item-handler_main-basket-mobile" onClick={() => dispatch(deleteFromCart(_id, isAuth))}>
          <DeleteFilled/>
        </div>
      </div>
    </div>
  )
}

export default CartItem