import React, { useState } from "react";
import { Layout, Row, Col, Divider, Button } from "antd";
import useAsyncEffect from "use-async-effect";
import AdminSider from "../../../components/AdminSider";
import CategoryForm from "../../../components/Forms/CategoryForm";
import CategoryService from "../../../services/CategoryService";
import AdminCategoryCard from "../../../components/AdminCards/AdminCategoryCard";
import withModal from "../../../components/Modal";
import { useDispatch } from "react-redux";
import { showModal } from "../../../store/modal/modalAction";
import LocalSearch from "../../../components/LocalSearch";

import "./styles.less";

const { Content } = Layout;

const AdminCatergory = () => {
  const [listOfCategories, setListOfCategories] = useState(null);
  const typeOfModal = "categoryFormInModal";
  const dispatch = useDispatch();
  const ModalCategoryForm = withModal(CategoryForm, typeOfModal);
  const [keyWord, setKeyWord] = useState('');


  useAsyncEffect(async isMounted => {
    CategoryService.getCategoriesSortedPerLevels()
      .then(res => {
          if (!isMounted()) return;
          setListOfCategories(Object.entries(res));
        }
      )
      .catch(err => console.log(err));
  }, []);

  //  to put function in form props to update categories after new categoty adding
  const loadCategories = () => {
    CategoryService.getCategoriesSortedPerLevels()
      .then(res => {
          setListOfCategories(Object.entries(res));
        }
      )
      .catch(err => console.log(err));
  };

  const dispatchModal = (status) => {
    dispatch(showModal({ status, type: typeOfModal }));
  };

  const searched = keyword => c => c.name.toLowerCase().includes(keyword);

  return (
    <Layout className="admin-category-container">
      <AdminSider />
      <Content className="category-content-container">
        <Divider orientation="left">Create Category</Divider>
        <Row gutter={16}>
          <Col span={22} style={{ margin: "auto", textAlign: 'left'}}>
            <Button type={'primary'} style={{marginLeft: '14px'}} onClick={() => dispatchModal(true)}>Create Category</Button>
            <ModalCategoryForm width={800} loadCategories={loadCategories} dispatchModal={dispatchModal} />
          </Col>
        </Row>
        <Divider orientation="left">Search</Divider>
        <Row gutter={16}>
          <Col span={22} style={{ margin: "auto", textAlign: 'left'}}>
            <LocalSearch keyWord={keyWord} setKeyWord={setKeyWord}/>
          </Col>
        </Row>
        <Row
          gutter={16}
          justify={"center"}
        >
          <Col span={24}>
            {listOfCategories && listOfCategories.map(cat => {
                const [level, categories] = cat;
                return (
                  <div key={`level_${level}`}>
                    <Divider orientation="left">{`Category Level ${level}`}</Divider>
                    <div className={"category-list-contaier"}>
                      {categories && categories.length > 0 && categories.filter(searched(keyWord)).map(category => {
                          return (
                            <div className={"category-list-item"} key={`${category._id}`}>
                              <AdminCategoryCard category={category} loadCategories={loadCategories} />
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default AdminCatergory;