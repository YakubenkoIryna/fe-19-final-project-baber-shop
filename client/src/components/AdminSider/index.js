import React from "react";
import {Layout, Menu} from "antd";
import {AccountBookOutlined, ContainerOutlined, LogoutOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authUser} from "../../store/user/userAction";
import {useHistory} from "react-router";

import './styles.less'


const {Item} = Menu;
const {Sider} = Layout;

const AdminSider = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, firstName} = useSelector((state => ({...state.user})));
  const history = useHistory();
  // const defaultSelected = "dashboard";

  const handleLogout = () => {
    if (!isAuthenticated) return;
    dispatch(authUser(false));
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <Sider
      className={'admin-sider-menue'}>
      <Menu
        mode="inline"
        // defaultSelectedKeys={[defaultSelected]}
        style={{height: "100%", borderRight: 0}}
      >
        <Item key="logout" icon={<LogoutOutlined/>} onClick={handleLogout}>
          {firstName}
        </Item>
        { /* <Item key="dashboard" icon={<DashboardOutlined />}> */}
        { /*  <Link to="/admin">Dashboard</Link> */}
        { /* </Item> */}
        <Item key="category" icon={<ContainerOutlined/>}>
          <Link to="/admin/category">Manage Categories</Link>
        </Item>
        <Item key="product" icon={<AccountBookOutlined/>}>
          <Link to="/admin/product">Manage Products</Link>
        </Item>
      </Menu>
    </Sider>
  );
};

export default AdminSider;