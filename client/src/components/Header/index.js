import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Col, PageHeader, Row} from "antd";
import {authUser} from "../../store/user/userAction";
import "./styles.less";
import {Link} from "react-router-dom";
import PopoverBasket from "../PopoverBasket/index";
import LiveSearch from './LiveSearch'
import {showModal} from "../../store/modal/modalAction";
import Login from "../Modal/LoginModal";
import RegistrationModal from "../Modal/RegisterModal";
import {headerLogo, iconContact, iconLogin} from './img/index'
import {LogoutOutlined} from "@ant-design/icons";
import Catalogue from "../Catalogue";


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
        <PageHeader style={{
            position: 'sticky',
            top:0,
            zIndex:999,
            height: 'auto',
            width: "100%",
            textAlign: "center",
            borderBottom: "2px solid black"
        }}>
            <Row className="header-row" gutter={[24, 24]}>

                <Col style={{padding: 2, marginTop: 10}} xs={6} sm={8} lg={8}>
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

                <Col style={{padding: 2}} xs={10} sm={8} lg={8}>
                    <div className='header-logo' key="home">
                        <Link to="/">
                            <img style={{width: '150px'}} src={headerLogo} alt="Logo"/>
                        </Link>
                    </div>
                </Col>
                <Col style={{padding: 2, marginTop: 10}} xs={8} sm={8} lg={8}>
                    <Row justify="center">
                        <Col>
                            <div className="header-contact" key="contact">
                                <a href="tel:+79998887766">
                                    <img style={{width: 19, verticalAlign:'inherit'}} src={iconContact} alt="icon-contact"/>
                                    <span className="contact-number">+380(067)6167008</span>
                                </a>
                            </div>
                        </Col>

                        <Col style={{marginLeft: 20}}>
                            {isAuthenticated &&
                            <div className="logoutBtn" key="logout" onClick={handleLogout}>
                                {<LogoutOutlined style={{fontSize:19}}/>} <span className="logout-title">LogOut</span>
                            </div>}
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row className="header-row" justify='center' gutter={[24, 24]}>


                <Col className="catalogue-box" style={{padding: 0,textAlign: '-webkit-center', zIndex:1}} xs={{span: 12, order: 1}} sm={{span: 12, order: 1}} lg={{span: 8, order: 1}}>
                    <div  key="plp">
                        <Catalogue/>

                    </div>
                </Col>
                <Col style={{ paddingTop:3, paddingLeft: 4, paddingRight:4}} className="search-box" xs={{span: 24, order: 3}} sm={{span: 21, order: 3}}
                     lg={{span: 8, order: 2}}>
                    <LiveSearch/>
                </Col>
                <Col style={{padding: 2}} xs={{span: 12, order: 2}} sm={{span: 12, order: 2}} lg={{span: 8, order: 3}}>
                    <div className="cart" key="cart">
                        <PopoverBasket/>
                    </div>
                </Col>
            </Row>
            <RegistrationModal/>
        </PageHeader>

    );
}

export default SiteHeader;

