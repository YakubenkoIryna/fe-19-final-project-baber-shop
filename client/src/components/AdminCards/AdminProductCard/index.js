import React from "react";
import { Card, message, Modal } from "antd";
import noImage from "../../../blank_image/no_image.png";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import CloudinaryService from "../../../services/CloudinaryService";
import ProductService from "../../../services/ProductService";

import "./styles.less";

const { Meta } = Card;
const { confirm } = Modal;

const AdminProductCard = ({ product, loadProducts }) => {

  const {
    brand,
    categories,
    currentPrice,
    imageUrls,
    itemNo,
    name,
    quantity,
    country,
    enabled,
    description,
    _id
  } = product;

  const handleDelete = () => {
    confirm({
      title: `Do you want to delete product itemNo (${itemNo}): ${name} ?`,
      icon: <ExclamationCircleOutlined />,
      onOk () {
        ProductService.deleteProduct(_id)
          .then(res => {
            const { deletedCategoryInfo } = res;
            if (deletedCategoryInfo?.imageUrls[0].public_id) {
              const { imageUrls } = deletedCategoryInfo;
              for (const image of imageUrls) {
                const { public_id } = image;
                CloudinaryService.imageRemove({ public_id })
                  .then(res => {
                    console.log("images deleted from cloudinary", res);
                  })
                  .catch(err => {
                    message.error(`Image delete issue ${err}`);
                  });
              }
            }
            loadProducts();
            message.success(res.message);
          })
          .catch(err => message.error(err));
      },
      onCancel () {message.warning("Deletion Canceled");}
    });
  };

  return (
    <Card
      style={{ width: "350px", margin: "10px" }}
      cover={
        <img
          alt={name}
          src={imageUrls && imageUrls.length > 0 && imageUrls[0].url ? imageUrls[0].url : noImage}
          style={{ height: "300px", objectFit: "cover", padding: "2px" }}
        />
      }
      actions={[
        <Link to={`/admin/product/${itemNo}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={handleDelete} />
      ]}
    >
      <Meta
        title={`(${itemNo}) ${name}`}
        description={description ? `${description.substring(0, 40)}...` : "no description"}
      />
      <ul className={"admin-product-card-list-container"}>
        <li><span>Category:</span> {categories}</li>
        <li><span>Brand:</span> {brand}</li>
        <li><span>Country:</span> {country}</li>
        <li><span>Price:</span> {currentPrice}$</li>
        <li><span>Quantity:</span> {quantity}</li>
        <li><span>Enabled:</span> {enabled ? "Yes" : "No"}</li>
      </ul>
    </Card>
  );
};

export default AdminProductCard;