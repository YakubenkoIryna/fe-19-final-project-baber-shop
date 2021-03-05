import React, { useState } from "react";
import { Layout, Row, Col, Divider } from "antd";
import AdminSider from "../../../components/AdminSider";
// import CategoryService from "../../../services/CategoryService";
import {useParams} from 'react-router-dom';
import useAsyncEffect from "use-async-effect";
import CategoryUpdateForm from "../../../components/Forms/CategoryUpdateForm";
// import ProductForm from "../../../components/Forms/ProductForm";

import "./styles.less";
import ProductService from "../../../services/ProductService";


const { Content } = Layout;

const AdminProductUpdate = () => {
  const {itemNo} = useParams()
  const [productToUpdate, setProductToUpdate] = useState(null);

  useAsyncEffect(async isMounted => {
    console.log("itemNo ====>",itemNo)
    ProductService.getProduct(itemNo)
      .then(res => {
          if (!isMounted()) return;
          console.log('Product Result ===>', res)
          setProductToUpdate(res);
        }
      )
      .catch(err => console.log(err));
  }, []);

  return (
    <Layout className="admin-category-container">
      <AdminSider />
      <Content className="category-content-container">
        <Divider orientation="left">Update Product</Divider>
        <Row gutter={16}>
          <Col span={22} style={{margin: 'auto'}}>
             <CategoryUpdateForm categoryToUpdate={productToUpdate} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AdminProductUpdate;