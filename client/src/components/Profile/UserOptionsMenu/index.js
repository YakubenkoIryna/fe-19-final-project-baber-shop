import React from 'react'
import {NavLink} from "react-router-dom";
import {Button, Col, Row} from "antd";
import './styles.less';


const UserOptionsMenu = ()=> {
    return(
        <Col className='userOptionsMenu' xs={{span: 20, offset: 2}} sm={{span: 8,offset: 0}}
             md={{span: 6, offset: 2}}  xl={{span: 5, offset: 2}}>
            <Row>
                <NavLink exact to="/profile" activeClassName="selected">
                    <Button type='primary'>Personal information</Button>
                </NavLink>
            </Row>

            <Row>
                <NavLink exact to="/profile/orders" activeClassName="selected">
                    <Button type='primary'>Orders</Button>
                </NavLink>
            </Row>

            <Row>
                <NavLink exact to="/profile/favourites" activeClassName="selected">
                    <Button type='primary'>Favourites</Button>
                </NavLink>
            </Row>

            <Row>
                <NavLink to="/profile/change-password" activeClassName="selected">
                    <Button type='primary'>Change password</Button>
                </NavLink>
            </Row>
        </Col>
    )
}
export default UserOptionsMenu;