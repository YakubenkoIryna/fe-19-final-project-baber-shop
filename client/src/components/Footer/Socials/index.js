import React from "react";
import {Col} from "antd";
import {FacebookOutlined, InstagramOutlined, YoutubeOutlined} from "@ant-design/icons";
import SubscriptionBox from "../../SubscriptionBox";
import './styles.less'

const Socials = () => {

    return (
        <Col className="footer-socials" xs={24} sm={18} lg={7}>
            <SubscriptionBox/>
            <a href="https://www.instagram.com" target='_blank' rel='noopener noreferrer'>
                <InstagramOutlined className='footer-socials_icons'/>
            </a>
            <a href="https://www.facebook.com/" target='_blank' rel='noopener noreferrer'>
                <FacebookOutlined className='footer-socials_icons'/>
            </a>
            <a href="https://www.youtube.com/" target='_blank' rel='noopener noreferrer'>
                <YoutubeOutlined className='footer-socials_icons'/>
            </a>
        </Col>
    )
}
export default Socials;