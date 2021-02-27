import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Col, PageHeader, Row} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import {authUser} from "../../store/user/userAction";
import PopoverBasket from "../PopoverBasket/index";
import LiveSearch from './LiveSearch'
import {showModal} from "../../store/modal/modalAction";
import Login from "../Modal/LoginModal";
import {headerLogo, iconContact, iconLogin} from './img/index'
import Catalogue from "../Catalogue";
import BreadCrumbs from "../BreadCrumbs";
import "./styles.less";
// import './styles1.less'


const SiteHeader = () => {
    const dispatch = useDispatch();
    const {isAuthenticated, firstName} = useSelector((state => ({...state.user})))

    const showModalLogin = () => {
        dispatch(showModal({status: true, type: "LoginForm"}));
    };

    const handleLogout = () => {
        if (!isAuthenticated) return
        dispatch(authUser({isAuthenticated: false}))
        localStorage.removeItem('token');
    }

    return (
        <PageHeader  className='barberHeader'>
            <Row align="middle" gutter={[24, 24]}>

                <Col className='profile-col' xs={5} sm={{span:6, offset:2}} lg={8}>
                    {!isAuthenticated
                        ? (<>
                            <div className="login" key="login" onClick={showModalLogin}>
                                <img src={iconLogin}  alt="User-icon"/>
                                <span className="login-title">LogIn</span>
                            </div>
                            <Login/></>)
                        : (<Link to='/profile' className='header-profile'>
                            <img src={iconLogin} className="user-icon" alt="User-icon"/>
                            <span className="username"> Hello, {firstName}</span>
                        </Link>)
                    }
                </Col>

                <Col xs={13} sm={8} lg={8}>
                    <div className='header-logo' key="home">
                        <Link to="/">
                            <img style={{width: '150px'}} src={headerLogo} alt="Logo"/>
                        </Link>
                    </div>
                </Col>
                <Col xs={6} sm={8} lg={8}>
                    <Row justify="space-evenly">
                        <Col xs={12}>
                            <div className="header-contact" key="contact">
                                <a href="tel:+79998887766">
                                    <img style={{fontSize: 22}} src={iconContact} alt="icon-contact"/>
                                    <span className="contact-number">+380(067)6167008</span>
                                </a>
                            </div>
                        </Col>

                        <Col xs={12}>
                            {isAuthenticated &&
                            <div className="logoutBtn" key="logout" onClick={handleLogout}>
                                {<LogoutOutlined style={{width:22}}/>} <span className="logout-title">LogOut</span>
                            </div>}
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row justify='center' align="baseline" gutter={[24, 24]}>


                <Col className="catalogue-box" xs={{span: 12, order: 1}} sm={{span: 10, order: 1}} md={{span: 6, order: 1}} lg={{span: 8, order: 1}}>
                    <div  key="plp">
                        <Catalogue/>
                    </div>
                </Col>
                <Col xs={{span: 12, order: 2}} sm={{span: 10, offset:4, order: 2}} md={{span: 5, offset:1, order: 3}} lg={{span: 8, order: 3}}>

                    <div className="cart" key="cart">
                        <PopoverBasket/>
                    </div>
                </Col>
                <Col className="search-box" xs={{span: 24, order: 3}} sm={{span: 24, order: 3}} md={{span: 11, offset:1, order: 2}}
                     lg={{span: 8, order: 2}}>
                    <LiveSearch/>
                </Col>

            </Row>

            <Row className="header-row header-breadcrumbs" gutter={[24, 24]}>
                    <BreadCrumbs/>
            </Row>

        </PageHeader>

    );
}

export default SiteHeader;

