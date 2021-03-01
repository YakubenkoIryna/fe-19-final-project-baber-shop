import React from "react";
import "./styles.less";
import ProductsContainer from "../../components/CartProductsContainer";
import { useSelector } from "react-redux";
import { TotalAmount } from "../../components/CartTotalQuaintity";
import Checkout from "../../components/Checkout";
import EmptyCartPage from "../../components/CartEmpty"
import { ToastContainer } from "react-toastify";

const Cart = () => {
  const products = useSelector(state => state.cart.products.products);

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
          <ToastContainer/>
        </>
      }
    </div>
  );
};

export default Cart;