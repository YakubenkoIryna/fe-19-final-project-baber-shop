import React from "react";
import {Layout, Row, Col, Divider} from "antd";
import AdminSider from "../../../components/AdminSider";


import "./styles.less";

const {Content} = Layout;

const AdminDashboard = () => {

    return (
        <Layout className="admin-dashboard-container">
            <AdminSider/>
            <Content className="dashboard-content-container">
                <Divider orientation="left">Admin Dashboard</Divider>
                <Row gutter={16}>
                    <Col span={24} style={{textAlign: 'left'}}>
                        <p>TBD ...</p>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default AdminDashboard;