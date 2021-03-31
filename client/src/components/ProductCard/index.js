import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {Button, Image} from 'antd';
import {DeleteOutlined, StarFilled, StarOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import Ajax from "../../services/Ajax";
import WishListService from '../../services/WishListServise'
import './styles.less';
import {addToCart, deleteFromCart} from "../../store/cart/actionCart";
import {setToLastProducts} from '../../store/lastViewedProducts/lastProductsAction'
import LoginService from "../../services/LoginService";


const {put, deleteRequest} = Ajax;
const {checkIfProductInWishList} = WishListService


const ProductCard = ({product, refresh}) => {

  const {name, currentPrice, imageUrls, _id, quantity} = product;
  const userData = useSelector(state => ({...state.user}));
  const history = useHistory();
  const dispatch = useDispatch();
  const [inWishlist, setInWishlist] = useState(false);

  const productsFromStore = useSelector(state => state.cart.products.products);
  const filteredProducts = productsFromStore.filter(item => item.product._id === _id);
  const onAddToCart = (e) => {
    e.preventDefault();
    const newProduct2 = {product, cartQuantity: +1}
    dispatch(addToCart(newProduct2, _id, userData.isAuthenticated));
  }

  const forwardToCardDetails = () => {
    return ({
      pathname: `/product/${product.itemNo}`,
      state: {product: product},
    })
  }

  const addToWishlist = async () => {
    if (!LoginService.isRegularUserAuthenticated(userData)) {
      history.push('/login');
    } else {
      if (!inWishlist) {
        await put(`/wishlist/`, _id)
        setInWishlist(true)
        if (typeof (refresh) === 'function') refresh(_id)

      } else {
        await deleteRequest(`/wishlist/`, _id)
        setInWishlist(false)
        if (typeof (refresh) === 'function') refresh(_id)
      }
    }
  }
  const addToLastProducts = () => {
    dispatch(setToLastProducts(product))
  }


  useEffect(() => {
    if (LoginService.isRegularUserAuthenticated(userData)) {
      return checkIfProductInWishList(_id, setInWishlist, true);
    }
  }, [_id, userData]);

  const inWishlistIcon = inWishlist
    ? <StarFilled className='favourite-icon'/>
    : <StarOutlined className='favourite-icon'/>;

  return (
    <>
      <div className='productCard'>
        <Link to={forwardToCardDetails()} onClick={addToLastProducts}>
          <div className='productCard-title'>{name}</div>
          <div className='productCard-picture'>
            <Image src={imageUrls[0]?.url} preview={false}/>
            <div className='productCard-price'>{currentPrice}$</div>
          </div>
        </Link>
        <div className='productCard-buttons'>
          <Button className='btn-favourite' onClick={addToWishlist}>
            {inWishlistIcon}
          </Button>

          {quantity === 0
            ? <Button className='btn-addToCard btn-disabled' disabled={true}>SOLD OUT</Button>
            : filteredProducts.length === 1
              ? <Button className='btn-addToCard add-disabled'
                        onClick={() => dispatch(deleteFromCart(_id))}><DeleteOutlined/> from cart</Button>
              : <Button className='btn-addToCard' onClick={onAddToCart}>Add to cart</Button>
          }
        </div>
      </div>
    </>
  )
}

export default ProductCard;