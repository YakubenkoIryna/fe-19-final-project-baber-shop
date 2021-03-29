import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Form, Input, Button, message, Row, Col } from "antd";
import { fieldsSetArr, layout, tailLayout } from "./constants";
import { rootCloudinaryFolderName } from "../CategoryForm/constants";
import CategoryService from "../../../services/CategoryService";
import ImageUpload from "../../ImageUpload";

import "./style.less";

const CategoryUpdateForm = ({ categoryToUpdate }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [images, setImages] = useState([]);
  const [cloudinaryFolderName, setCloudinaryFolderName] = useState(rootCloudinaryFolderName);

  useEffect(() => {
    form.setFieldsValue({
      name: categoryToUpdate?.name?.length > 0 ? categoryToUpdate.name : "",
      description: categoryToUpdate?.description?.length > 0 ? categoryToUpdate.description : ""
    });
    if (categoryToUpdate?.imgUrl?.length > 0) setImages(categoryToUpdate.imgUrl);
    if (categoryToUpdate?.level?.length > 0 && categoryToUpdate?.id?.length > 0) setCloudinaryFolderName(`${rootCloudinaryFolderName}/level${categoryToUpdate.level}/${categoryToUpdate.id}`);
  }, [categoryToUpdate, form]);

  // function to create form input fields based on constants
  const setUpFormFields = () => fieldsSetArr.map(category => {
    let element = "";
    const [fieldType, settings] = category;
    switch (fieldType) {
      case "input":
        element = (
          <Form.Item key={settings.name} {...settings}>
            <Input placeholder={`input ${settings.label}`} />
          </Form.Item>
        );
        break;
      default:
        element = null;
    }
    return element;
  });

  // handle form on a successfully submit
  const onFinish = (values) => {
    const submitValue = { ...values, imgUrl: images && images.length > 0 ? images : [] };
    CategoryService.updateCategory(categoryToUpdate.id, submitValue)
      .then(res => {
        message.success(`Category ${res.name} was updated`, 1.5);
        history.push("/admin/category");
      })
      .catch(err => {
        message.error(`${err}`, 1.5);
      });
  };

  // handle form on faild submit
  const onFinishFailed = (errorInfo) => {
    console.log("Form Failed on submit:", errorInfo);
    message.error("Form Failed on submit", 1.5);
  };

  return (
    <Form
      name="admin-category-form"
      form={form}
      {...layout}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {setUpFormFields()}
      <Row gutter={16}>
        <Col span={16} style={{ textAlign: "left" }}>
          <ImageUpload
            images={images}
            setImages={setImages}
            cloudinaryfolderName={cloudinaryFolderName}
            imageButtonDisabled={false}
          />
        </Col>
      </Row>
      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={() => form.resetFields()} style={{ marginLeft: "20px" }}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryUpdateForm;