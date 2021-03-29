import React from 'react'
import './styles.less'
import Slider from "../../components/Slider";
import Banner from "../../components/Banner";
import {MetaForPages} from "../../components/Helmet"
import { ToastContainer } from "react-toastify";
const Home = (props) => {

    return (
        <div>
            <MetaForPages
                title="BarberShop"
                content="BarberShop Home Main Page"
                rel="icon"
            />
            <Slider/>
            <Banner title={'Best sellers'} config='cp'/>
            <Banner title={'One more  thing'} config='cc'/>
            <ToastContainer/>
        </div>
    )
}

export default Home;