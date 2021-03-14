import React, { useState, useEffect } from "react";
import Preloader from "../Preloader";
import { Avatar, Badge, message } from "antd";
import CloudinaryService from "../../services/CloudinaryService";

import "./styles.less";

const ImageUpload = ({ images, setImages, cloudinaryfolderName, imageButtonDisabled }) => {

  const [preloaderStatus, setPreloaderStatus] = useState(false);
  const [imageUploadButtonStyle, setImageUploadButtonStyle] = useState("cloudinary__upload cloudinaryDisabled");
  const [labelInputType, setLabelInputtype] = useState("input");

  useEffect(() => {
    if (!imageButtonDisabled) {
      setImageUploadButtonStyle("cloudinary__upload");
      setLabelInputtype("file");
    } else {
      setImageUploadButtonStyle("cloudinary__upload cloudinaryDisabled");
      setLabelInputtype("input");
    }
  }, [imageButtonDisabled]);

  const fileUpload = (e) => {
    if (imageButtonDisabled) return message.error("update form to upload image", 1.5);
    setPreloaderStatus(true);
    const files = Object.values(e.target.files);
    let allUploadedFiles = [];
    if (typeof (images) === "object") allUploadedFiles = [...images];
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          CloudinaryService.imageUpload({ image: reader.result, folder: cloudinaryfolderName })
            .then(data => {
              setPreloaderStatus(false);
              allUploadedFiles.push(data);
              setImages([...allUploadedFiles]);
            })
            .catch(err => {
              setPreloaderStatus(false);
              console.log(err);
            });
        };
      }
    }
  };

  const handleImageRemove = (public_id) => {
    if (!public_id) return
    setPreloaderStatus(true);
    CloudinaryService.imageRemove({ public_id })
      .then(res => {
        setPreloaderStatus(false);
        const filteredImages = [...images].filter((item) => {
          return item.public_id !== public_id;
        });
        setImages(filteredImages);
      })
      .catch(err => {
        console.log(err);
        setPreloaderStatus(false);
      });
  };

  return (
    <div className={"cloudinary__container"}>
      <label className={imageUploadButtonStyle}>
        Load image
        <input
          type={labelInputType}
          multiple
          hidden
          accept="images/*"
          onChange={fileUpload}
        />
      </label>
      {preloaderStatus && <div className={"cloudinary__preloader"}>
        <Preloader />
      </div>}
      {!preloaderStatus &&
      <div>
        {images.length > 0 && typeof (images) === "object" &&
        images.map(image => (
          <Badge
            count="X"
            key={`${cloudinaryfolderName}_${image.public_id}`}
            onClick={() => handleImageRemove(image.public_id)}
            className={"cloudinary__badge"}
          >
            <Avatar
              src={image.url}
              size={100}
              shape="square"
              className={"cloudinary__avatar"}
            />
          </Badge>
        ))}
      </div>}
    </div>
  );
};

export default ImageUpload;