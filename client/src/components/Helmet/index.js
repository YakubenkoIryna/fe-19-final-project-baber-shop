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
  const metaTitle = (product.name + product.brand + product.categories).toString();
  return (
    <Helmet>
      <title>{title} {metaTitle}</title>
      <meta name="description" content={`${content}  ${metaContent}`}/>
      <link rel={rel} type={type} href={href}/>
      <script src={src} type={type}/>
    </Helmet>
  );
}
