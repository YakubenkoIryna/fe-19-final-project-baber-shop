import React, {useState, useEffect} from 'react';
import './styles.less'
import {Col, Row} from 'antd'
import { useDispatch, useSelector } from "react-redux";
import {addToCart} from "../../store/cart/actionCart";
import Banner from "../../components/Banner";
import ProductCarousel from "../../components/ProductCarousel";
import { useParams } from 'react-router-dom'
import Ajax from "../../services/Ajax";
import {CheckCircleOutlined} from '@ant-design/icons'
import { MetaForEachPage } from "../../components/Helmet";
import LastViewedProducts from '../../components/LastViewedProducts'


const ProductPage = (props) => {
    const {isAuthenticated} = useSelector(state => ({...state.user}));
    const dispatch = useDispatch();
    const { itemNo } = useParams()
    const [product, setProduct] = useState({})
    const [images, setImages] = useState([])

    const productsFromStore = useSelector(state => state.cart.products.products);
    const filteredProducts = productsFromStore.filter(item => item.product._id === product._id);
    console.log("filteredProducts",filteredProducts);

    useEffect(() => {
        async function fetch() {
            const product = await Ajax.get(`/products/${itemNo}`)
            setProduct(product);
            setImages(product.imageUrls);
        }

        fetch();
    }, [itemNo])

    const onAddToCart = (e) => {
        e.preventDefault();
        const newProduct = {product, cartQuantity: + 1}
        dispatch(addToCart(newProduct, product._id, isAuthenticated));
    }

    return (
      <>
          <MetaForEachPage
            title = "Barber Shop Market"
            content = "Barber Shop market"
            rel = "icon"
          />
        <div className="product-page">
            <div className="product_page__container">
                <Row>
                    <Col className="product_page__box" xs={{span: 24, order: 1}} sm={{order: 1}}
                         lg={{span: 12, order: 1}}>
                        <div className="product_title">{product.name}</div>
                        <div className="img-slider">
                            <ProductCarousel imageUrls={images}/>
                        </div>
                    </Col>
                    <Col className="product_page__box-description" xs={{span: 24, order: 2}} sm={{order: 2}} lg={{span: 9, order: 1}}>
                        <Col>
                            <div className="product_page__available" >
                                { product.quantity === 0
                                    ? (<span className="sold-out">Sold out</span>)
                                    :  (<span className="product-available"><CheckCircleOutlined/> Available: {product.quantity}</span>)
                                }
                            </div>

                            <div className="product-code">Item No:{product.itemNo}</div>
                            <Row>
                                <Col>
                                    <div className="product_page__price">${product.currentPrice}</div>
                                </Col>
                                <Col className="btn-buy_box">
                                    { product.quantity === 0
                                        ? (<></>)
                                        : filteredProducts.length === 1
                                        ? (<button className="btn-buy add-disabled">Added</button>)
                                        : (<button className="btn-buy" onClick={onAddToCart}>Buy</button>)

                                    }

                                </Col>

                            </Row>
                            <div className="product_page__description"> {product.description}</div>
                        </Col>
                    </Col>
                </Row>
            </div>
            <LastViewedProducts />
            <Banner title={'One more  thing'} config='cc'/>
        </div>
          </>
    )}


export default ProductPage;