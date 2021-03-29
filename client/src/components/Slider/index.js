import React, {useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";
import {Button, Carousel} from 'antd';
import Ajax from "../../services/Ajax";
import './styles.less'

const {get} = Ajax;

const Slider = () => {

    const history = useHistory();
    const [slides, setSlides] = useState([]);
    useEffect(() => {
        let cleanupFunction = false;
        get('/slides')
            .then(slides => {
                if (!cleanupFunction) setSlides(slides || [])
            })
        return () => cleanupFunction = true
    }, [])


    return (
        <div id='customCarousel'>
            <Carousel autoplay arrows='true'>
                {slides.map(slide => (
                        <div key={slide.customId}>
                            <div className='carousel'>
                                <img className='carousel-mainImage' src={slide.imageUrl} alt={`slider-${slide.alt}`}/>
                                <div className='carousel-text'>
                                    <h2 className='carousel-text-title'>{slide.text.title}</h2>
                                    <div>{slide.text.text}</div>
                                    <Button className='carousel-text-btn' shape='round' ghost
                                            onClick={() => {
                                                history.push(slide.link)
                                            }}>
                                        More details
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </Carousel>
        </div>
    );
}
export default Slider;