import React from 'react'
import './style.less'
import { PlusCircleFilled, MinusCircleFilled, DeleteFilled } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromCart, increaseQuantity, decreaseQuantity} from "../../store/cart/actionCart";
import { Link } from 'react-router-dom'

const CartItem = (props) => {
  const dispatch = useDispatch()
  const cartQuantity = props.product.cartQuantity
  const { imageUrls, name, currentPrice, _id, itemNo, quantity } = props.product.product
  const isAuth = useSelector(state => state.user.isAuthenticated)

  // const [auth,setAuth] = useState(isAuth)
  // const [quantity3,setQuantity] = useState(quantity)
  // useEffect(() => {
  //   if(isAuth === true) {
  //     setQuantity(quantity3 - cartQuantity)
  //     const product22 = props.product.product
  //     const quantityFromDB = props.product.product.quantity;
  //     console.log("quantityFromDB------->",quantityFromDB);
  //     // console.log("useEffect---product",product);
  //     const product = {...product22, quantity: product22.quantity - cartQuantity}
  //     console.log("product111---->",product);
  //     const newProduct2 = {product, cartQuantity: cartQuantity}
  //     console.log("newProduct2----->",newProduct2);
  //     // dispatch(addToCart(newProduct2, _id, isAuth));
  //   }
  // },[isAuth])
  // console.log("isAuth--->",isAuth);
  // console.log("quantity--->",quantity);
  // console.log("quantity3--->",quantity3);

  // const realQuantity = quantity - cartQuantity
  console.log("quantity",quantity,"cartQuantity",cartQuantity );
  // const realQuantity = quantity - cartQuantity
  // console.log("---quantity---quantity---",props.product.product);
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
            // : <p className="cart-item-available">Available: {realQuantity}</p>
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