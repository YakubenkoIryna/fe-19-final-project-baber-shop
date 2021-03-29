import React from "react";
import { Result, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";
import "./styles.less"
const EmptyCartPage = () => {
  return (
      <Result className="empty-cart_wrapper"
        icon={<ShoppingCartOutlined className="empty-cart_icon"/>}
        title="Cart is empty"
        extra={<Link to={"/shop"}><Button className="empty-cart_button" type="primary">Go to shop</Button></Link>
        }
      />

  );
};

export default EmptyCartPage;

