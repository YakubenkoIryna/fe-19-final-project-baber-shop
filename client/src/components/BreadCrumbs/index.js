import React, {useState, useEffect} from "react";
import './styles.less';
import {useLocation} from "react-router-dom";

import {Breadcrumb, Typography} from 'antd';
import {HomeOutlined} from '@ant-design/icons';

const BreadCrumbs = () => {
    const {pathname, key, state} = useLocation();
    const [display, setDisplay] = useState('none');
    useEffect(() => {
        pathname === '/' ? setDisplay('none') : setDisplay('block');
    }, [pathname])

    console.log('useLocation -> ', useLocation());
    if (state) {
        console.log('State -> ', state)
    } else {
        console.log('State -> ', state)
    }
    const pathNames = pathname.split('/').filter(name => name);

    return (
        <Breadcrumb separator=">" className="breadcrumbs" style={{display}}>
            {pathNames.length > 0
                ? <Breadcrumb.Item key={key} href="/" className="breadcrumb-item">
                    <HomeOutlined/>
                </Breadcrumb.Item>
                : ''
            }

            {pathNames.map((name, index) => {
                const redirectTo = `/${pathNames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathNames.length - 1;

                let pageName;
                if (name === 'pages' || name === 'product') return '';
                if (state) {
                    const productName = state.product.name;
                    pageName = productName.charAt(0).toUpperCase() + productName.slice(1);
                }
                else pageName = name.charAt(0).toUpperCase() + name.slice(1);

                return (
                    isLast
                        ? <Breadcrumb.Item key={key} className="breadcrumb-item">
                            <Typography>{pageName}</Typography>
                        </Breadcrumb.Item>
                        : <Breadcrumb.Item key={key} href={redirectTo}
                                           className="breadcrumb-item">
                            <span>{pageName}</span>
                        </Breadcrumb.Item>
                )
            })}
        </Breadcrumb>
    )
}

export default BreadCrumbs
