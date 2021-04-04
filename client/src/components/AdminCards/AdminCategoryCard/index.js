import React from "react";
import {Link} from "react-router-dom";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {Card, message, Modal} from "antd";
import noImage from "../../../assets/no_image.png";
import CategoryService from "../../../services/CategoryService";
import CloudinaryService from "../../../services/CloudinaryService";

import "./styles.less";

const {Meta} = Card;
const {confirm} = Modal;

const AdminCategoryCard = ({category: {name, imgUrl, description, id}, loadCategories}) => {

  const handleDelete = () => {
    confirm({
      title: `Do you want to delete category ${name}?`,
      icon: <ExclamationCircleOutlined/>,
      onOk() {
        CategoryService.deleteCategory(id)
          .then(res => {
            if (imgUrl?.length > 1) {
              for (const {public_id} of imgUrl) {
                CloudinaryService.imageRemove({public_id})
                  .then(res => {
                    console.log("images deleted from cloudinary", res);
                  })
                  .catch(err => {
                    console.log(err);
                    message.error(`Image delete issue ${err}`);
                  });
              }
            }
            message.success(res.message);
            loadCategories();
          })
          .catch(err => message.error(err));
      },
      onCancel() {
        message.warning("Deletion Canceled");
      }
    });
  };

  return (
    <Card
      style={{width: "350px"}}
      cover={
        <img
          alt={name}
          src={imgUrl && imgUrl.length > 0 && typeof (imgUrl) === 'object' ? `${imgUrl[0].url}` : noImage}
          style={{height: "300px", objectFit: "cover", padding: "2px"}}
        />
      }
      actions={[
        <Link to={`/admin/category/${id}`}>
          <EditOutlined className="text-warning"/>
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={handleDelete}/>
      ]}
    >
      <Meta
        title={name}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default AdminCategoryCard;