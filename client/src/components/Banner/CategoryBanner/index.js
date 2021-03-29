import React from 'react';
import {Link} from "react-router-dom";
import './styles.less';
import {Image, Row} from "antd";

const CategoryBanner = ({category: {imgUrl, name, price}}) => {
    return (
        <Row justify="end" align='middle'>
            <Link to={`/shop?categories=${name}`}>
                <div className="category-banner">
                    <Image className='category-banner-img' src={imgUrl[0]?.url} alt='Category 1' preview={false}/>
                    <div className="category-info category-banner-info">
                        <p className="category-info-title">
                            {name}
                        </p>
                        {price ?
                            <p className="category-info-price">
                                from ${price}
                            </p>
                            : null
                        }
                    </div>
                </div>
            </Link>
        </Row>
    )
}

export default CategoryBanner;

