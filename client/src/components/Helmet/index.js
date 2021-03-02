import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Ajax from "../../services/Ajax";
import { useParams } from "react-router-dom";

export const MetaForPages = ({ title, content, rel, href, src, type }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      const result = await Ajax.get("/products");
      setProducts(result);
    }
    fetchProducts();
  }, []);

  const metaContent = [...new Set(products.map(item => item.name + item.brand + item.categories))].toString().split(",").join(" ");
  const metaTitle = [...new Set(products.map(item => item.categories))].toString().split(",").join(" ");
  console.log("products",products);
  return (
    <Helmet>
      <title>{title} {metaTitle}</title>
      <meta name="description" content={`${content} ${metaContent}`}/>
      <link rel={rel} type={type} href={href}/>
      <script src={src} type={type}/>
    </Helmet>
  );
};

export const MetaForEachPage = ({ title, content, rel, href, src, type, }) => {
  const { itemNo } = useParams()
  const [product, setProduct] = useState({})
  useEffect(() => {
    async function fetchProducts2() {
      const result = await Ajax.get(`/products/${itemNo}`);
      setProduct(result);
    }
    fetchProducts2();
  },[itemNo]);
  const metaContent = (product.name + product.brand + product.categories + product.categories_level1 + product.categories_parent).toString();
  // const metaTitle = (product.name + product.brand + product.categories).toString();
  // console.log("product.name-product.name-product.name",product.name,typeof product.name);
  return (
    <Helmet>
      <title>{`${title} ${product.name}`}</title>
      <meta name="description" content={`${content}  ${metaContent}`}/>
      <link rel={rel} type={type} href={href}/>
      <script src={src} type={type}/>
    </Helmet>
  );
}

export const MetaForShopPage = ({ title, content, rel, href, src, type, }) => {
  const { itemNo } = useParams()
  const [products, setProduct] = useState({})
  console.log("itemNo---itemNo",itemNo);
  useEffect(() => {
    async function fetchProducts3() {
      // const result = await Ajax.get(`/products/filter?${itemNo}`);
      const result = await Ajax.get(`/products/filter??categories=Natural%20shaving%20brushes`);
      setProduct(result);
    }
    fetchProducts3();
  },[itemNo]);
  console.log("MetaForShopPage----products----->>>",products);
  // const metaContent2 = [...new Set(products.map(item => item.categories))].toString().split(",").join(" ");
  // const metaTitle = [...new Set(products.map(item => item.categories))].toString().split(",").join(" ");
  // console.log("products",products);
  return (
    <Helmet>
      <title>{`${title} `}</title>
      <meta name="description" content={`${content} `}/>
      <link rel={rel} type={type} href={href}/>
      <script src={src} type={type}/>
    </Helmet>
  );
}