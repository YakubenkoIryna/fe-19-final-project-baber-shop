import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './styles.less';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Preloader = () => {

    return (
        <div className='spin'>
            <Spin indicator={antIcon} tip='Loading...' className='preloader'/>
        </div>
    )
}

export default Preloader;