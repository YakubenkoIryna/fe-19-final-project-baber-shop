import React, {useEffect, useState} from "react";
import {Col, Collapse, Typography} from 'antd';
import {ShoppingTwoTone} from '@ant-design/icons';
import Ajax from "../../../services/Ajax";
import ProductsInOrder from "./ProductsInOrder";
import AdditionalInfo from "./AdditionalInfo";
import Preloader from "../../Preloader";
import {showPage} from "../../../store/breadcrumbs/crumbsAction";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import profileBreadcrumbs from "../../../functions/profileBreadcrumbs";
import '../style.less'
import './styles.less'

const {get} = Ajax;
const {Panel} = Collapse;
const {Title} = Typography;

const UserOrders = () => {
    const {pathname, key} = useLocation();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const dateFormat = require("dateformat");

    const callback = (key) => {
        console.log(key);
    }

    useEffect(() => {
        const currentPage = profileBreadcrumbs(pathname, 'Personal information', key);
        dispatch(showPage(currentPage));

            let cleanupFunction = false;
            get('/orders')
                .then(orders => {
                    if (!cleanupFunction) {
                        setLoading(false)
                        if (orders !== null) {
                            console.log('orders ==>>', orders)
                            setOrders(orders || [])
                        }
                    }
                })
            return () => cleanupFunction = true
        }, [dispatch, key, pathname]
    )

    return (
        <>
            {
                loading
                    ?
                    <Col className='profile-preloader'> <Preloader/></Col>
                    :
                    (orders.length > 0)
                        ?
                        <Col xs={{span: 24}} sm={{span: 12, offset: 2}}>
                            <Collapse className='userProfileOrder' onChange={callback}>
                                {orders.map(order =>
                                    <Panel key={order._id}
                                           className='userProfileOrder_container'
                                           header={
                                               <>
                                                   <div>Order <span
                                                       className='userProfileOrder_container-header'>#{order.orderNo}</span> from {dateFormat(order.date, 'dd/mm/yyyy')}
                                                   </div>
                                               </>
                                           }>
                                        <ProductsInOrder products={order.products}/>
                                        <AdditionalInfo order={order}/>
                                    </Panel>
                                )}
                            </Collapse>
                        </Col>
                        :
                        <Col className='userProfileOrderFav-emptyContainer' xs={{span: 20, offset: 2}}
                             sm={{span: 8, offset: 4}}>
                            <Title>My orders</Title>
                            <ShoppingTwoTone twoToneColor='#fadb14' className='userProfileOrderFav-icon'/>
                            <Title level={3}>You haven't placed any orders in our store yet.</Title>
                        </Col>
            }
        </>
    )
}

export default UserOrders;