import React, {useEffect} from "react";
import "./styles.less";
import ProductsContainer from "../../components/CartProductsContainer";
import {useDispatch, useSelector} from "react-redux";
import { TotalAmount } from "../../components/CartTotalQuaintity";
import Checkout from "../../components/Checkout";
import EmptyCartPage from "../../components/CartEmpty"
import {useLocation} from "react-router-dom";
import {showPage} from "../../store/breadcrumbs/crumbsAction";

const Cart = () => {
  const {pathname, key} = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showPage({pageName: 'Cart page', key}));
  }, [dispatch, key, pathname])

  const products = useSelector(state => state.cart.products.products);
  console.log("Cart-products--->>", products);

  return (
    <div className="cart-page-wrapper">
      {!products.length
        ? <EmptyCartPage/>
        : <>
          <div className="cart-container">
            <ProductsContainer products={products}/>
            <TotalAmount total="cartTotal"/>
          </div>
          <Checkout products={products}/>
        </>
      }
    </div>
  );
};

export default Cart;