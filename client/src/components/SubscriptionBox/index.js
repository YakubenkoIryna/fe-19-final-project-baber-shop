import React, {useState} from 'react'
import {MailOutlined} from "@ant-design/icons";
import {Input, message} from "antd";
import MailService from "../../services/MailService";
import Preloader from "../Preloader";
import './styles.less';

const {Search} = Input;

const SubscriptionBox = () => {
    const [loading, setLoading] = useState(false);

    const subscribe = async (value) => {
        setLoading(true);
        const response = await MailService.subscribe(value);
        setLoading(false);
        if (response.status === MailService.OK) {
            message.success(response.message);
        } else {
            message.info(response.message);
        }
    }

    return (
        <div className='footer-socials_subscribePanel'>
            <Search
                // className='footer-socials_subscribePanel'
                placeholder='Enter your email'
                prefix={<MailOutlined/>}
                allowClear
                enterButton={loading ? <Preloader/> : 'Subscribe'}
                size="small"
                color='yellow'
                onSearch={value => subscribe(value)}
            />

        </div>
    )
}

export default SubscriptionBox;