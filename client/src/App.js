import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import "antd/dist/antd.less";
import {Layout} from "antd";
import SiteHeader from "./components/Header";
import MainRoutes from "./routes/MainRoutes";
import jwt_decode from "jwt-decode";
import {authUser} from "./store/user/userAction";
import Footer from "./components/Footer";
import AdminRouting from "./routes/AdminRouting";
import BreadCrumbs from "./components/BreadCrumbs";


const {Content} = Layout;

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {isAdmin} = useSelector(store => ({...store.user}));

  useEffect(() => {
    // to check token expiration once App_did_Mount, after it will be checked through middleware in redux with every store request
    if (localStorage.getItem("token")) {
      const decoded = jwt_decode(localStorage.getItem("token"));
      if (decoded?.exp && (decoded.exp < Date.now() / 1000)) {
        localStorage.removeItem("token");
        localStorage.removeItem("persist:root");
        dispatch(authUser({ isAuthenticated: false }));
        history.push("/");
      } else {
        delete decoded.iat;
        dispatch(authUser({ ...decoded, isAuthenticated: true }));
      }
    }
  }, [dispatch, history]);

    useEffect(() => {
        isAdmin && history.push("/admin");
    }, [history, isAdmin]);

    const layoutShop = () => (
        <Layout style={{backgroundColor:'white'}}>
            <SiteHeader/>
            <BreadCrumbs/>
            <Content className="site-layout" style={{padding: "0 0px"}}>
                <div className="site-layout-background" style={{minHeight: 380}}>
                    <MainRoutes/>
                </div>
            </Content>
            <Footer/>
        </Layout>
    );

    const layoutAdmin = () => <AdminRouting/>;

    return (
        <>
            {isAdmin ? layoutAdmin() : layoutShop()}
        </>
    );
};

export default App;