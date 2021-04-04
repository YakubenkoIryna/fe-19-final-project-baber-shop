import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import Ajax from "../../services/Ajax";
import {useLocation, useParams} from "react-router-dom";

export const MetaForPages = ({title, content, rel, href, src, type}) => {
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
  console.log("products", products);
  return (
    <Helmet>
      <title>{title} {metaTitle}</title>
      <meta name="description" content={`${content} ${metaContent}`}/>
      <link rel={rel} type={type} href={href}/>
      <script src={src} type={type}/>
    </Helmet>
  );
};

export const MetaForEachPage = ({title, content, rel, href, src, type,}) => {
  const {itemNo} = useParams()
  const [product, setProduct] = useState({})
  useEffect(() => {
    async function fetchProducts2() {
      const result = await Ajax.get(`/products/${itemNo}`);
      setProduct(result);
    }

    fetchProducts2();
  }, [itemNo]);

  const metaContent = (product.name + product.brand + product.categories + product.categories_level1 + product.categories_parent).toString();

  return (
    <Helmet>
      <title>{`${title} ${product.name}`}</title>
      <meta name="description" content={`${content}  ${metaContent}`}/>
      <link rel={rel} type={type} href={href}/>
      <script src={src} type={type}/>
    </Helmet>
  );
}


export const MetaForFiltered = ({title, content, rel, href, src, type}) => {
  const {search} = useLocation();
  const newSearch = search.substring(1)
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function fetch() {
      const data = await Ajax.get(`/products/filter/?${newSearch}`);
      setFilteredProducts(data.products);
    }

    fetch()
  }, [newSearch])

  const metaContentForShop = filteredProducts.map(item => item.name + item.categories_level1 + item.categories_level1).toString().split(",").join(" ")
  const metaTitleForFiltered = filteredProducts.map(item => item.name).toString().split(",").join(" ")

  return (
    <Helmet>
      <title>{`${title} ${metaTitleForFiltered}`}</title>
      <meta name="description" content={`${content} ${metaContentForShop}`}/>
      <link rel={rel} type={type} href={href}/>
      <script src={src} type={type}/>
    </Helmet>
  )
}




