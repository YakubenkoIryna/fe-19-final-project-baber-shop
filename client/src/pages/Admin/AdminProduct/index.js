import React, {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {Button, Col, Divider, Layout, Pagination, Row} from "antd";
import useAsyncEffect from "use-async-effect";
import AdminSider from "../../../components/AdminSider";
import ProductForm from "../../../components/Forms/ProductForm";
import CategoryService from "../../../services/CategoryService";
import FilterServices from "../../../services/FilterServices";
import ProductService from "../../../services/ProductService";
import AdminCardSkeleton from "../../../components/AdminCards/AdminCardSkeleton";
import AdminProductCard from "../../../components/AdminCards/AdminProductCard";
import withModal from "../../../components/Modal";
import {useDispatch} from "react-redux";
import {showModal} from "../../../store/modal/modalAction";
import Preloader from "../../../components/Preloader";
import QuerySearch from "../../../components/QuerySearch";

import "./styles.less";

const {Content} = Layout;

const AdminProduct = () => {

  const history = useHistory();
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState(`?perPage=${perPage}&startPage=${page}`);
  const [products, setProducts] = useState([]);
  const [productsQuantity, setProductsQuantity] = useState(0);
  const [listOfCategories, setListOfCategories] = useState(null);
  const [preloaderStatusCategory, setPreloaderStatusCategory] = useState(false);
  const [preloaderStatusFilters, setPreloaderStatusFilters] = useState(false);
  const [preloaderStatusProducts, setPreloaderStatusProducts] = useState(false);
  const [filters, setFilters] = useState([]);
  const [keyWord, setKeyWord] = useState("");
  const typeOfModal = "categoryFormInModal";
  const dispatch = useDispatch();
  const ModalProductForm = withModal(ProductForm, typeOfModal);

  useEffect(() => {
    history.push(`/admin/product${searchString}`);
  }, [history, searchString]);

  // useEffect(() => {
  //   setSearchString(`?perPage=${perPage}&startPage=${page}`);
  // }, [perPage, page]);

  useEffect(() => {
    if (keyWord.length === 0) setSearchString(`?perPage=${perPage}&startPage=${page}`);
  }, [keyWord, page, perPage]);

  useAsyncEffect(async isMounted => {
    setPreloaderStatusProducts(true);
    ProductService.getProductsListForAdminPageByFiletr(searchString)
      .then(res => {
        if (!isMounted() && !res) return;
        setPreloaderStatusProducts(false);
        res === null ? setProducts([]) : setProducts(res.products);
        res === null ? setProductsQuantity(1) : setProductsQuantity(res.productsQuantity);
      })
      .catch(err => {
        setPreloaderStatusProducts(false);
        console.log(err);
      });
  }, [history, searchString]);

  const loadProducts = () => {
    setPreloaderStatusProducts(true);
    ProductService.getProductsListForAdminPageByFiletr(searchString)
      .then(res => {
        if (!res) return;
        setPreloaderStatusProducts(false);
        setProducts(res.products);
        setProductsQuantity(res.productsQuantity);
      })
      .catch(err => {
        setPreloaderStatusProducts(false);
        console.log(err);
      });
  };

  useAsyncEffect(async isMounted => {
    setPreloaderStatusCategory(true);
    CategoryService.getCategoriesSortedPerLevels()
      .then(res => {
          if (!isMounted() && !res) return;
          setPreloaderStatusCategory(false);
          setListOfCategories(Object.entries(res));
        }
      )
      .catch(err => {
        setPreloaderStatusCategory(false);
        console.log(err);
      });
  }, []);

  useAsyncEffect(async isMounted => {
    setPreloaderStatusFilters(true);
    FilterServices.getListByFilterType(["brand", "country"])
      .then(res => {
          if (!isMounted() && !res) return;
          setPreloaderStatusFilters(false);
          setFilters(res);
        }
      )
      .catch(err => {
        setPreloaderStatusFilters(false);
        console.log(err);
      });
  }, []);

  const dispatchModal = (status) => {
    dispatch(showModal({status, type: typeOfModal}));
  };

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setProductsQuantity(pageSize);
  };

  const handlePerPageSizeChange = (current, size) => {
    setPerPage(size);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyWord.length > 0) {
      setSearchString(`?itemNo=${keyWord}&perPage=${1}&startPage=${1}`);
    } else {
      setSearchString(`?perPage=${perPage}&startPage=${page}`);
    }
  };

  return (
    <Layout className="admin-products-container">
      <AdminSider/>
      <Content className="admin-products-content-container">
        <Divider orientation="left">
          {!preloaderStatusFilters && !preloaderStatusCategory ? <span>Create Product</span> : <Preloader/>}
        </Divider>
        <Row gutter={16}>
          <Col span={22} style={{margin: "auto", textAlign: "left"}}>
            <Button type={"primary"} style={{marginLeft: "14px"}} onClick={() => dispatchModal(true)}>Create
              Product</Button>
            <ModalProductForm
              width={800}
              listOfCategories={listOfCategories && listOfCategories}
              loadProducts={loadProducts}
              dispatchModal={dispatchModal}
              filters={filters}
            />
          </Col>
        </Row>
        <Divider orientation="left">ItemNo Search</Divider>
        <Row gutter={16}>
          <Col span={22} style={{margin: "auto", textAlign: "left"}}>
            <QuerySearch
              keyWord={keyWord}
              setKeyWord={setKeyWord}
              handleSearch={handleSearch}
            />
          </Col>
        </Row>
        <Divider orientation="left">
          {!preloaderStatusProducts ? <span>Products</span> : <Preloader/>}
        </Divider>
        {products.length === 0 && <div>Product wasn't found, try another ItemNo</div>}
        {products.length > 0 &&
        <>
          <Row gutter={16}>
            <Col span={24} className={"admin-products-list-container"} style={{margin: "auto"}}>
              {preloaderStatusProducts && [...Array(perPage).keys()].map(skeleton => <AdminCardSkeleton
                key={`skeleton_${skeleton}`}/>)}
              {!preloaderStatusProducts && products.map(product => (
                <AdminProductCard key={product.itemNo} product={product} loadProducts={loadProducts}/>))}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24} style={{margin: "auto", padding: "15px"}}>
              <nav>
                <Pagination
                  current={page}
                  total={productsQuantity}
                  defaultPageSize={perPage}
                  onChange={handlePageChange}
                  showSizeChanger={true}
                  showQuickJumper={true}
                  onShowSizeChange={handlePerPageSizeChange}
                  pageSizeOptions={["5", "10", "15", "20", "25", "30"]}
                  showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                />
              </nav>
            </Col>
          </Row>
        </>
        }
      </Content>
    </Layout>
  );
};

export default AdminProduct;