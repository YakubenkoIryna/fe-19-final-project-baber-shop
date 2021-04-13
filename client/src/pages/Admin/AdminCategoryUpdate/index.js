import React, {useState} from "react";
import {Col, Divider, Layout, Row} from "antd";
import AdminSider from "../../../components/AdminSider";
import CategoryService from "../../../services/CategoryService";
import {useParams} from 'react-router-dom';
import useAsyncEffect from "use-async-effect";
import CategoryUpdateForm from "../../../components/Forms/CategoryUpdateForm";

import "./styles.less";

const {Content} = Layout;

const AdminCatergoryUpdate = () => {
  const {id} = useParams()
  const [categoryToUpdate, setCategoryToUpdate] = useState(null);

  useAsyncEffect(async isMounted => {
    CategoryService.getCategory(id)
      .then(res => {
          if (!isMounted()) return;
          setCategoryToUpdate(res);
        }
      )
      .catch(err => console.log(err));
  }, []);

  return (
    <Layout className="admin-category-container">
      <AdminSider/>
      <Content className="category-content-container">
        <Divider orientation="left">Update Category</Divider>
        <Row gutter={16}>
          <Col span={22} style={{margin: 'auto'}}>
            <CategoryUpdateForm categoryToUpdate={categoryToUpdate}/>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AdminCatergoryUpdate;