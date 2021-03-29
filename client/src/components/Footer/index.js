import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Col, Image, Layout, Row} from 'antd';
import Ajax from "../../services/Ajax";
import Socials from "./Socials";
import './styles.less'

const {get} = Ajax;
const {Footer: AntFooter} = Layout;

const Footer = () => {

    const [links, setLinks] = useState([]);
    useEffect(() => {
        let cleanupFunction = false;
        get('/links')
            .then(links => {
                if (!cleanupFunction) setLinks(links || [])
            })
        return () => cleanupFunction = true
    }, [])

    return (

        <AntFooter className='footer'>
            <Row justify='center' gutter={[5, 20]}>
                <Col xs={24} sm={24} lg={5}>
                    <div className='footer-logo'>
                        <Link to="/">
                            <Image src="/logo/footerLogo/logo_white.png" alt="logo-white" preview={false}/>
                        </Link>
                    </div>
                </Col>


                {links.map(mainLink => {
                    return (
                        <Col key={mainLink._id} className="footer-nav" xs={24} sm={8} lg={4}>
                            <Link className='footer-header_link' to={`/pages${mainLink.url}`}>
                                {mainLink.title}
                            </Link>
                            {
                                mainLink.links.map(link => {
                                    return (
                                        <Link className='footer-link' key={link._id} to={`/pages${link.url}`}>
                                            {link.description}
                                        </Link>)
                                })
                            }
                        </Col>
                    )
                })
                }

                <Socials/>
            </Row>
            <Row justify='center'>
                <Col className='footer-copyright'>Copyright © Barber All Rights Reserved 2021</Col>
            </Row>
        </AntFooter>
    )
}

export default Footer;