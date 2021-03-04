import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Col, Image, PageHeader, Row} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import {authUser} from "../../store/user/userAction";
import PopoverBasket from "../PopoverBasket/index";
import LiveSearch from './LiveSearch'
import {showModal} from "../../store/modal/modalAction";
import Login from "../Modal/LoginModal";
import {headerLogo, iconContact, iconLogin} from './img/index'
import Catalogue from "../Catalogue";
import "./styles.less";


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
        <PageHeader className='header'>
            <Row align="middle" gutter={[0, 12]}>
                <Col xs={{span: 2}}
                     sm={{span: 8}}
                >
                    {!isAuthenticated
                        ? (<>
                            <div className='header-login' key="login" onClick={showModalLogin}>
                                <img src={iconLogin} alt="User-icon"/>
                                <span className='login-title'>Login</span>
                            </div>
                            <Login/></>)
                        : (<Link to='/profile' className='header-profile'>
                            <img src={iconLogin} className="user-icon" alt="User-icon"/>
                            <span className="username"> Hello, {firstName}</span>
                        </Link>)
                    }
                </Col>
                <Col xs={{span: 16, offset: 2}}
                     sm={{span: 8, offset: 0}}
                     lg={{span: 6, offset: 1}}
                >
                    <div className='header-logo' key="home">
                        <Link to="/">
                            <Image src={headerLogo} alt="Logo" preview={false}/>
                        </Link>
                    </div>
                </Col>
                <Col xs={{span: 4}}
                     sm={{span: 6, offset: 2}}
                     lg={{span: 8, offset: 1}}

                >
                    <Row className='header-contact' justify="end">
                        <Col>
                            <div className="contact-number" key="contact">
                                <a href="tel:+380676167008">
                                    <img style={{fontSize: 22}} src={iconContact} alt="icon-contact"/>
                                    <span className="contact-number-text">+38(067) 616 70 08</span>
                                </a>
                            </div>
                        </Col>
                        {isAuthenticated &&
                        <Col xs={{offset: 4}} lg={{offset: 1}}>
                            <div className="logoutBtn" key="logout" onClick={handleLogout}>
                                <LogoutOutlined style={{width: 22}}/>
                                <span className="logout-title">LogOut</span>
                            </div>
                        </Col>
                        }
                    </Row>
                </Col>
            </Row>

            <Row justify='center' align="baseline" gutter={[{xs: 0, lg: 12, xl: 16}, 8]}>


                <Col className="catalogue-box"
                     xs={{span: 10, order: 1}}
                     sm={{span: 10}}
                     md={{span: 5}}
                     lg={{span: 6}}
                >
                    <div key="plp">
                        <Catalogue/>
                    </div>
                </Col>
                <Col className="search-box"
                     xs={{span: 24, order: 3}}
                     sm={{span: 24}}
                     md={{span: 12, offset: 1, order: 2}}
                     lg={{span: 12, offset: 0}}
                >
                    <LiveSearch/>
                </Col>
                <Col
                    xs={{span: 10, offset: 4, order: 2}}
                    sm={{span: 10}}
                    md={{span: 5, offset: 1, order: 3}}
                    lg={{span: 6, offset: 0}}
                >
                    <Link to="/cart">
                        <PopoverBasket/>
                    </Link>
                </Col>
            </Row>
        </PageHeader>

    );
}

export default SiteHeader;

