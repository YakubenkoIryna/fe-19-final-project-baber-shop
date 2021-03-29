import React, { useState } from "react";
import { Form, Input, Button, message, Select, Row, Col, InputNumber, Checkbox } from "antd";
import cloneDeep from "lodash/cloneDeep";
import { fieldsSetArr, layout, tailLayout, initialFormValues, rootCloudinaryFolderName } from "./constants";
import ImageUpload from "../../ImageUpload";
import ProductService from "../../../services/ProductService";

import "./style.less";

const { Option } = Select;

const ProductForm = ({ loadProducts, dispatchModal, listOfCategories, filters: { brand, country } }) => {
  const [form] = Form.useForm();
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [productCategories, setProductCategories] = useState(cloneDeep(listOfCategories));
  const [images, setImages] = useState([]);
  const [cloudinaryFolderName, setCloudinaryFolderName] = useState(rootCloudinaryFolderName);
  const [imageButtonDisabled, setImageButtonDisabled] = useState(true);

  // function to create form input fields based on constants
  const setUpFormFields = () => fieldsSetArr.map(category => {
    let element = "";
    const [fieldType, settings, levelParam] = category;
    switch (fieldType) {
      case "input":
        element = (
          <Form.Item key={settings.name} {...settings}>
            <Input placeholder={`input ${settings.label}`} />
          </Form.Item>
        );
        break;
      case "checkbox":
        element = (
          <Form.Item key={settings.name} {...settings} valuePropName="checked">
            <Checkbox>Enabled</Checkbox>
          </Form.Item>
        );
        break;
      case "number":
        element = (
          <Form.Item key={settings.name} {...settings}>
            <InputNumber min={0} max={20000} />
          </Form.Item>
        );
        break;
      case "select-categories":
        // eslint-disable-next-line no-case-declarations
        let categLevel = 0;
        if (levelParam === 2) categLevel = 1;
        if (levelParam === 3) categLevel = 2;
        element = (
          <Form.Item key={settings.name} {...settings}>
            <Select placeholder={`input ${settings.label}`}>
              {productCategories[categLevel][1].map(cat => cat.name).map(category => (
                <Option key={category} value={category}>{category}</Option>))}
            </Select>
          </Form.Item>
        );
        break;
      case "select-filter":
        // eslint-disable-next-line no-case-declarations
        let arr = [];
        if (settings.name === "brand") arr = brand;
        if (settings.name === "country") arr = country;
        if (arr.length > 0) {
          element = (
            <Form.Item key={settings.name} {...settings}>
              <Select placeholder={`input ${settings.label}`}>
                {arr.map(cat => cat.name).map(category => (
                  <Option key={category} value={category}>{category}</Option>))}
              </Select>
            </Form.Item>
          );
        }
        break;
      default:
        element = null;
    }
    return element;
  });

  const onFinish = (values) => {
    const submitValue = { ...values, imageUrls: images && images.length > 0 ? images : [] };
    ProductService.createProduct(submitValue)
      .then(res => {
        message.success(`Product ${res.name} was created`, 1.5);
        form.resetFields();
        dispatchModal && dispatchModal(false);
        loadProducts && loadProducts();
      })
      .catch(err => message.error(`${err}`, 1.5));
  };

  // handle form on faild submit
  const onFinishFailed = (errorInfo) => {
    console.log("Form Failed on submit:", errorInfo);
    message.error("Form Failed on submit", 1.5);
  };

  const handleCategoriesList = (name, value, basicList) => {
    const clonedCategories = cloneDeep(basicList);
    let parentId = null;
    switch (name) {
      case "categories_level1":
        parentId = clonedCategories[0][1]
          .filter(cat => cat.name === value)
          .map(cat => cat.id)[0];
        clonedCategories[1].splice(1, 1, clonedCategories[1][1].filter(cat => cat.parentId === parentId));
        setProductCategories(clonedCategories);
        form.resetFields(["categories_parent", "categories"]);
        break;
      case "categories_parent":
        parentId = clonedCategories[1][1]
          .filter(cat => cat.name === value)
          .map(cat => cat.id)[0];
        clonedCategories[2].splice(1, 1, clonedCategories[2][1].filter(cat => cat.parentId === parentId));
        setProductCategories(clonedCategories);
        form.resetFields(["categories"]);
        break;
      default:
        setProductCategories(basicList);
    }
  };

  const handleCloudinaryFolderCreate = () => {
    let folderArr = Object.values(form.getFieldsValue(["categories_level1", "categories_parent", "categories", "name"]));
    if (!folderArr.includes(undefined) && folderArr.every(el => el.length > 0)) {
      folderArr = folderArr.map(el => el.toLowerCase().replace(/ /g, "_").trim());
      const cloudinaryCategoryfolderName = `${rootCloudinaryFolderName}/${folderArr[0]}/${folderArr[1]}/${folderArr[2]}/${folderArr[3]}`;
      setCloudinaryFolderName(cloudinaryCategoryfolderName);
      setImageButtonDisabled(false);
    } else {
      setCloudinaryFolderName(rootCloudinaryFolderName);
      setImageButtonDisabled(true);
    }
  };

  const setSubmitButtonStatus = () => {
    const status = [];
    const checkFields = fieldsSetArr.filter(el => el[1].status).map(el => el[1].name);
    checkFields.forEach(field => {
      status.push(form.isFieldTouched(field) && (form.getFieldError(field).length === 0));
    });
    status.includes(false) ? setDisabledBtn(true) : setDisabledBtn(false);
  };

  const handleOnFieldsChange = ([{ name: [name], value }]) => {
    handleCategoriesList(name, value, listOfCategories);
    handleCloudinaryFolderCreate();
    setSubmitButtonStatus();
  };

  return (
    <Form
      name="admin-product-form"
      form={form}
      {...layout}
      layout="vertical"
      initialValues={initialFormValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onFieldsChange={handleOnFieldsChange}
    >
      {setUpFormFields()}
      <Row gutter={16}>
        <Col span={24} style={{ textAlign: "left" }}>
          <ImageUpload
            images={images}
            setImages={setImages}
            cloudinaryfolderName={cloudinaryFolderName}
            imageButtonDisabled={imageButtonDisabled}
          />
        </Col>
      </Row>
      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={disabledBtn}
        >
          Submit
        </Button>
        <Button htmlType="button" onClick={() => form.resetFields()} style={{ marginLeft: "20px" }}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;