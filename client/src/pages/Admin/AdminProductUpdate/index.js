import React, {useState} from "react";
import {useParams} from "react-router-dom";
import useAsyncEffect from "use-async-effect";
import {Col, Divider, Layout, Row} from "antd";
import AdminSider from "../../../components/AdminSider";
import CategoryService from "../../../services/CategoryService";
import ProductService from "../../../services/ProductService";
import ProductUpdateForm from "../../../components/Forms/ProductUpdateForm";

import "./styles.less";
import FilterServices from "../../../services/FilterServices";
import Preloader from "../../../components/Preloader";

const {Content} = Layout;

const AdminProductUpdate = () => {
  const {itemNo} = useParams();
  const [preloader, setPreloader] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [listOfCategories, setListOfCategories] = useState(null);
  const [filters, setFilters] = useState(null);

  useAsyncEffect(async isMounted => {
    setPreloader(true);
    try {
      const res = await Promise.all(
        [
          ProductService.getProduct(itemNo),
          CategoryService.getCategoriesSortedPerLevels(),
          FilterServices.getListByFilterType(["brand", "country"])
        ]);
      if (!isMounted()) return;
      setProductToUpdate(res[0]);
      setListOfCategories(Object.entries(res[1]));
      setFilters(res[2]);
      setPreloader(false);
    } catch (err) {
      setPreloader(false);
      console.log("ADMIN PRODUCT UPDATE ERROR ===>", err);
    }

  }, []);

  return (
    <Layout className="admin-category-container">
      <AdminSider/>
      <Content className="category-content-container">
        <Divider orientation="left">Update Product</Divider>
        <Row gutter={16}>
          <Col span={22} style={{margin: "auto"}}>
            {preloader && <Preloader/>}
            {!preloader && productToUpdate && listOfCategories && filters &&
            <ProductUpdateForm
              productToUpdate={productToUpdate}
              listOfCategories={listOfCategories}
              filters={filters}
            />}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AdminProductUpdate;